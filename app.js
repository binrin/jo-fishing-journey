import {ensureEquipment,fullyEquipped,changeEquipment,equipmentStats,equipmentName} from './equipment.js';
import {celebrate} from './celebrate.js';
import {gameTime,PERIODS,waitUntil,activityWeight,scheduleLabel,ecology} from './ecology.js';
import {castTargets,castResult,fishPeriod,weightLabel} from './catch-rules.js';
import {castLanding} from './water-layout.js';
import {FISH,REGIONS} from './data.js';
import {VERSION,TITLE,SAVE_KEY,STARTER,region,capacity,isNight,gearPrice,upgradeGear,gate,travel,finish,chooseFish,fishGrade,addCatch,sell,validateSave,chargeBait,makeFight,fightStep,tapStrike,TAP_COMBO_MAX,skill,SKILL_COOLDOWN,critical,spend,maxHP,buyBait,emergencyBait,buyTackle,buyBoat,selectBoat,sellBoat,sleep,upgradeHome,transferFish,learnSkill,equipSkill,legendReady,resetSkills,waitSeconds,fightPlan} from './engine.js';
import {BOATS,TACKLE,HOMES,SKILLS,BAITS,MAX_LEVEL,playerLevel,xpForLevel,availableSP} from './progression.js';
import {panelContent,boatArt} from './panels.js';
import {sprite,fishStyle,waterStyle,waterVars} from './art.js';
import {skillIcon} from './skill-icons.js';
import {FOODS,foodInfo,buyFood,eatFood,activeMeal,repLabel,repFactor,repSaleMult,luck,aquariumLuck,haggleChances,baitFamilyOf,familyInfo,addRep,baitInfo} from './systems.js';
import {tankHTML,startTank} from './tank.js';
import {createReelFeedback} from './reel-feedback.js';
import {createReelInput} from './touch-reel.js';
const reelInput=createReelInput();
import {createCombatFX} from './effects.js';
const $=id=>document.getElementById(id), fmt=n=>Math.round(n).toLocaleString('ko-KR'), esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state=STARTER(),storageWarning=false,loadError=false;
try{const raw=localStorage.getItem(SAVE_KEY);if(raw)state=validateSave(JSON.parse(raw));}catch{loadError=true;}
ensureEquipment(state);
let view='town';
let castAim=.5,castTarget={x:500,y:670},castFlight=1;
let targets=castTargets(),perfectCast=false;
function showCastTarget(key){const zone=document.querySelector('.perfect-zone');zone.style.left=(targets[key]-.09)*100+'%';zone.style.width='18%';$('castLabel').textContent=(key==='direction'?'① 방향':'② 힘')+' 목표 '+Math.round(targets[key]*100)+'%';}
let phase='idle',timer=0,cast=0,castDirection=0,castQuality=1,currentFish=null,currentGrade=2,fight=null,input=0,bossTrip=false,paused=false,panel='',last=performance.now(),hudClock=0,saveClock=0,toastTimer,context,reg=null,pendingCatch=null;
const modal=$('modal'),body=$('modalBody');
const fx=createCombatFX({scene:$('scene'),layer:$('combatEffects'),target:$('wildFish'),getState:()=>state});let hitClock=0;
const reelFeedback=createReelFeedback({sound,vibrate:buzz,cancelVibration:()=>{if(navigator.vibrate)navigator.vibrate(0);}});let dangerState='safe';
function save(){if(fight)state.hp=Math.max(0,fight.hero);state.savedAt=Date.now();try{localStorage.setItem(SAVE_KEY,JSON.stringify(state));}catch{if(!storageWarning){storageWarning=true;toast('저장 공간이 부족해요. 설정에서 저장 파일을 내보내 주세요.',5000);}}}
function toast(text,ms=2600){clearTimeout(toastTimer);{const t=$('toast'),host=modal.open?modal:document.body;if(t.parentElement!==host)host.append(t);}$('toast').textContent=text;$('toast').hidden=false;toastTimer=setTimeout(()=>$('toast').hidden=true,ms);}
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

 const r=region(state),night=isNight(state);if(state.meal&&!activeMeal(state)){state.meal=null;state.hp=Math.min(state.hp,maxHP(state));}{const m=activeMeal(state),mb=$('mealBtn');if(mb){mb.textContent=m?`${m.icon} ${Math.ceil(m.left/60)}분`:'🍙 식사';mb.classList.toggle('active',Boolean(m));}}$('coins').textContent=fmt(state.coins);$('bagCount').textContent=`${state.bag.length} / ${capacity(state)}`;$('debt').hidden=!state.debt;$('debt').textContent=`미끼 외상 ${fmt(state.debt)}`;$('location').textContent=r.display||r.name;$('chapter').textContent=`CHAPTER ${String(state.region+1).padStart(2,'0')} / ${REGIONS.length}`;$('scene').style.cssText=waterVars(state.region);$('scene').classList.toggle('night',night);$('clockBtn').textContent=`${night?'☾':'☀'} ${gameTime(state).label} ${gameTime(state).name}`;$('scene').dataset.period=PERIODS[gameTime(state).period].id;
 $('sellDot').hidden=!state.bag.length;$('baitText').textContent=`${baitInfo(state.bait).icon} ${baitInfo(state.bait).name}`;
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
 if(!fullyEquipped(state)){openPanel('equipment');toast('낚싯대·릴·찌·줄·바늘을 모두 장착해 주세요.');return;}
 if(phase!=='idle')return;if(state.hp<(boss?6:3)){openPanel('home');toast('집에서 잠을 자고 체력을 회복해 주세요.');return;}if(state.region>BOATS[state.boat].region){openPanel('map');toast('현재 배로 갈 수 있는 낚시터를 선택해 주세요.');return;}if(!boss&&state.baitStock[state.bait]<=0){openPanel('shop');toast('미끼가 떨어졌어요. 상점에서 준비해 주세요.');return;}view='fish';render();if(state.bag.length>=capacity(state)){toast('보관함이 가득 찼어요. 먼저 물고기를 판매해 주세요.');openPanel('market');return;}
 if(boss){const r=region(state);if(r.bossId==null||state.bosses.includes(r.bossId)||(state.tackle<state.region||state.tackle===state.region&&state.tackleUpgrade<2)||state.counts[state.region]<r.minimum_catches){openPanel('goals');return;}const f=FISH[r.bossId];if(f.legendary&&!legendReady(state)){openPanel('goals');toast('천해룡의 단서와 최종 장비를 먼저 준비하세요.');return;}if(activityWeight(f,state)<=0){toast(`${f.name} 추천: ${scheduleLabel(f)}. 시간 버튼에서 기다려 주세요.`,4500);return;}}
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
 if(phase==='bite'){phase='fight';fight=makeFight(state,currentFish,currentGrade,castQuality);fight.screenX=castTarget.x/10;$('fishSprite').style.cssText=fishStyle(currentFish.id);$('wildFish').classList.add('visible');$('wildFish').classList.toggle('boss-fish',bossTrip);$('fightLabel').hidden=false;$('fishName').textContent=(currentFish.legendary?'LEGEND · ':bossTrip?'BOSS · ':'')+currentFish.name;if(currentFish.legendary){fx.impact('critical','천해룡 아스트라 · 깨어남',true);toast('환상의 물고기가 모습을 드러냈어요. 세 번의 물결을 이겨내세요!',5000);};$('bobber').hidden=true;$('sceneMessage').hidden=true;$('leftBtn').disabled=false;$('rightBtn').disabled=false;setAction('손 떼고 쉬기','긴장을 낮춰요');sound('bite');buzz(35);return;}
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
 if(phase!=='fight'){action();if(phase!=='fight'||!fight)return;fx.update(fight,performance.now()/1000);}
 const r=water.getBoundingClientRect();reelInput.waterDown(e.pointerId,e.clientX,r.left,r.width);input=reelInput.input;try{water.setPointerCapture(e.pointerId);}catch{}
 if(input===-fight.direction){tapStrike(fight,input);const c=fight.combo||1;fx.impact(c>=TAP_COMBO_MAX?'combo-max':c>=5?'combo':'hit',c>1?`탁! ×${c}`:'탁!',true);sound('hit');hitClock=0;}else{fight.combo=0;fx.impact('miss',fight.direction>0?'◀ 왼쪽을 터치!':'오른쪽을 터치! ▶',true);}syncReel();
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
function fail(message){if(fight)state.hp=Math.max(0,fight.hero);state.fame=Math.max(0,state.fame-1);addRep(state,-.5);state.stats.failures++;save();sound('fail');resetIdle(message);show('아쉽게 놓쳤어요',`<p>${message}</p><div class="notice">물고기가 가는 방향의 <b>반대쪽 수면</b>을 터치해서 줄을 감으세요. 줄이 빨개지면 <b>수면에서 손을 떼고</b> 줄을 풀어 주세요.</div><p class="muted">미끼는 사용되었지만 장비와 이미 잡은 물고기는 그대로예요.</p><button class="primary" data-do="retry">다시 낚시하기</button>`,'result');}
function caught(){state.hp=Math.max(0,fight.hero);const oldLevel=playerLevel(state);const item=addCatch(state,fight.fish,fight.grade,perfectCast?1.1:.92+Math.random()*.16);if(!item){resetIdle();toast('보관함을 확인해 주세요.');return;}pendingCatch=item;save();if(playerLevel(state)>oldLevel)toast(`레벨 업! Lv.${playerLevel(state)} · 스킬 포인트를 확인하세요.`,4000);sound('catch');buzz([30,50,30]);resetIdle('멋진 한 마리! 여행 수첩에 기록했어요.');const f=FISH[item.id];show('월척! 잘 잡았어요',`<div class="catch-heading"><small>${f.boss?'전설의 보스 포획':f.ornamental?'반짝이는 관상어':'오늘의 작은 발견'}</small><div class="catch-art">${sprite(f.id)}</div><h3>${f.name}</h3><p>${['대형','중형','소형'][item.grade]} · ${item.size}cm · ${weightLabel(item)} · ${REGIONS[item.region].name}</p></div><div class="stat-pills"><span>판매가 <b>${fmt(item.value)} G</b></span><span>도감 <b>${Object.keys(state.collection).length}/${FISH.length}</b></span><span><b>+${item.xp} EXP</b></span></div><button class="primary" data-do="sell-catch">바로 판매 · ${fmt(Math.max(0,item.value-(item.boss?0:REGIONS[item.region].expense_on_sale)))} G</button><button class="secondary" data-do="retry">보관하고 계속 낚시</button>${f.legendary?'<button class="primary" data-do="finish">전설의 여행 엔딩 보기</button>':''}${f.boss?'<p class="notice">보스 단서를 여행 수첩에 기록했어요. 마지막 전설어를 잡았다면 엔딩과 집 기념관을 확인하세요.</p>':''}`,'result');}
function rodTip(){const scene=$('scene').getBoundingClientRect(),hero=document.querySelector('#scene>.hero').getBoundingClientRect();return {x:(hero.left-scene.left+hero.width*.52)/scene.width*1000,y:(hero.top-scene.top+hero.height*.035)/scene.height*1000};}
function drawLine(x,y,sag=0){const tip=rodTip();$('fishingLine').setAttribute('d',`M${tip.x} ${tip.y} Q${(tip.x+x)/2} ${(tip.y+y)/2+sag} ${x} ${y}`);}
function castVisual(dt){const active=['waiting','bite'].includes(phase);$('game').classList.toggle('casting-mode',active);if(!active)return;castFlight=Math.min(1,castFlight+dt/.65);const t=1-(1-castFlight)**2,tip=rodTip(),x=tip.x+(castTarget.x-tip.x)*t,y=tip.y+(castTarget.y-tip.y)*t-Math.sin(t*Math.PI)*90;$('bobber').style.left=x/10+'%';$('bobber').style.top=y/10+'%';drawLine(x,y,castFlight<1?-30:25);}
function tick(now){const dt=Math.min(.08,(now-last)/1000);last=now;
 if(!paused&&!modal.open&&!document.hidden){
  state.seconds+=dt;saveClock+=dt;hudClock+=dt;
  if(phase==='direction'||phase==='power'){timer+=dt;cast=(Math.sin(timer*(phase==='direction'?2.3:3.1))+1)/2;$('castNeedle').style.left=`${cast*98}%`;}
  if(phase==='waiting'){timer-=dt;if(timer<=0){phase='bite';timer=(state.caught<3?5:2.4)+(state.skills.focus||0)*.2+equipmentStats(state).biteBonus;setAction('지금 챔질!','지금 눌러요!');hint('입질! 수면을 터치해 챔질하세요',true);$('sceneMessage').textContent='왔다! 지금 챔질해요!';sound('bite');buzz([30,30,30]);}}
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
 if(name==='town'){goTown();return;}if(name==='tank'){openTank();return;}const content=panelContent(name,state);if(content){show(content.title,content.html,name);render();return;}

 if(name==='time'){const now=gameTime(state);show('낚시 시간표',`<p>현재 ${now.label} · ${now.name}</p><p>게임 하루 = 플레이 10분. 기다리기는 체력을 회복하지 않아요.</p>${PERIODS.map(p=>`<button class="secondary" data-do="wait-hour" data-id="${p.start}">${p.name} ${p.start}:00까지 기다리기</button>`).join('')}<p>현재 노려볼 어종</p>${FISH.filter(f=>f.regions.includes(state.region)&&!f.boss&&activityWeight(f,state)>=.8).map(f=>`<button data-do="fish-detail" data-id="${f.id}">${f.name}</button>`).join('')}<p class="muted">활동 성향을 반영한 게임 확률입니다. 실제 조황은 수온·계절·수심에도 달라집니다.</p>`,'time');}
 else if(name==='market'){for(const id of [...saleSel])if(!state.bag.some(x=>x.uid===id))saleSel.delete(id);const gross=state.bag.reduce((a,f)=>a+f.value,0),rf=repFactor(state),hc=haggleChances(state);
  show('물고기 시장',`<div class="notice"><b>${state.bag.length}마리 · 기준가 ${fmt(gross)} G</b>${state.debt?` · 미끼 외상 ${fmt(state.debt)} G`:''}<br>평판 <b>${Math.round(state.rep||0)}</b> · ${repLabel(state)} · 판매가 ${rf>=0?'+':''}${(rf*10).toFixed(1)}% · 장비·음식·미끼 ${rf>=0?'−':'+'}${Math.abs(rf*10).toFixed(1)}%<br>행운 <b>${luck(state)}</b> · 흥정 대성공 ${(hc.great*100).toFixed(1)}% · 성공 ${(hc.success*100).toFixed(1)}%</div>${state.bag.length?`<div class="row sel-tools"><button class="secondary" data-do="sel-all">전체 선택</button><button class="secondary" data-do="sel-cheap">싼 물고기 선택</button><button class="secondary" data-do="sel-none">선택 해제</button></div><p class="sel-summary" id="selSummary"></p><div class="row sale-actions"><button class="primary" data-do="sell-sel" data-id="normal">일반 판매<br><small>100%</small></button><button class="secondary" data-do="sell-sel" data-id="discount">평판 판매<br><small>80% · 평판 +0.5/마리</small></button><button class="secondary" data-do="haggle-confirm">흥정<br><small>×3 / ×2 / 실패 반값</small></button></div><div class="sale-list">${state.bag.map(x=>`<button class="list-item sale-item ${saleSel.has(x.uid)?'selected':''}" data-do="sel-toggle" data-id="${x.uid}">${sprite(x.id)}<div class="desc"><strong>${FISH[x.id].name}</strong><small>${['대형','중형','소형'][x.grade]} · ${x.size}cm · ${weightLabel(x)}</small></div><b class="sale-price">${fmt(x.value)} G</b><i class="sale-check" aria-hidden="true"></i></button>`).join('')}</div>`:'<p>아직 보관한 물고기가 없어요. 낚시터에서 한 마리 잡아볼까요?</p>'}<p class="muted">물고기를 골라서 원하는 방법으로 팔아요. 판매가 = 무게(kg) × kg 단가, 판매마다 유지비가 빠져요. 평판 판매로 평판을 쌓으면 모든 판매가가 오르고 장비·음식이 싸져요.</p>`,'market');updateSaleSummary();}
 else if(name==='collection')show('물고기 여행 도감',`<p><b>${Object.keys(state.collection).length} / ${FISH.length}종</b>을 만났어요. 물고기를 누르면 미끼와 시간대를 볼 수 있어요.</p><div class="fish-grid">${FISH.map(f=>`<button class="fish-card ${state.collection[f.id]?'':'unknown'}" data-do="fish-detail" data-id="${f.id}">${sprite(f.id)}<b>${f.name}</b><small>${state.collection[f.id]?`${state.collection[f.id]}마리 · ${state.records[f.id]}cm`:f.boss?'보스 어종':f.ornamental?'관상어':'아직 만나지 못함'}</small></button>`).join('')}</div>`,'collection');
 else if(name==='settings')show('게임 설정',`<div class="setting-row"><b>효과음</b><button data-do="sound">${state.muted?'꺼짐':'켜짐'}</button></div><div class="setting-row"><b>진동</b><button data-do="haptics">${state.haptics?'켜짐':'꺼짐'}</button></div><p class="muted">진동은 지원하는 휴대폰에서만 작동해요.</p><button class="primary" data-do="update">최신 버전 업데이트</button><button class="secondary" data-do="help">게임 방법 · 홈 화면에 추가</button><div class="row"><button class="secondary" data-do="export">저장 내보내기</button><button class="secondary" data-do="import">저장 가져오기</button></div><p class="muted">자동 저장은 지금 사용하는 기기·브라우저에 저장돼요. 다른 휴대폰으로 옮길 때 저장 파일을 가져오세요. 앱을 닫으면 진행 중인 낚시는 끝나지만, 잡은 물고기와 금화는 유지됩니다.</p><button class="danger-button" data-do="reset-confirm">처음부터 다시 시작</button><p class="version">${TITLE} v${VERSION}<br>여행 시간 ${Math.floor(state.seconds/3600)}시간 ${Math.floor(state.seconds/60)%60}분 · ${state.caught}마리 포획<br>그림: 새로 제작한 AI 일러스트 · 폰트: LINE Seed KR<br><b>© 2026 체니. All rights reserved.</b><br>새 게임 코드·창작 콘텐츠 저작권자: 체니<br><a href="LICENSE.txt" target="_blank" rel="noopener">저작권 및 이용 안내</a></p>`,'settings');
 render();
}
document.querySelectorAll('[data-panel]').forEach(b=>b.onclick=()=>openPanel(b.dataset.panel));$('settingsBtn').onclick=()=>openPanel('settings');$('bagBtn').onclick=()=>openPanel('storage');$('baitBtn').onclick=()=>{if(phase==='idle')openPanel('bait');else toast('낚시를 마친 뒤 미끼를 바꿀 수 있어요.');};$('bossBtn').onclick=()=>openPanel('goals');$('mealBtn').onclick=()=>{if(phase==='fight'){toast('물고기와 싸우는 중에는 먹을 수 없어요.');return;}openPanel('food');};$('clockBtn').onclick=()=>{if(phase!=='idle'){toast('낚시를 마치고 집에서 쉬어 주세요.');return;}openPanel('time');};
function showHaggleResult(xs){const base=xs.reduce((a,f)=>a+f.value,0),rep0=state.rep||0,r=performSale(xs.map(x=>x.uid),'bold',true);if(!r.count){openPanel('market');return;}
 const o=r.outcome,info={great:['대성공!','×3','💰','haggle-great','상인이 감탄했어요! 세 배 값을 받았어요.'],success:['성공!','×2','🤝','haggle-success','좋은 값에 넘겼어요.'],fail:['실패…','×½','😓','haggle-fail','상인이 고개를 저었어요. 물고기는 반값에 넘겼어요.']}[o];
 const dRep=Math.round(((state.rep||0)-rep0)*10)/10;
 show('흥정 결과',`<div class="haggle-result"><span class="haggle-badge ${o}">${info[2]} 흥정 ${info[0]} ${info[1]}</span><p>${info[4]}</p><div class="haggle-rows"><span>물고기</span><b>${r.count}마리</b><span>기준가</span><b>${fmt(base)} G</b><span>흥정 배율</span><b>${info[1]}</b>${r.fee?`<span>유지비</span><b>−${fmt(r.fee)} G</b>`:''}<span>평판</span><b>${dRep>=0?'+':''}${dRep} → ${Math.round(state.rep||0)}</b><span class="total">받은 금화</span><b class="total">${fmt(r.net)} G</b></div></div><button class="primary" data-do="market">시장으로 돌아가기</button>`,'haggle-result');
 celebrate(info[3],{icon:info[2],title:`흥정 ${info[0]}`,sub:`${info[1]} · ${fmt(r.net)} G`});
 sound(o==='fail'?'fail':o==='great'?'critical':'catch');if(o==='great')setTimeout(()=>sound('critical'),260);buzz(o==='great'?[30,40,30,40,60]:o==='success'?[25,30,25]:60);}
function performSale(ids,method='normal',quiet=false){const r=sell(state,ids,method);for(const id of ids)saleSel.delete(id);save();render();if(!r.count)return r;
 const msg=r.outcome==='great'?`흥정 대성공! 3배 · ${fmt(r.net)} G`:r.outcome==='success'?`흥정 성공! 2배 · ${fmt(r.net)} G`:r.outcome==='fail'?`흥정 실패… 반값에 넘겼어요 · ${fmt(r.net)} G`:method==='discount'?`${r.count}마리 평판 판매 · ${fmt(r.net)} G · 평판 ${Math.round(state.rep)}`:`${r.count}마리 판매! 유지비 제외 ${fmt(r.net)} G`;
 if(quiet)return r;sound(r.outcome==='fail'?'fail':'catch');toast(msg,3500);return r;}
let saleSel=new Set();
body.addEventListener('click',async e=>{const b=e.target.closest('[data-do]');if(!b||b.disabled)return;const cmd=b.dataset.do,id=b.dataset.id;
 if(handleV3(cmd,id,b))return;
 if(await handleV2(cmd,id,b))return;
 if(['map','market','shop','collection','aquarium','goals','help','settings','bait'].includes(cmd)){openPanel(cmd);return;}
 if(cmd==='tutorial-done'){state.tutorial=false;view='town';close();return;}
 if(cmd==='retry'){close();if(phase==='idle')start();return;}
 if(cmd==='sell-catch'){if(pendingCatch)performSale([pendingCatch.uid]);pendingCatch=null;close();return;}
 if(cmd==='sell-all'||cmd==='discount'){performSale(state.bag.map(x=>x.uid),cmd==='discount'?'discount':'normal');openPanel('market');return;}
 if(cmd==='sell-one'){performSale([id]);openPanel('market');return;}
 if(cmd==='bold-confirm'){show('배짱 흥정을 할까요?',`<p>일반 물고기를 모두 흥정해요. <b>68% 확률로 150%</b>를 받지만, 실패하면 해당 물고기는 사라지고 <b>판매 대금은 0</b>이에요. 평판도 떨어져요.</p><p class="muted">보스 물고기는 위험 흥정에서 제외하고 정가로 판매해요.</p><button class="danger-button" data-do="bold">위험을 감수하고 흥정</button><button class="secondary" data-do="market">일반 판매로 돌아가기</button>`,'bold');return;}
 if(cmd==='bold'){performSale(state.bag.map(x=>x.uid),'bold');openPanel('market');return;}
 if(cmd==='finish'){if(phase!=='idle'){toast('낚시를 마친 뒤 여행을 완성해 주세요.');return;}if(finish(state)){save();show('조선생, 전설이 되다',`<div class="result-star">✦ ✦ ✦</div><div class="catch-art">${sprite(239)}</div><h3 class="catch-heading">서른 개의 물가 끝에서 천해룡 아스트라를 만났어요!</h3><p class="notice">총 ${state.caught}마리 · 도감 ${Object.keys(state.collection).length}/${FISH.length}종 · 여행 시간 ${Math.floor(state.seconds/60)}분</p><p>이제 모든 낚시터를 자유롭게 오가며 남은 물고기를 만나고, 가장 큰 기록에 도전하세요.</p><button class="primary" data-do="collection">남은 도감 살펴보기</button>`,'ending');render();}return;}
 if(cmd==='bait-select'){if(phase!=='idle'){toast('낚시를 마친 뒤 미끼를 바꿀 수 있어요.');return;}const bait=BAITS.find(x=>x.id===id);if(!bait||playerLevel(state)<bait.level||!(state.baitStock[id]>0)){toast('레벨과 미끼 보유 수량을 확인해 주세요.');return;}state.bait=id;save();openPanel('bait');return;}
 if(cmd==='wait-hour'){if(phase!=='idle')return;const hour=Number(id);if(!PERIODS.some(p=>p.start===hour))return;waitUntil(state,hour);save();render();openPanel('time');return;}
 if(cmd==='fish-detail'){const f=FISH[Number(id)];show(f.name,`<div class="catch-art">${sprite(f.id)}</div><p><b>낚시터</b> · ${f.regions.map(i=>REGIONS[i].display||REGIONS[i].name).join(', ')}</p><p><b>시간대</b> · ${scheduleLabel(f)}<br><small>${ecology(f).kind} · ${ecology(f).note}</small>${ecology(f).url?`<br><a href="${ecology(f).url}" target="_blank" rel="noopener">생태 자료 보기</a>`:''}</p><p><b>미끼</b> · ${f.boss?'지역 장비 +2와 포획 목표 달성 후 도전 · 천해룡은 최종 장비 +5와 모든 단서 필요':f.ornamental?'황금 등급 미끼':`${familyInfo(baitFamilyOf(f)).icon} ${familyInfo(baitFamilyOf(f)).name}`}</p><p>${esc(f.note.replace(/[^。.!]*[낮밤]에 출몰[^。.!]*[。.]?/g,''))}</p><p>중형 기준 예상 ${Math.ceil(fightPlan({...state,region:f.regions[0]},f).expected)}초 / 제한 ${fightPlan({...state,region:f.regions[0]},f).limit}초<br><small>반대 방향 조작과 줄 풀기 포함 추정 · 스킬 사용과 실제 조작에 따라 달라집니다.</small></p><div class="notice">${state.collection[f.id]?`포획 ${state.collection[f.id]}마리 · 최고 기록 ${state.records[f.id]}cm`:'아직 만나지 못한 물고기예요.'}</div><button class="secondary" data-do="collection">도감으로 돌아가기</button>`,'fish-detail');return;}
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
 [0,1,2].forEach(i=>{const id=state.equippedSkills[i],k=SKILLS.find(k=>k.id===id),n=state.skills[id]||0,b=$('active'+i),cool=fight?.cooldowns[id]||0,inFight=phase==='fight'&&fight&&!fight.done;
 if(b.dataset.skill!==id){b.dataset.skill=id;b.querySelector('.skill-icon')?.remove();b.insertAdjacentHTML('afterbegin',skillIcon(id));}b.classList.toggle('unlearned',!n);b.style.setProperty('--cool',k&&cool>0?Math.min(1,cool/(SKILL_COOLDOWN[id]||20)):0);b.setAttribute('aria-label',k.name);b.querySelector('b').textContent=k.name;
 b.querySelector('small').textContent=!n?'미습득':!inFight?(phase==='bite'||phase==='waiting'?'챔질 후 사용':`Lv.${n}`):cool>0?`${Math.ceil(cool)}초`:'사용 가능';
 b.disabled=!n||paused||!inFight||cool>0;b.classList.toggle('effect-on',Boolean(fight?.effects[id]>0));
 });
}
function useActive(i){if(modal.open||paused)return;const id=state.equippedSkills[i];if(!state.skills[id]){toast('마을의 낚시 학교에서 먼저 배워 주세요.');return;}
 if(phase!=='fight'||!fight){toast(id==='strike'?'강타는 물고기를 건 뒤에 쓸 수 있어요.':'물고기를 건 뒤에 사용할 수 있어요.');return;}
 if(skill(fight,id)){const name=SKILLS.find(k=>k.id===id).name;fx.impact(id,name+'!',true);toast(`${name} 발동!`);sound(id==='shock'?'electric':'critical');buzz(25);renderActiveSkills();}
}
function selectedFish(){return state.bag.filter(x=>saleSel.has(x.uid));}
function updateSaleSummary(){const el=document.getElementById('selSummary');if(!el)return;const xs=selectedFish(),v=xs.reduce((a,f)=>a+f.value,0),fee=xs.filter(x=>!x.boss).reduce((a,f)=>a+REGIONS[f.region].expense_on_sale,0),rm=repSaleMult(state);
 el.innerHTML=xs.length?`선택 <b>${xs.length}마리</b> · 일반 ${fmt(Math.max(0,v*rm-fee))} G · 평판 ${fmt(Math.max(0,v*.8*rm-fee))} G`:'판매할 물고기를 눌러 선택하세요.';
 for(const b of body.querySelectorAll('[data-do="sell-sel"],[data-do="haggle-confirm"]'))b.disabled=!xs.length;}
function handleV3(cmd,id,b){
 if(cmd==='sel-toggle'){if(saleSel.has(id))saleSel.delete(id);else saleSel.add(id);b.classList.toggle('selected',saleSel.has(id));updateSaleSummary();return true;}
 if(cmd==='sel-all'||cmd==='sel-none'||cmd==='sel-cheap'){saleSel=new Set();if(cmd==='sel-all')state.bag.forEach(x=>saleSel.add(x.uid));if(cmd==='sel-cheap'){const sorted=[...state.bag].filter(x=>!x.boss).sort((a,c)=>a.value-c.value);sorted.slice(0,Math.ceil(sorted.length/2)).forEach(x=>saleSel.add(x.uid));}for(const el of body.querySelectorAll('.sale-item'))el.classList.toggle('selected',saleSel.has(el.dataset.id));updateSaleSummary();return true;}
 if(cmd==='sell-sel'){const ids=selectedFish().map(x=>x.uid);if(!ids.length){toast('먼저 판매할 물고기를 선택하세요.');return true;}performSale(ids,id==='discount'?'discount':'normal');openPanel('market');return true;}
 if(cmd==='haggle-confirm'){const xs=selectedFish();if(!xs.length){toast('먼저 판매할 물고기를 선택하세요.');return true;}const hc=haggleChances(state),v=xs.reduce((a,f)=>a+f.value,0);show('흥정할까요?',`<p>선택한 <b>${xs.length}마리</b>(기준가 ${fmt(v)} G)를 한 번에 흥정해요.</p><ul class="checklist"><li>대성공 ${(hc.great*100).toFixed(1)}% · <b>3배</b></li><li>성공 ${(hc.success*100).toFixed(1)}% · <b>2배</b></li><li>실패 ${((1-hc.great-hc.success)*100).toFixed(1)}% · <b>반값</b>에 판매</li></ul><p class="muted">실패해도 물고기를 잃지 않고 반값을 받아요. 행운이 높을수록 성공 확률이 올라가요. 보스 물고기는 정가로 팔아요.</p><button class="primary" data-do="haggle">흥정 시작</button><button class="secondary" data-do="market">돌아가기</button>`,'haggle');return true;}
 if(cmd==='haggle'){const xs=selectedFish();if(!xs.length){openPanel('market');return true;}showHaggleResult(xs);return true;}
 if(cmd==='restaurant'||cmd==='food'){openPanel(cmd);return true;}
 if(cmd==='food-buy'){if(buyFood(state,id,1,spend)){toast(`${foodInfo(id).name}을(를) 샀어요.`);sound('catch');save();}else toast('금화·레벨·외상을 확인해 주세요.');openPanel(panel==='food'?'food':'restaurant');return true;}
 if(cmd==='food-eat'){if(phase==='fight'){toast('물고기와 싸우는 중에는 먹을 수 없어요.');return true;}const f=foodInfo(id);if(eatFood(state,id,maxHP)){toast(`${f.icon} ${f.name} 냠냠! ${f.desc}`,3500);sound('catch');save();render();}openPanel(panel==='restaurant'?'restaurant':'food');return true;}
 if(cmd==='tank'){openTank();return true;}
 return false;
}
function openTank(){const L=aquariumLuck(state);show('내 수족관',`${tankHTML(state.homeFish)}<div class="notice">집 수족관 ${state.homeFish.length}/${HOMES[state.home].capacity}마리 · 어항에는 최대 36마리가 헤엄쳐요.<br>관상어 행운 <b>+${L}</b> · 관상어는 종류마다 한 번씩, 깊은 바다의 관상어일수록 행운이 커요.</div><div class="row"><button class="secondary" data-do="storage">물고기 보관 · 꺼내기</button><button class="secondary" data-do="home">내 집</button></div>`,'tank');startTank(body,state.homeFish);}
async function handleV2(cmd,id,b){
 if(['boats','home','storage','skills','equipment'].includes(cmd)){openPanel(cmd);return true;}
 if(cmd==='town-confirm'){if(fight)state.hp=Math.max(0,fight.hero);save();view='town';resetIdle();close();return true;}
 if(cmd==='resume-fishing'){close();return true;}
 if(cmd.startsWith('equipment-')){if(phase!=='idle'){toast('낚시를 마치고 장비를 바꿔 주세요.');return true;}const [slot,tier]=id.split(':');const act=cmd.slice(10),ok=changeEquipment(state,act,slot,Number(tier));if(!ok)toast('금화·레벨·보유 장비와 외상을 확인해 주세요.');else if(act!=='enhance'&&act!=='buy')toast('장비 변경을 완료했어요.');if(ok){sound(act==='enhance'?'hit':'catch');save();}openPanel(panel==='shop'?'shop':'equipment');const section=body.querySelector('[data-equipment-slot="'+slot+'"]');if(section){section.open=true;section.scrollIntoView({block:'nearest'});}if(ok&&(act==='enhance'||act==='buy')){const ic={rod:'🎣',reel:'⚙️',float:'🔴',line:'🧵',hook:'🪝'}[slot]||'✨',nm=equipmentName(slot,Number(tier));if(act==='enhance'){const rk=ensureEquipment(state)[slot].owned[Number(tier)];celebrate('forge',{icon:ic,title:`강화 성공! +${rk}`,sub:nm});setTimeout(()=>sound('critical'),180);buzz([20,30,40]);}else{celebrate('newgear',{icon:ic,title:'새 장비!',sub:nm});buzz([20,40,20]);}}return true;}
 const ops=['v2-upgrade','tackle-buy','boat-buy','boat-select','boat-sell-confirm','boat-sell','home-upgrade','sleep','store-fish','withdraw-fish','store-all','withdraw-all','skill-learn','skill-equip','v2-travel','v2-boss','bait-buy','bait-buy50','bait-emergency','skill-reset-confirm','skill-reset'];
 if(!ops.includes(cmd))return false;
 if(phase!=='idle'){toast('진행 중인 낚시를 마치거나 마을로 귀항한 뒤 이용해 주세요.');return true;}
 const failMsg='금화·레벨·미끼 외상과 필요한 조건을 확인해 주세요.';
 if(cmd==='skill-reset-confirm'){show('스킬을 다시 배분할까요?',`<p>사용한 스킬 포인트를 모두 돌려받아요. 배운 스킬은 초기화되며 금화는 들지 않아요.</p><button class="primary" data-do="skill-reset">포인트 돌려받기</button><button class="secondary" data-do="skills">취소</button>`,'skills');}
 if(cmd==='skill-reset'){resetSkills(state);save();openPanel('skills');}
 if(cmd==='v2-upgrade'){if(upgradeGear(state)){save();openPanel('shop');celebrate('forge',{icon:'🔨',title:`강화 성공! +${state.tackleUpgrade}`,sub:TACKLE[state.tackle].name});sound('hit');setTimeout(()=>sound('critical'),180);buzz([20,30,40]);}else{toast(failMsg);save();openPanel('shop');}}
 if(cmd==='tackle-buy'){if(buyTackle(state)){save();openPanel('shop');celebrate('newgear',{icon:'🎣',title:'새 장비 세트!',sub:`${TACKLE[state.tackle].name} 장착 · 이전 장비는 정산했어요`});sound('catch');buzz([20,40,20]);}else{toast(failMsg);save();openPanel('shop');}}
 if(cmd==='boat-buy'){if(buyBoat(state,Number(id))){selectBoat(state,Number(id));save();openPanel('boats');celebrate('boat',{icon:'⛵',title:'새 배 출항!',sub:`${BOATS[Number(id)].name} 구매 · 탑승 완료`});sound('catch');buzz([20,40,20]);}else{toast(failMsg);save();openPanel('boats');}}
 if(cmd==='boat-select'){if(selectBoat(state,Number(id)))toast(`${BOATS[Number(id)].name}에 탑승했어요.`);else toast('물고기가 배의 수족관 용량보다 많아요. 집에 보관하거나 판매해 주세요.');save();openPanel('boats');}
 if(cmd==='boat-sell-confirm'){const boat=BOATS[Number(id)];show('배를 판매할까요?',`${boatArt(boat.id)}<p><b>${boat.name}</b>을 ${fmt(boat.resale)} G에 판매합니다. 다시 사려면 구매 대금이 필요해요.</p><p class="muted">탑승 중인 배는 다른 소유 배로 갈아탑니다. 물고기를 모두 실을 배가 없으면 판매할 수 없어요.</p><button class="danger-button" data-do="boat-sell" data-id="${boat.id}">이 배 판매하기</button><button class="secondary" data-do="boats">취소</button>`,'boat-confirm');}
 if(cmd==='boat-sell'){if(sellBoat(state,Number(id)))toast('배를 판매했어요.');else toast('다른 배의 저장공간이 부족해요. 물고기를 집으로 옮겨 주세요.');save();openPanel('boats');}
 if(cmd==='home-upgrade'){if(upgradeHome(state)){save();openPanel('home');celebrate('home',{icon:'🏠',title:'이사 완료!',sub:`${HOMES[state.home].name}으로 옮겼어요`});sound('catch');buzz([20,40,20]);}else{toast(failMsg);save();openPanel('home');}}
 if(cmd==='sleep'){sleep(state);view='town';paused=false;save();openPanel('home');toast(`푹 잤어요! 체력 ${maxHP(state)} / ${maxHP(state)} · ${isNight(state)?'밤':'낮'}`,4000);}
 if(cmd==='store-fish'||cmd==='withdraw-fish'){if(!transferFish(state,id,cmd==='store-fish'))toast('수족관이 가득 찼어요. 공간을 비워 주세요.');save();openPanel('storage');}
 if(cmd==='store-all'||cmd==='withdraw-all'){const toHome=cmd==='store-all',source=toHome?state.bag:state.homeFish;let count=0;for(const x of [...source])if(transferFish(state,x.uid,toHome))count++;save();toast(`${count}마리를 ${toHome?'집':'배'} 수족관으로 옮겼어요.`);openPanel(panel==='home'?'home':'storage');}
 if(cmd==='skill-learn'){if(learnSkill(state,id)){save();openPanel('skills');celebrate('skill',{icon:'📜',title:`${SKILLS.find(k=>k.id===id).name} Lv.${state.skills[id]}`,sub:'스킬 습득!'});sound('critical');buzz([15,30,15]);}else{toast('필요 레벨과 남은 스킬 포인트를 확인해 주세요.');save();openPanel('skills');}}
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
