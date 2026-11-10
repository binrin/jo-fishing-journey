import {gameTime,PERIODS,waitUntil,activityWeight,scheduleLabel,ecology} from './ecology.js';
import {castTargets,castResult,fishPeriod,weightLabel} from './catch-rules.js';
import {castLanding} from './water-layout.js';
import {FISH,REGIONS} from './data.js';
import {VERSION,TITLE,SAVE_KEY,STARTER,region,capacity,isNight,gearPrice,upgradeGear,gate,travel,finish,chooseFish,fishGrade,addCatch,sell,validateSave,chargeBait,makeFight,fightStep,skill,critical,spend,maxHP,buyBait,emergencyBait,buyTackle,buyBoat,selectBoat,sellBoat,sleep,upgradeHome,transferFish,learnSkill,equipSkill,legendReady,resetSkills,waitSeconds,fightPlan} from './engine.js';
import {BOATS,TACKLE,HOMES,SKILLS,BAITS,MAX_LEVEL,playerLevel,xpForLevel,availableSP} from './progression.js';
import {panelContent,boatArt} from './panels.js';
import {sprite,fishStyle,waterStyle} from './art.js';
import {createReelFeedback} from './reel-feedback.js';
import {createReelInput} from './touch-reel.js';
const reelInput=createReelInput();
import {createCombatFX} from './effects.js';
const $=id=>document.getElementById(id), fmt=n=>Math.round(n).toLocaleString('ko-KR'), esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state=STARTER(),storageWarning=false,loadError=false;
try{const raw=localStorage.getItem(SAVE_KEY);if(raw)state=validateSave(JSON.parse(raw));}catch{loadError=true;}
let view='town';
let castAim=.5,castTarget={x:500,y:670},castFlight=1;
let targets=castTargets(),perfectCast=false;
function showCastTarget(key){const zone=document.querySelector('.perfect-zone');zone.style.left=(targets[key]-.09)*100+'%';zone.style.width='18%';$('castLabel').textContent=(key==='direction'?'① 방향':'② 힘')+' 목표 '+Math.round(targets[key]*100)+'%';}
let phase='idle',timer=0,cast=0,castDirection=0,castQuality=1,currentFish=null,currentGrade=2,fight=null,input=0,bossTrip=false,paused=false,panel='',last=performance.now(),hudClock=0,saveClock=0,toastTimer,context,reg=null,pendingCatch=null;
const modal=$('modal'),body=$('modalBody');
const fx=createCombatFX({scene:$('scene'),layer:$('combatEffects'),target:$('wildFish'),getState:()=>state});let hitClock=0;
const reelFeedback=createReelFeedback({sound,vibrate:buzz,cancelVibration:()=>{if(navigator.vibrate)navigator.vibrate(0);}});let dangerState='safe';
function save(){if(fight)state.hp=Math.max(0,fight.hero);state.savedAt=Date.now();try{localStorage.setItem(SAVE_KEY,JSON.stringify(state));}catch{if(!storageWarning){storageWarning=true;toast('저장 공간이 부족해요. 설정에서 저장 파일을 내보내 주세요.',5000);}}}
function toast(text,ms=2600){clearTimeout(toastTimer);$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,ms);}
function sound(type='tap'){if(state.muted)return;try{
 if(['reel-wind','reel-release','line-danger'].includes(type)){
  context??=new (window.AudioContext||window.webkitAudioContext)();if(context.state==='suspended'){context.resume().catch(()=>{});return;}
  const configs=type==='reel-wind'?[[1250,230,.035,.021,0,'triangle']]:type==='reel-release'?[[420,160,.075,.024,0,'sawtooth']]:[[680,530,.1,.035,0,'sine'],[850,640,.13,.035,.17,'sine']];
  for(const [from,to,duration,volume,offset,wave] of configs){const o=context.createOscillator(),g=context.createGain(),t=context.currentTime+offset;o.type=wave;o.frequency.setValueAtTime(from,t);o.frequency.exponentialRampToValueAtTime(to,t+duration);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(context.destination);o.onended=()=>{o.disconnect();g.disconnect();};o.start(t);o.stop(t+duration+.01);}return;
 }
context??=new (window.AudioContext||window.webkitAudioContext)();if(context.state==='suspended')context.resume();const notes=type==='critical'?[780,1120,1460]:type==='catch'?[660,880]:type==='electric'?[160,320,640]:[type==='hit'?210:type==='bite'?880:type==='fail'?160:440];notes.forEach((hz,i)=>{const o=context.createOscillator(),g=context.createGain(),t=context.currentTime+i*.035,d=type==='hit'?.09:.18;o.type=type==='hit'?'triangle':type==='electric'?'sawtooth':'sine';o.frequency.setValueAtTime(hz,t);o.frequency.exponentialRampToValueAtTime(type==='hit'?90:hz*.75,t+d);g.gain.setValueAtTime(type==='hit'?.035:.045,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(context.destination);o.start(t);o.stop(t+d+.01);});}catch{}}
function buzz(ms=25){if(state.haptics&&navigator.vibrate)navigator.vibrate(ms);}

function artPos(id){return `${(id%2)*100}% ${Math.floor(id/2)*25}%`;}
function show(title,html,name=''){releaseInput();panel=name;$('modalTitle').textContent=title;body.innerHTML=html;if(!modal.open)modal.showModal();$('closeModal').focus({preventScroll:true});body.scrollTop=0;requestAnimationFrame(()=>body.scrollTop=0);}
function close(){modal.close();panel='';releaseInput();save();render();}
$('closeModal').onclick=close;modal.addEventListener('cancel',()=>{panel='';releaseInput();});modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
function render(){
 const lvl=playerLevel(state);$('headerProgress').textContent=`Lv.${lvl} · ${lvl>=MAX_LEVEL?'MAX':`EXP ${fmt(state.xp-xpForLevel(lvl))} / ${fmt(xpForLevel(lvl+1)-xpForLevel(lvl))}`}`;$('game').classList.toggle('town-view',view==='town');$('playerBadge').textContent=`Lv.${lvl} · ${lvl>=95?'전설에 도전하는 낚시꾼':lvl>=70?'대양의 명인':lvl>=50?'신비의 바다 탐험가':lvl>=25?'바다의 숙련자':'성장하는 낚시꾼'}`;$('townHP').textContent=`체력 ${Math.ceil(state.hp)} / ${maxHP(state)}`;$('xpBar').style.width=`${lvl>=MAX_LEVEL?100:(state.xp-xpForLevel(lvl))/(xpForLevel(lvl+1)-xpForLevel(lvl))*100}%`;$('mapSP').textContent=`스킬 포인트 ${availableSP(state)} SP`;$('mapHome').textContent=`${HOMES[state.home].name} · 잠자기`;$('mapBoat').textContent=`${BOATS[state.boat].name} · ${capacity(state)}칸`;

 const r=region(state),night=isNight(state);$('coins').textContent=fmt(state.coins);$('bagCount').textContent=`${state.bag.length} / ${capacity(state)}`;$('debt').hidden=!state.debt;$('debt').textContent=`미끼 외상 ${fmt(state.debt)}`;$('location').textContent=r.display||r.name;$('chapter').textContent=`CHAPTER ${String(state.region+1).padStart(2,'0')} / ${REGIONS.length}`;$('scene').style.cssText=waterStyle(state.region);$('scene').classList.toggle('night',night);$('clockBtn').textContent=`${night?'☾':'☀'} ${gameTime(state).label} ${gameTime(state).name}`;$('scene').dataset.period=PERIODS[gameTime(state).period].id;
 $('sellDot').hidden=!state.bag.length;$('baitText').textContent=BAITS.find(b=>b.id===state.bait).name;
 $('bossBtn').firstElementChild.textContent=r.bossId==null?'✦ 지역 의뢰':state.bosses.includes(r.bossId)?'✦ 보스 완료':'✦ 보스 도전';$('bossHint').textContent=r.bossId==null?`${state.counts[state.region]} / ${r.minimum_catches}마리`:FISH[r.bossId].name;
 $('questChip').textContent=state.ended?'전설의 여행 완료 · 이제 자유롭게 낚시해요':`Lv.${lvl} · 장비 ${state.tackle+1}등급 +${state.tackleUpgrade} · ${state.counts[state.region]}/${r.minimum_catches}마리`;
 $('pauseOverlay').hidden=!paused;syncReel();renderActiveSkills();
}
function setAction(title,sub=''){const b=$('actionBtn');b.firstElementChild.textContent=title;b.lastElementChild.textContent=sub;}
function hint(text,danger=false){$('instruction').textContent=text;$('instruction').classList.toggle('danger',danger);}
function resetIdle(message='다음 물결에는 어떤 친구가 기다릴까요?'){
 $('fightTimer').hidden=true;fx.clear();hitClock=0;phase='idle';$('game').classList.remove('casting-mode');$('bobber').style.cssText='';fight=null;currentFish=null;bossTrip=false;releaseInput();$('castGauge').hidden=true;$('fightLabel').hidden=true;$('wildFish').classList.remove('visible');$('bobber').hidden=false;$('sceneMessage').textContent=message;$('sceneMessage').hidden=false;$('fishValue').textContent='—';$('fishBar').style.width='0%';$('heroValue').textContent=Math.ceil(state.hp);$('heroBar').style.width=`${state.hp/maxHP(state)*100}%`;$('tensionValue').textContent='0%';$('tensionBar').style.width='0%';$('skillFill').style.height='0%';$('skillBtn').disabled=false;$('leftBtn').disabled=true;$('rightBtn').disabled=true;setAction('낚시 시작','방향 · 힘 · 챔질');hint('수면을 터치해 낚시를 시작하세요');render();
}
function start(boss=false){
 if(phase!=='idle')return;if(state.hp<(boss?6:3)){openPanel('home');toast('집에서 잠을 자고 체력을 회복해 주세요.');return;}if(state.region>BOATS[state.boat].region){openPanel('map');toast('현재 배로 갈 수 있는 낚시터를 선택해 주세요.');return;}if(!boss&&state.baitStock[state.bait]<=0){openPanel('shop');toast('미끼가 떨어졌어요. 상점에서 준비해 주세요.');return;}view='fish';render();if(state.bag.length>=capacity(state)){toast('보관함이 가득 찼어요. 먼저 물고기를 판매해 주세요.');openPanel('market');return;}
 if(boss){const r=region(state);if(r.bossId==null||state.bosses.includes(r.bossId)||(state.tackle<state.region||state.tackleUpgrade<2)||state.counts[state.region]<r.minimum_catches){openPanel('goals');return;}const f=FISH[r.bossId];if(f.legendary&&!legendReady(state)){openPanel('goals');toast('천해룡의 단서와 최종 장비를 먼저 준비하세요.');return;}if(activityWeight(f,state)<=0){toast(`${f.name} 추천: ${scheduleLabel(f)}. 시간 버튼에서 기다려 주세요.`,4500);return;}}
 targets=castTargets();perfectCast=false;bossTrip=boss;phase='direction';cast=0;timer=0;$('castGauge').hidden=false;showCastTarget('direction');setAction('방향 선택','초록 구간에서!');hint('바늘을 초록 구간에 맞춰 보세요');$('sceneMessage').hidden=true;sound();
}
function action(){
 if(modal.open||paused||view!=='fish')return;sound();
 if(phase==='idle'){start();return;}
 if(phase==='direction'){castAim=cast;castDirection=cast;phase='power';timer=0;showCastTarget('power');setAction('찌 던지기','초록 구간에서!');return;}
 if(phase==='power'){
  castTarget=castLanding(castAim,cast);castFlight=0;
  const accuracy=castResult(targets,castDirection,cast);castQuality=accuracy.quality;perfectCast=accuracy.perfect;$('castGauge').hidden=true;
  currentFish=chooseFish(state,Math.random,bossTrip);if(!currentFish){resetIdle();toast('지금은 보스에 도전할 수 없어요.');return;}
  let chain=false;if(state.bait==='chain'&&!bossTrip){const chains={9:1,30:14,31:14,41:24,42:24,47:29,48:29,54:37,58:53};const wanted=chains[currentFish.id];const found=state.bag.findIndex(f=>f.id===wanted);if(found>=0){state.bag.splice(found,1);chain=true;toast(`${FISH[wanted].name}를 미끼로 사용했어요.`);}else toast('맞는 먹잇감이 없어 기본 미끼를 사용했어요.');}
  currentGrade=perfectCast?0:fishGrade(currentFish,Math.random,chain,state);if(!bossTrip&&!chargeBait(state)){resetIdle();openPanel('shop');return;}state.hp=Math.max(0,state.hp-(bossTrip?5:2));state.attempts++;save();phase='waiting';timer=waitSeconds(state,state.caught===0?3.5:6+Math.random()*5);$('bobber').hidden=false;setAction('입질 기다림','찌를 지켜보세요');hint('찌가 쑥 내려가면 챔질!');$('sceneMessage').hidden=false;$('sceneMessage').textContent=perfectCast?'방향·힘 명중! 대물이 미끼를 향해 옵니다.':'살랑살랑… 물고기가 다가오고 있어요.';render();return;
 }
 if(phase==='waiting'){toast('아직이에요! 찌가 내려갈 때를 기다려요.');return;}
 if(phase==='bite'){phase='fight';fight=makeFight(state,currentFish,currentGrade,castQuality);$('fishSprite').style.cssText=fishStyle(currentFish.id);$('wildFish').classList.add('visible');$('wildFish').classList.toggle('boss-fish',bossTrip);$('fightLabel').hidden=false;$('fishName').textContent=(currentFish.legendary?'LEGEND · ':bossTrip?'BOSS · ':'')+currentFish.name;if(currentFish.legendary){fx.impact('critical','천해룡 아스트라 · 깨어남',true);toast('환상의 물고기가 모습을 드러냈어요. 세 번의 물결을 이겨내세요!',5000);};$('bobber').hidden=true;$('sceneMessage').hidden=true;$('leftBtn').disabled=false;$('rightBtn').disabled=false;setAction('손 떼고 쉬기','긴장을 낮춰요');sound('bite');buzz(35);return;}
 if(phase==='fight'){releaseInput();toast('수면에서 손을 떼면 줄이 풀려요.');}
}
$('actionBtn').onclick=action;
function releaseInput(){reelInput.clear();input=0;reelFeedback.stop();setDanger('safe');syncReel();}
function syncReel(){
 const battle=view==='fish'&&phase==='fight';$('game').classList.toggle('battle-mode',battle);
 const controls=$('actionBtn').parentElement;
 if(battle&&controls.parentElement!==$('scene'))$('scene').append(controls);
 else if(!battle&&controls.parentElement!==$('game'))$('game').insertBefore(controls,document.querySelector('#game>.bottom-nav'));
 const pulling=battle&&!paused&&!modal.open&&(reelInput.input!==0||fight?.strokeLeft>0),unwinding=battle&&!paused&&!modal.open&&!pulling;
 $('game').classList.toggle('winding',pulling);$('game').classList.toggle('releasing',unwinding);

 const title=unwinding?'줄 푸는 중':pulling?'줄 감는 중':'줄 대기';
 $('reelStatus').firstChild.textContent=title;
 $('reelStatus').lastElementChild.textContent=battle&&fight&&fight.elapsed%7>=4.8&&fight.elapsed%7<=6.4?'반대쪽 톡! 강한 챔질':'터치해 감기 · 손 떼면 풀기';
}
function setDanger(level){
 if(level===dangerState)return;dangerState=level;
 $('game').classList.toggle('tension-warning',level==='warning');$('game').classList.toggle('tension-critical',level==='critical');
 $('tensionAlertTitle').textContent=level==='critical'?'줄 끊어지기 직전!':'줄이 팽팽해요';

}
document.addEventListener('pointerdown',()=>{if(!state.muted){try{context??=new (window.AudioContext||window.webkitAudioContext)();if(context.state==='suspended')context.resume().catch(()=>{});}catch{}}},{capture:true,passive:true});
const water=$('scene');
water.addEventListener('pointerdown',e=>{
 if(e.target.closest('button')||modal.open||paused||view!=='fish')return;e.preventDefault();
 if(phase!=='fight'){action();return;}
 const r=water.getBoundingClientRect();reelInput.waterDown(e.pointerId,e.clientX,r.left,r.width);input=reelInput.input;water.setPointerCapture(e.pointerId);
 if(input===-fight.direction){fx.impact('hit','탁!');sound('hit');}syncReel();
});
water.addEventListener('pointermove',e=>{if(phase!=='fight')return;const r=water.getBoundingClientRect();reelInput.waterMove(e.pointerId,e.clientX,r.left,r.width);input=reelInput.input;});

for(const surface of [water]){
 for(const event of ['pointerup','pointercancel','lostpointercapture'])surface.addEventListener(event,e=>{reelInput.up(e.pointerId);input=reelInput.input;syncReel();});
 surface.addEventListener('contextmenu',e=>e.preventDefault());
}
$('skillBtn').onclick=()=>openPanel('skills');
$('homeBtn').onclick=goTown;document.querySelectorAll('[data-town]').forEach(b=>b.onclick=()=>openPanel(b.dataset.town));
[0,1,2].forEach(i=>$('active'+i).onclick=()=>useActive(i));
document.addEventListener('keydown',e=>{if(modal.open||e.repeat)return;if(e.code==='Space'){e.preventDefault();action();}if(phase==='fight'&&!paused){if(e.key==='ArrowLeft'){e.preventDefault();reelInput.key(-1);input=reelInput.input;}if(e.key==='ArrowRight'){e.preventDefault();reelInput.key(1);input=reelInput.input;}if(['1','2','3'].includes(e.key))useActive(Number(e.key)-1);if(e.key.toLowerCase()==='s')useActive(0);}});document.addEventListener('keyup',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){reelInput.key(0);input=reelInput.input;}});
function fail(message){if(fight)state.hp=Math.max(0,fight.hero);state.fame=Math.max(0,state.fame-1);state.stats.failures++;save();sound('fail');resetIdle(message);show('아쉽게 놓쳤어요',`<p>${message}</p><div class="notice">물고기가 가는 방향의 <b>반대쪽 수면</b>을 터치해서 줄을 감으세요. 줄이 빨개지면 <b>수면에서 손을 떼고</b> 줄을 풀어 주세요.</div><p class="muted">미끼는 사용되었지만 장비와 이미 잡은 물고기는 그대로예요.</p><button class="primary" data-do="retry">다시 낚시하기</button>`,'result');}
function caught(){state.hp=Math.max(0,fight.hero);const oldLevel=playerLevel(state);const item=addCatch(state,fight.fish,fight.grade,perfectCast?1.1:.92+Math.random()*.16);if(!item){resetIdle();toast('보관함을 확인해 주세요.');return;}pendingCatch=item;save();if(playerLevel(state)>oldLevel)toast(`레벨 업! Lv.${playerLevel(state)} · 스킬 포인트를 확인하세요.`,4000);sound('catch');buzz([30,50,30]);resetIdle('멋진 한 마리! 여행 수첩에 기록했어요.');const f=FISH[item.id];show('월척! 잘 잡았어요',`<div class="catch-heading"><small>${f.boss?'전설의 보스 포획':f.ornamental?'반짝이는 관상어':'오늘의 작은 발견'}</small><div class="catch-art">${sprite(f.id)}</div><h3>${f.name}</h3><p>${['대형','중형','소형'][item.grade]} · ${item.size}cm · ${weightLabel(item)} · ${REGIONS[item.region].name}</p></div><div class="stat-pills"><span>판매가 <b>${fmt(item.value)} G</b></span><span>도감 <b>${Object.keys(state.collection).length}/${FISH.length}</b></span><span><b>+${item.xp} EXP</b></span></div><button class="primary" data-do="sell-catch">바로 판매 · ${fmt(Math.max(0,item.value-(item.boss?0:REGIONS[item.region].expense_on_sale)))} G</button><button class="secondary" data-do="retry">보관하고 계속 낚시</button>${f.legendary?'<button class="primary" data-do="finish">전설의 여행 엔딩 보기</button>':''}${f.boss?'<p class="notice">보스 단서를 여행 수첩에 기록했어요. 마지막 전설어를 잡았다면 엔딩과 집 기념관을 확인하세요.</p>':''}`,'result');}
function rodTip(){const scene=$('scene').getBoundingClientRect(),hero=document.querySelector('#scene>.hero').getBoundingClientRect();return {x:(hero.left-scene.left+hero.width*.52)/scene.width*1000,y:(hero.top-scene.top+hero.height*.035)/scene.height*1000};}
function drawLine(x,y,sag=0){const tip=rodTip();$('fishingLine').setAttribute('d',`M${tip.x} ${tip.y} Q${(tip.x+x)/2} ${(tip.y+y)/2+sag} ${x} ${y}`);}
function castVisual(dt){const active=['waiting','bite'].includes(phase);$('game').classList.toggle('casting-mode',active);if(!active)return;castFlight=Math.min(1,castFlight+dt/.65);const t=1-(1-castFlight)**2,tip=rodTip(),x=tip.x+(castTarget.x-tip.x)*t,y=tip.y+(castTarget.y-tip.y)*t-Math.sin(t*Math.PI)*90;$('bobber').style.left=x/10+'%';$('bobber').style.top=y/10+'%';drawLine(x,y,castFlight<1?-30:25);}
function tick(now){const dt=Math.min(.08,(now-last)/1000);last=now;
 if(!paused&&!modal.open&&!document.hidden){
  state.seconds+=dt;saveClock+=dt;hudClock+=dt;
  if(phase==='direction'||phase==='power'){timer+=dt;cast=(Math.sin(timer*(phase==='direction'?2.3:3.1))+1)/2;$('castNeedle').style.left=`${cast*98}%`;}
  if(phase==='waiting'){timer-=dt;if(timer<=0){phase='bite';timer=(state.caught<3?5:2.4)+(state.skills.focus||0)*.2;setAction('지금 챔질!','지금 눌러요!');hint('입질! 수면을 터치해 챔질하세요',true);$('sceneMessage').textContent='왔다! 지금 챔질해요!';sound('bite');buzz([30,30,30]);}}
  else if(phase==='bite'){timer-=dt;$('bobber').style.transform=`translate(-50%,calc(-78% + ${Math.sin(now/70)*9}px))`;if(timer<=0)fail('챔질 타이밍이 늦었어요. 다음 입질을 노려요!');}
  castVisual(dt);syncReel();if(phase==='fight'&&fight){input=reelInput.input;const oldPhase=fight.phase;fightStep(fight,dt,input);setDanger(reelFeedback.update({active:!fight.done,winding:fight.effectiveInput!==0,releasing:fight.effectiveInput===0&&fight.tension>0,tension:fight.tension,now,muted:state.muted,haptics:state.haptics}));if(fight.legendary&&fight.phase!==oldPhase){fx.impact('critical',['','깨어남','별빛 폭풍','마지막 해류'][fight.phase],true);toast(`천해룡 ${fight.phase}/3단계 · ${fight.phase===2?'별빛 폭풍':'마지막 해류'}`,4000);}if(fight.legendary)$('fishName').textContent=`LEGEND ${fight.phase}/3 · 천해룡 아스트라`;fx.update(fight,now/1000);const lineX=parseFloat($('wildFish').style.left)*10,lineY=parseFloat($('wildFish').style.top)*10,lineSag=fight.effectiveInput===0?170:Math.max(10,90-fight.tension);drawLine(lineX,lineY,lineSag);hitClock+=dt;if(fight.effectiveInput===-fight.direction&&hitClock>.38){hitClock=0;fx.impact('hit','탁!');sound('hit');}$('heroValue').textContent=Math.ceil(fight.hero);$('heroBar').style.width=`${fight.hero/fight.heroMax*100}%`;$('fishValue').textContent=Math.ceil(fight.hp);$('fishBar').style.width=`${fight.hp}%`;$('tensionBar').style.width=`${fight.tension}%`;$('tensionValue').textContent=`${Math.round(fight.tension)}%`;$('fishDirection').textContent=fight.direction===1?'→':'←';$('fishSprite').style.transform=(fight.direction===-1)?'scaleX(-1)':'none';$('skillFill').style.height=`${fight.skill*100}%`;$('skillBtn').disabled=false;renderActiveSkills();
   $('fightTimer').hidden=false;$('fightTimer').textContent=`남은 ${Math.max(0,Math.ceil(fight.timeLimit-fight.elapsed))}초 · 예상 ${Math.ceil(fight.expectedSeconds)}초${fight.expectedSeconds>fight.timeLimit?' · 장비 강화 권장':''}`;$('fightTimer').classList.toggle('urgent',fight.timeLimit-fight.elapsed<10);
   const crit=fight.elapsed%7>=4.8&&fight.elapsed%7<=6.4;setAction(crit?'지금 강하게!':'손 떼고 쉬기',crit?'타이밍 챔질 ✦':'긴장을 낮춰요');
   hint(fight.tension>78?'줄이 위험해요! 손을 떼고 줄을 풀어 주세요':fight.burst>0?'보스 돌진! 손을 떼서 줄을 풀어요':fight.direction===1?'물고기 → · 왼쪽 수면을 터치해 감기':'물고기 ← · 오른쪽 수면을 터치해 감기',fight.tension>78);
   if(fight.done==='caught')caught();else if(fight.done==='lost')fail(fight.failure==='timeout-line'?'제한 시간 초과! 버티던 낚싯줄이 끊어졌어요. 장비를 강화해 보세요.':fight.failure==='timeout-bait'?'제한 시간 초과! 미끼를 먹고 달아났어요. 장비와 공격 스킬을 확인하세요.':fight.hero<=0?'힘이 다했어요. 반대 방향을 보고 당겨 보세요.':'줄이 팽팽해져 끊어졌어요. 쉬어 가며 당겨요!');
  }
  if(hudClock>1){hudClock=0;render();}if(saveClock>10){saveClock=0;save();}
 }
 requestAnimationFrame(tick);
}
function openPanel(name){
 if(name==='town'){goTown();return;}const content=panelContent(name,state);if(content){show(content.title,content.html,name);render();return;}

 if(name==='time'){const now=gameTime(state);show('낚시 시간표',`<p>현재 ${now.label} · ${now.name}</p><p>게임 하루 = 플레이 10분. 기다리기는 체력을 회복하지 않아요.</p>${PERIODS.map(p=>`<button class="secondary" data-do="wait-hour" data-id="${p.start}">${p.name} ${p.start}:00까지 기다리기</button>`).join('')}<p>현재 노려볼 어종</p>${FISH.filter(f=>f.regions.includes(state.region)&&!f.boss&&activityWeight(f,state)>=.8).map(f=>`<button data-do="fish-detail" data-id="${f.id}">${f.name}</button>`).join('')}<p class="muted">활동 성향을 반영한 게임 확률입니다. 실제 조황은 수온·계절·수심에도 달라집니다.</p>`,'time');}
 else if(name==='market'){const gross=state.bag.reduce((a,f)=>a+f.value,0),fee=Math.round(state.bag.filter(f=>!f.boss).reduce((a,f)=>a+REGIONS[f.region].expense_on_sale,0));show('물고기 바로 판매',`<div class="notice"><b>${state.bag.length}마리 · 기준가 ${fmt(gross)} G</b><br>회복·유지비 ${fmt(fee)} G${state.debt?` · 미끼 외상 ${fmt(state.debt)} G`:''}<br>일반 판매 후 입금 약 <b>${fmt(Math.max(0,gross-fee-state.debt))} G</b></div>${state.bag.length?`<button class="primary" data-do="sell-all">모두 일반 판매</button><div class="row"><button class="secondary" data-do="discount">할인 판매<br><small>80% · 평판 추가</small></button><button class="secondary" data-do="bold-confirm">배짱 흥정<br><small>68% 성공 · 150%</small></button></div>`:'<p>아직 보관한 물고기가 없어요. 낚시터에서 한 마리 잡아볼까요?</p>'}<p class="muted">판매가 = 무게(kg) × 어종·지역별 kg 단가. 대물은 더 무거워 더 비싸요. 관상어는 팔아도 도감과 수족관 입장 자격이 남아요.</p>${state.bag.map(x=>`<div class="list-item">${sprite(x.id)}<div class="desc"><strong>${FISH[x.id].name}</strong><small>${['대형','중형','소형'][x.grade]} · ${x.size}cm · ${weightLabel(x)}</small></div><button data-do="sell-one" data-id="${x.uid}">${fmt(x.value)} G<br>판매</button></div>`).join('')}`,'market');}
 else if(name==='collection')show('물고기 여행 도감',`<p><b>${Object.keys(state.collection).length} / ${FISH.length}종</b>을 만났어요. 물고기를 누르면 미끼와 시간대를 볼 수 있어요.</p><div class="fish-grid">${FISH.map(f=>`<button class="fish-card ${state.collection[f.id]?'':'unknown'}" data-do="fish-detail" data-id="${f.id}">${sprite(f.id)}<b>${f.name}</b><small>${state.collection[f.id]?`${state.collection[f.id]}마리 · ${state.records[f.id]}cm`:f.boss?'보스 어종':f.ornamental?'관상어':'아직 만나지 못함'}</small></button>`).join('')}</div>`,'collection');
 else if(name==='settings')show('게임 설정',`<div class="setting-row"><b>효과음</b><button data-do="sound">${state.muted?'꺼짐':'켜짐'}</button></div><div class="setting-row"><b>진동</b><button data-do="haptics">${state.haptics?'켜짐':'꺼짐'}</button></div><p class="muted">진동은 지원하는 휴대폰에서만 작동해요.</p><button class="primary" data-do="update">최신 버전 업데이트</button><button class="secondary" data-do="help">게임 방법 · 홈 화면에 추가</button><div class="row"><button class="secondary" data-do="export">저장 내보내기</button><button class="secondary" data-do="import">저장 가져오기</button></div><p class="muted">자동 저장은 지금 사용하는 기기·브라우저에 저장돼요. 다른 휴대폰으로 옮길 때 저장 파일을 가져오세요. 앱을 닫으면 진행 중인 낚시는 끝나지만, 잡은 물고기와 금화는 유지됩니다.</p><button class="danger-button" data-do="reset-confirm">처음부터 다시 시작</button><p class="version">${TITLE} v${VERSION}<br>여행 시간 ${Math.floor(state.seconds/3600)}시간 ${Math.floor(state.seconds/60)%60}분 · ${state.caught}마리 포획<br>그림: 새로 제작한 AI 일러스트 · 폰트: LINE Seed KR</p>`,'settings');
 render();
}
document.querySelectorAll('[data-panel]').forEach(b=>b.onclick=()=>openPanel(b.dataset.panel));$('settingsBtn').onclick=()=>openPanel('settings');$('bagBtn').onclick=()=>openPanel('storage');$('baitBtn').onclick=()=>{if(phase==='idle')openPanel('bait');else toast('낚시를 마친 뒤 미끼를 바꿀 수 있어요.');};$('bossBtn').onclick=()=>openPanel('goals');$('clockBtn').onclick=()=>{if(phase!=='idle'){toast('낚시를 마치고 집에서 쉬어 주세요.');return;}openPanel('time');};
function performSale(ids,method='normal'){const r=sell(state,ids,method);save();render();sound(r.success?'catch':'fail');toast(r.success?`${r.count}마리 판매! 유지비 제외 ${fmt(r.net)} G`:'흥정 실패… 판매 물고기와 보상을 잃었어요.',3500);return r;}
body.addEventListener('click',async e=>{const b=e.target.closest('[data-do]');if(!b||b.disabled)return;const cmd=b.dataset.do,id=b.dataset.id;
 if(await handleV2(cmd,id,b))return;
 if(['map','market','shop','collection','aquarium','goals','help','settings'].includes(cmd)){openPanel(cmd);return;}
 if(cmd==='tutorial-done'){state.tutorial=false;view='town';close();return;}
 if(cmd==='retry'){close();if(phase==='idle')start();return;}
 if(cmd==='sell-catch'){if(pendingCatch)performSale([pendingCatch.uid]);pendingCatch=null;close();return;}
 if(cmd==='sell-all'||cmd==='discount'){performSale(state.bag.map(x=>x.uid),cmd==='discount'?'discount':'normal');openPanel('market');return;}
 if(cmd==='sell-one'){performSale([id]);openPanel('market');return;}
 if(cmd==='bold-confirm'){show('배짱 흥정을 할까요?',`<p>일반 물고기를 모두 흥정해요. <b>68% 확률로 150%</b>를 받지만, 실패하면 해당 물고기는 사라지고 <b>판매 대금은 0</b>이에요. 평판도 떨어져요.</p><p class="muted">보스 물고기는 위험 흥정에서 제외하고 정가로 판매해요.</p><button class="danger-button" data-do="bold">위험을 감수하고 흥정</button><button class="secondary" data-do="market">일반 판매로 돌아가기</button>`,'bold');return;}
 if(cmd==='bold'){performSale(state.bag.map(x=>x.uid),'bold');openPanel('market');return;}
 if(cmd==='finish'){if(phase!=='idle'){toast('낚시를 마친 뒤 여행을 완성해 주세요.');return;}if(finish(state)){save();show('조선생, 전설이 되다',`<div class="result-star">✦ ✦ ✦</div><div class="catch-art">${sprite(239)}</div><h3 class="catch-heading">서른 개의 물가 끝에서 천해룡 아스트라를 만났어요!</h3><p class="notice">총 ${state.caught}마리 · 도감 ${Object.keys(state.collection).length}/${FISH.length}종 · 여행 시간 ${Math.floor(state.seconds/60)}분</p><p>이제 모든 낚시터를 자유롭게 오가며 남은 물고기를 만나고, 가장 큰 기록에 도전하세요.</p><button class="primary" data-do="collection">남은 도감 살펴보기</button>`,'ending');render();}return;}
 if(cmd==='bait'){state.bait=id;save();openPanel('bait');return;}
 if(cmd==='wait-hour'){if(phase!=='idle')return;const hour=Number(id);if(!PERIODS.some(p=>p.start===hour))return;waitUntil(state,hour);save();render();openPanel('time');return;}
 if(cmd==='fish-detail'){const f=FISH[Number(id)];show(f.name,`<div class="catch-art">${sprite(f.id)}</div><p><b>낚시터</b> · ${f.regions.map(i=>REGIONS[i].display||REGIONS[i].name).join(', ')}</p><p><b>시간대</b> · ${scheduleLabel(f)}<br><small>${ecology(f).kind} · ${ecology(f).note}</small>${ecology(f).url?`<br><a href="${ecology(f).url}" target="_blank" rel="noopener">생태 자료 보기</a>`:''}</p><p><b>미끼</b> · ${f.boss?'지역 장비 +2와 포획 목표 달성 후 도전 · 천해룡은 최종 장비 +5와 모든 단서 필요':f.ornamental?'황금 미끼':f.bait}</p><p>${esc(f.note.replace(/[^。.!]*[낮밤]에 출몰[^。.!]*[。.]?/g,''))}</p><p>중형 기준 예상 ${Math.ceil(fightPlan({...state,region:f.regions[0]},f).expected)}초 / 제한 ${fightPlan({...state,region:f.regions[0]},f).limit}초<br><small>반대 방향 조작과 줄 풀기 포함 추정 · 스킬 사용과 실제 조작에 따라 달라집니다.</small></p><div class="notice">${state.collection[f.id]?`포획 ${state.collection[f.id]}마리 · 최고 기록 ${state.records[f.id]}cm`:'아직 만나지 못한 물고기예요.'}</div><button class="secondary" data-do="collection">도감으로 돌아가기</button>`,'fish-detail');return;}
 if(cmd==='sound'){state.muted=!state.muted;save();openPanel('settings');return;}
 if(cmd==='haptics'){state.haptics=!state.haptics;save();openPanel('settings');return;}
 if(cmd==='export'){save();const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`조선생의낚시여행-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);toast('저장 파일을 내보냈어요. 다른 기기에서 가져올 수 있어요.');return;}
 if(cmd==='import'){if(phase!=='idle'){toast('낚시를 마친 뒤 저장을 가져와 주세요.');return;}$('importFile').click();return;}
 if(cmd==='reset-confirm'){show('정말 처음부터 시작할까요?',`<p>이 브라우저에 저장된 금화, 장비, 도감과 여행 진행이 초기화됩니다. 보관할 기록이 있다면 설정에서 저장 파일을 먼저 내보내세요.</p><button class="danger-button" data-do="reset">모든 진행 초기화</button><button class="secondary" data-do="settings">취소하고 돌아가기</button>`,'reset');return;}
 if(cmd==='reset'){state=STARTER();save();close();resetIdle();openPanel('help');return;}
 if(cmd==='update'){b.disabled=true;b.textContent='최신 버전 확인 중…';try{await reg?.update();if(reg?.installing){b.textContent='새 게임 파일을 받는 중…';await new Promise((resolve,reject)=>{const worker=reg.installing;const timeout=setTimeout(()=>reject(Error('update timeout')),90000);const check=()=>{if(worker.state==='activated'){clearTimeout(timeout);resolve();}else if(worker.state==='redundant'){clearTimeout(timeout);reject(Error('update failed'));}};worker.addEventListener('statechange',check);check();});}const res=await fetch(`version.json?t=${Date.now()}`,{cache:'no-store'});if(!res.ok)throw Error();const v=await res.json();if(v.version===VERSION){toast(`최신 버전 ${VERSION}을 사용 중이에요.`);openPanel('settings');}else{save();reg?.waiting?.postMessage({type:'SKIP_WAITING'});show('업데이트가 준비됐어요',`<p>저장한 진행은 유지돼요. 다시 열면 최신 버전 ${esc(v.version)}이 적용됩니다.</p><button class="primary" data-do="reload">저장하고 새로 열기</button>`,'update');}}catch{toast('인터넷 연결을 확인하고 다시 시도해 주세요.');openPanel('settings');}return;}
 if(cmd==='reload'){save();location.reload();}
});
let pendingImport=null;$('importFile').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>5000000)throw Error('저장 파일이 너무 커요.');pendingImport=validateSave(JSON.parse(await file.text()));show('저장 파일을 가져올까요?',`<p>현재 진행을 파일 속 기록으로 바꿉니다.</p><div class="notice">${REGIONS[pendingImport.region].name} · ${pendingImport.caught}마리 · ${fmt(pendingImport.coins)} G</div><button class="primary" id="confirmImport">이 기록으로 이어하기</button><button class="secondary" data-do="settings">취소</button>`,'import');$('confirmImport').onclick=()=>{state=pendingImport;pendingImport=null;save();close();resetIdle('가져온 여행을 이어갈 준비가 됐어요.');toast('저장 파일을 가져왔어요.');};}catch(err){toast(err.message||'올바른 저장 파일이 아니에요.',4000);}e.target.value='';};
document.addEventListener('visibilitychange',()=>{releaseInput();if(document.hidden){save();paused=true;}render();});window.addEventListener('pagehide',save);window.addEventListener('blur',()=>{releaseInput();if(phase!=='idle')paused=true;render();});$('pauseOverlay').onclick=()=>{paused=false;last=performance.now();render();};
if('serviceWorker'in navigator&&!['localhost','127.0.0.1'].includes(location.hostname)){navigator.serviceWorker.register('./sw.js').then(r=>{reg=r;}).catch(()=>{});}
function goTown(){
 if(phase!=='idle'){show('마을로 돌아갈까요?',`<p>진행 중인 낚시를 마치고 물결항으로 돌아갑니다. 사용한 미끼는 돌려받지 못하지만 이미 잡은 물고기는 그대로 보관돼요.</p><button class="secondary" data-do="town-confirm">낚시를 멈추고 귀항</button><button class="primary" data-do="resume-fishing">낚시 계속하기</button>`,'return');return;}
 view='town';releaseInput();paused=false;close();render();
}
function renderActiveSkills(){
 [0,1,2].forEach(i=>{const id=state.equippedSkills[i],k=SKILLS.find(k=>k.id===id),n=state.skills[id]||0,b=$('active'+i),cool=fight?.cooldowns[id]||0,cost=({strike:.6,slow:.8,surge:.7,cool:.5,bleed:.8,renewal:.8}[id]||1);
 b.firstElementChild.textContent=k.name;b.lastElementChild.textContent=!n?'미습득':phase==='bite'&&id==='strike'?'지금 챔질!':cool>0?`${Math.ceil(cool)}초`:fight?`MP ${Math.round(fight.skill*100)} / ${cost*100}`:`Lv.${n}`;
 b.disabled=!n||paused||!(phase==='bite'&&id==='strike'||phase==='fight'&&cool<=0&&(fight?.skill||0)+1e-6>=cost);b.classList.toggle('effect-on',Boolean(fight?.effects[id]>0));
 });
}
function useActive(i){if(modal.open||paused)return;const id=state.equippedSkills[i];if(!state.skills[id]){toast('마을의 낚시 학교에서 먼저 배워 주세요.');return;}
 if(phase==='bite'&&id==='strike'){castQuality=Math.min(1.25,castQuality+.1);action();if(fight){fight.hp-=7+5*state.skills.strike;fight.cooldowns.strike=18;fight.skill=0;}fx.impact('strike','강타!',true);sound('critical');toast('강타 챔질! 물고기를 확실히 걸었어요.');return;}
 if(phase==='fight'&&fight&&skill(fight,id)){const name=SKILLS.find(k=>k.id===id).name;fx.impact(id,name+'!',true);toast(`${name} 발동!`);sound(id==='shock'?'electric':'critical');buzz(25);renderActiveSkills();}
}
async function handleV2(cmd,id,b){
 if(['boats','home','storage','skills'].includes(cmd)){openPanel(cmd);return true;}
 if(cmd==='town-confirm'){if(fight)state.hp=Math.max(0,fight.hero);save();view='town';resetIdle();close();return true;}
 if(cmd==='resume-fishing'){close();return true;}
 const ops=['v2-upgrade','tackle-buy','boat-buy','boat-select','boat-sell-confirm','boat-sell','home-upgrade','sleep','store-fish','withdraw-fish','store-all','withdraw-all','skill-learn','skill-equip','v2-travel','v2-boss','bait-buy','bait-buy50','bait-emergency','skill-reset-confirm','skill-reset'];
 if(!ops.includes(cmd))return false;
 if(phase!=='idle'){toast('진행 중인 낚시를 마치거나 마을로 귀항한 뒤 이용해 주세요.');return true;}
 const failMsg='금화·레벨·미끼 외상과 필요한 조건을 확인해 주세요.';
 if(cmd==='skill-reset-confirm'){show('스킬을 다시 배분할까요?',`<p>사용한 스킬 포인트를 모두 돌려받아요. 배운 스킬은 초기화되며 금화는 들지 않아요.</p><button class="primary" data-do="skill-reset">포인트 돌려받기</button><button class="secondary" data-do="skills">취소</button>`,'skills');}
 if(cmd==='skill-reset'){resetSkills(state);save();openPanel('skills');}
 if(cmd==='v2-upgrade'){if(upgradeGear(state)){toast(`장비 강화 +${state.tackleUpgrade}!`);sound('catch');}else toast(failMsg);save();openPanel('shop');}
 if(cmd==='tackle-buy'){if(buyTackle(state)){toast('새 장비 세트를 장착했어요. 이전 장비는 정산했어요.');sound('catch');}else toast(failMsg);save();openPanel('shop');}
 if(cmd==='boat-buy'){if(buyBoat(state,Number(id))){selectBoat(state,Number(id));toast(`${BOATS[Number(id)].name} 구매 · 탑승 완료!`);sound('catch');}else toast(failMsg);save();openPanel('boats');}
 if(cmd==='boat-select'){if(selectBoat(state,Number(id)))toast(`${BOATS[Number(id)].name}에 탑승했어요.`);else toast('물고기가 배의 수족관 용량보다 많아요. 집에 보관하거나 판매해 주세요.');save();openPanel('boats');}
 if(cmd==='boat-sell-confirm'){const boat=BOATS[Number(id)];show('배를 판매할까요?',`${boatArt(boat.id)}<p><b>${boat.name}</b>을 ${fmt(boat.resale)} G에 판매합니다. 다시 사려면 구매 대금이 필요해요.</p><p class="muted">탑승 중인 배는 다른 소유 배로 갈아탑니다. 물고기를 모두 실을 배가 없으면 판매할 수 없어요.</p><button class="danger-button" data-do="boat-sell" data-id="${boat.id}">이 배 판매하기</button><button class="secondary" data-do="boats">취소</button>`,'boat-confirm');}
 if(cmd==='boat-sell'){if(sellBoat(state,Number(id)))toast('배를 판매했어요.');else toast('다른 배의 저장공간이 부족해요. 물고기를 집으로 옮겨 주세요.');save();openPanel('boats');}
 if(cmd==='home-upgrade'){if(upgradeHome(state)){toast(`${HOMES[state.home].name}으로 이사했어요!`);sound('catch');}else toast(failMsg);save();openPanel('home');}
 if(cmd==='sleep'){sleep(state);view='town';paused=false;save();openPanel('home');toast(`푹 잤어요! 체력 ${maxHP(state)} / ${maxHP(state)} · ${isNight(state)?'밤':'낮'}`,4000);}
 if(cmd==='store-fish'||cmd==='withdraw-fish'){if(!transferFish(state,id,cmd==='store-fish'))toast('수족관이 가득 찼어요. 공간을 비워 주세요.');save();openPanel('storage');}
 if(cmd==='store-all'||cmd==='withdraw-all'){const toHome=cmd==='store-all',source=toHome?state.bag:state.homeFish;let count=0;for(const x of [...source])if(transferFish(state,x.uid,toHome))count++;save();toast(`${count}마리를 ${toHome?'집':'배'} 수족관으로 옮겼어요.`);openPanel(panel==='home'?'home':'storage');}
 if(cmd==='skill-learn'){if(learnSkill(state,id)){toast(`${SKILLS.find(k=>k.id===id).name} Lv.${state.skills[id]} 습득!`);sound('catch');}else toast('필요 레벨과 남은 스킬 포인트를 확인해 주세요.');save();openPanel('skills');}
 if(cmd==='skill-equip'){const [skillId,slot]=id.split(':');if(equipSkill(state,skillId,Number(slot)))toast('전투 스킬을 장착했어요.');save();openPanel('skills');}
 if(cmd==='v2-travel'){const target=Number(id);if(state.hp<=0){openPanel('home');toast('먼저 잠을 자고 체력을 회복하세요.');return true;}if(target>state.unlocked)state.region=state.unlocked;if(travel(state,target)){view='fish';paused=false;save();close();resetIdle(`${REGIONS[target].name}에 도착했어요. ${BOATS[state.boat].name}에서 낚시를 시작해요.`);}else{openPanel('goals');toast('배 등급·레벨·이전 낚시터 목표를 확인해 주세요.');}}
 if(cmd==='v2-boss'){view='fish';paused=false;close();start(true);}
 if(cmd==='bait-buy'||cmd==='bait-buy50'){if(buyBait(state,id,cmd==='bait-buy'?10:50))toast('미끼를 구입했어요.');else toast(failMsg);save();openPanel('shop');}
 if(cmd==='bait-emergency'){if(emergencyBait(state))toast('기본 미끼 10개를 외상으로 받았어요. 판매금에서 정산돼요.');else toast('미끼가 남아 있거나 금화가 충분해요.');save();openPanel('shop');}
 render();return true;
}
resetIdle();requestAnimationFrame(tick);
if(state.migrated){delete state.migrated;save();toast('기존 기록을 새 배·장비 체계로 옮겼어요. 보관함 강화 비용은 돌려드렸어요.',6000);}
if(state.tutorial)openPanel('help');if(loadError)toast('저장 기록을 읽지 못했어요. 백업 파일이 있으면 설정에서 가져와 주세요.',6000);
