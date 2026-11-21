import {createFindsUI,findResult} from './finds-ui.js';
import {ensureEquipment,fullyEquipped,changeEquipment,equipmentStats,equipmentName} from './equipment.js';
import {createRaceUI} from './race-ui.js';
import {credit,discountRepPreview,WATER_NET,waterNetRemaining,waterNetCanStore,activateWaterNet} from './engine.js';
import {loadCurrentSave,keepRewardHistory,discardLegacySaves} from './save-generation.js';
import {REWARD_BOOSTS,BOOST_DURATION,useRewardBoost} from './systems.js';
import {celebrate} from './celebrate.js';
import {autoRunning,canStartAuto,startAuto,stopAuto,autoTick,autoPace,unseenAutoResult,autoRates,autoBait} from './auto.js';
import {gameTime,PERIODS,waitUntil,activityWeight,scheduleLabel,ecology} from './ecology.js';
import {castTargets,castResult,fishPeriod,weightLabel} from './catch-rules.js';
import {castLanding} from './water-layout.js';
import {FISH,REGIONS} from './data.js';
import {VERSION,TITLE,SAVE_KEY,STARTER,region,capacity,isNight,baitPrice,gate,travel,finish,chooseFish,fishGrade,addCatch,sell,validateSave,baitCount,chargeBait,makeFight,fightStep,tapStrike,TAP_COMBO_MAX,skill,skillCooldown,SKILL_COOLDOWN,critical,spend,maxHP,buyBait,emergencyBait,buyBoat,selectBoat,sellBoat,sleep,upgradeHome,transferFish,learnSkill,equipSkill,legendReady,resetSkills,waitSeconds,fightPlan} from './engine.js';
import {BOATS,TACKLE,HOMES,SKILLS,BAITS,TROPHY_BAIT,MAX_LEVEL,playerLevel,xpForLevel,ACTIVE_SLOTS,SKILL_BY_ID,activeSkillFamily} from './progression.js';
import {panelContent,boatArt} from './panels.js';
import {sprite,fishStyle,waterStyle,waterVars} from './art.js';
import {skillIcon} from './skill-icons.js';
import {FOODS,foodInfo,buyFood,eatFood,activeMeal,foodPrice,foodDesc,activeRegen,applyRegen,repLabel,repFactor,repSaleMult,luck,aquariumLuck,haggleChances,baitFamilyOf,familyInfo,addRep,baitInfo} from './systems.js';
import {tankHTML,startTank} from './tank.js';
import {createReelFeedback} from './reel-feedback.js';
import {createReelInput} from './touch-reel.js';
import {NICKNAME_LIMIT,normalizeNickname} from './nickname.js';
const reelInput=createReelInput();
import {createCombatFX} from './effects.js';
import {TOURNAMENTS,TOURNAMENT_CASTS,tournamentEntryIssue,waitForTournament,startTournament,beginTournamentCast,contestCastResult,finishTournament,tournamentPanel,tournamentResults,createTournamentFloats} from './tournament.js';
const $=id=>document.getElementById(id), fmt=n=>Math.round(n).toLocaleString('ko-KR'), esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state=STARTER(),storageWarning=false,loadError=false,savedRaw=null,sessionEnded=false;
if(navigator.locks){
 const acquire=options=>new Promise(resolve=>{
  navigator.locks.request(SAVE_KEY,options,lock=>{
   if(!lock){resolve(false);return;}
   resolve(true);
   return new Promise(release=>window.addEventListener('pagehide',()=>{save();sessionEnded=true;release();},{once:true}));
  }).catch(()=>resolve(true));
 });
 if(!await acquire({ifAvailable:true})){
  $('modalTitle').textContent='다른 탭에서 낚시 중이에요';
  $('modalBody').textContent='기존 게임 탭을 닫으면 여기에서 이어서 플레이할 수 있어요.';
  $('closeModal').hidden=true;
  const preventClose=e=>e.preventDefault();
  $('modal').addEventListener('cancel',preventClose);
  $('modal').showModal();
  await acquire({});
  $('modal').removeEventListener('cancel',preventClose);
  $('modal').close();
  $('closeModal').hidden=false;
 }
 window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
}
try{({state,raw:savedRaw,loadError}=loadCurrentSave(localStorage));}catch{loadError=true;}
ensureEquipment(state);
let view='town';
let castAim=.5,castTarget={x:500,y:670},castFlight=1;
let targets=castTargets(),perfectCast=false;
function showCastTarget(key){const zone=document.querySelector('.perfect-zone');zone.style.left=(targets[key]-.09)*100+'%';zone.style.width='18%';$('castLabel').textContent=(key==='direction'?'① 방향':'② 힘')+' 목표 '+Math.round(targets[key]*100)+'%';}
let phase='idle',timer=0,cast=0,castDirection=0,castQuality=1,currentFish=null,currentGrade=2,fight=null,input=0,bossTrip=false,paused=false,panel='',last=performance.now(),hudClock=0,saveClock=0,toastTimer,context,reg=null,pendingCatch=null;
const modal=$('modal'),body=$('modalBody');
const findsUI=createFindsUI({buttons:[$('findsBtn'),$('findsFishingBtn')],body,getState:()=>state,show,save,render,toast,canOpen:()=>phase==='idle',settle:()=>{if(autoRunning(state))runAuto();}});
const racing=createRaceUI({getState:()=>state,body,modal,show,save,render,toast,enhancementFailed,spend,credit,canRace:()=>phase==='idle'&&!autoRunning(state)&&!state.tournament,sound,buzz});
const fx=createCombatFX({scene:$('scene'),layer:$('combatEffects'),target:$('wildFish'),getState:()=>state});let hitClock=0;
const tournamentFloats=createTournamentFloats($('scene'));
const reelFeedback=createReelFeedback({sound,vibrate:buzz,cancelVibration:()=>{if(navigator.vibrate)navigator.vibrate(0);}});let dangerState='safe';
function save(){
 if(sessionEnded)return false;
 if(fight)state.hp=Math.max(0,fight.hero);
 state.savedAt=Date.now();
 try{
  if(localStorage.getItem(SAVE_KEY)!==savedRaw){location.reload();return false;}
  const raw=JSON.stringify(state);
  localStorage.setItem(SAVE_KEY,raw);savedRaw=raw;return true;
 }catch{
  if(!storageWarning){storageWarning=true;toast('저장 공간이 부족해요. 설정에서 저장 파일을 내보내 주세요.',5000);}
  return false;
 }
}
function toast(text,ms=2600,{announceOnly=false}={}){
 clearTimeout(toastTimer);
 const t=$('toast'),host=modal.open?modal:document.body;
 if(t.parentElement!==host)host.append(t);
 t.classList.toggle('toast-announce-only',announceOnly);
 t.hidden=false;
 t.replaceChildren(document.createTextNode(text));
 toastTimer=setTimeout(()=>t.hidden=true,ms);
}
function enhancementFailed(){
 const detail='금화는 차감되고 강화 단계는 유지돼요.';
 celebrate('forge-fail',{icon:'⚒',title:'강화 실패',sub:detail});
 toast(`강화 실패 · ${detail}`,1450,{announceOnly:true});
}
function clearEnhancementFailure(){
 modal.querySelector('.k-forge-fail')?.remove();
 const result=$('toast');
 if(result.classList.contains('toast-announce-only'))result.hidden=true;
}
function sound(type='tap'){if(state.muted)return;try{
 if(['reel-wind','reel-release','line-danger'].includes(type)){
  context??=new (window.AudioContext||window.webkitAudioContext)();if(context.state==='suspended'){context.resume().catch(()=>{});return;}
  const configs=type==='reel-wind'?[[1250,230,.035,.021,0,'triangle']]:type==='reel-release'?[[420,160,.075,.024,0,'sawtooth']]:[[680,530,.1,.035,0,'sine'],[850,640,.13,.035,.17,'sine']];
  for(const [from,to,duration,volume,offset,wave] of configs){const o=context.createOscillator(),g=context.createGain(),t=context.currentTime+offset;o.type=wave;o.frequency.setValueAtTime(from,t);o.frequency.exponentialRampToValueAtTime(to,t+duration);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(volume,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(context.destination);o.onended=()=>{o.disconnect();g.disconnect();};o.start(t);o.stop(t+duration+.01);}return;
 }
context??=new (window.AudioContext||window.webkitAudioContext)();if(context.state==='suspended')context.resume();const notes=type==='critical'?[780,1120,1460]:type==='catch'?[660,880]:type==='electric'?[160,320,640]:[type==='hit'?210:type==='bite'?880:type==='fail'?160:440];notes.forEach((hz,i)=>{const o=context.createOscillator(),g=context.createGain(),t=context.currentTime+i*.035,d=type==='hit'?.09:.18;o.type=type==='hit'?'triangle':type==='electric'?'sawtooth':'sine';o.frequency.setValueAtTime(hz,t);o.frequency.exponentialRampToValueAtTime(type==='hit'?90:hz*.75,t+d);g.gain.setValueAtTime(type==='hit'?.035:.045,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(context.destination);o.start(t);o.stop(t+d+.01);});}catch{}}
function buzz(ms=25){if(state.haptics&&navigator.vibrate)navigator.vibrate(ms);}

function artPos(id){return `${(id%2)*100}% ${Math.floor(id/2)*25}%`;}
let scrollTarget=0;
modal.setAttribute('aria-labelledby','modalTitle');
$('modalTitle').tabIndex=-1;
function show(title,html,name=''){releaseInput();const same=modal.open&&name&&name===panel,top=body.scrollTop,opened=same?[...body.querySelectorAll('details')].map(d=>d.open):null;clearEnhancementFailure();panel=name;$('closeModal').hidden=(name==='nickname-first'||name==='v4-reset');$('modalTitle').autofocus=(name==='nickname-first'||name==='v4-reset');$('modalTitle').textContent=title;body.innerHTML=html;if(same){body.querySelectorAll('details').forEach((d,i)=>{if(opened[i]!==undefined)d.open=opened[i];});}if(!modal.open)modal.showModal();if((name==='nickname-first'||name==='v4-reset'))$('modalTitle').focus({preventScroll:true});else $('closeModal').focus({preventScroll:true});scrollTarget=same?top:0;body.scrollTop=scrollTarget;requestAnimationFrame(()=>body.scrollTop=scrollTarget);}
function openResetNotice(){
 show('4.0 업데이트로 새로 시작해요',`<p>새 낚시일지를 시작하면 이 브라우저에 보관된 기존 낚시 기록, 장비, 금화와 도감이 초기화돼요. 확인한 뒤 닉네임을 등록해 주세요.</p><div class="notice">기존 이용자 보상으로 경험치 2배권과 평판 2배권을 1개씩 받았어요. 설정의 업데이트 보상에서 원하는 때에 사용하면 각각 24시간 동안 효과가 적용돼요.</div><p>4.0 이전 저장 파일은 새 일지에서 가져올 수 없어요.</p><button class="primary" data-do="v4-reset-confirm">초기화하고 새 낚시일지 시작</button>`,'v4-reset');
}
function openBoosts(){
 const now=Date.now();
 const items=REWARD_BOOSTS.map(({id,name})=>{
  const {from,count}=state.rewardBoosts[id],expires=from+BOOST_DURATION;
  const status=count?'미사용 · 보유 1개':from&&expires>now?'사용 중 · 보유 0개 · '+new Date(expires).toLocaleString('ko-KR')+' 종료':from?'효과 종료 · 보유 0개':'보유 0개';
  return `<div class="setting-row"><div><b>${name}</b><span>${status}</span></div><button data-do="boost-use" data-id="${id}" ${count?'':'disabled'}>사용</button></div>`;
 }).join('');
 show('업데이트 보상',`<p>사용한 시점부터 각각 24시간 동안 수동·자동 낚시에서 얻는 경험치 또는 평판이 2배가 돼요. 평판 2배는 시장에서 얻는 평판에도 적용돼요.</p>${items}<button class="secondary" data-do="settings">설정으로 돌아가기</button>`,'boosts');
}
function leavePanel(){
 if(panel==='nickname-first'||panel==='v4-reset')return;
 if(panel==='nickname-edit'){openPanel('settings');return;}
 if(panel==='import'){
  pendingImport=null;
  if(!state.nickname){openNickname();return;}
 }
 close();
}
function close(){racing.reset();clearEnhancementFailure();modal.close();panel='';releaseInput();save();render();}
$('closeModal').onclick=leavePanel;
modal.addEventListener('cancel',e=>{e.preventDefault();leavePanel();});
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)leavePanel();}});

function openNickname(edit=false){
 show(edit?'닉네임 수정':'낚시 수첩에 이름을 적어 주세요',`
 <form class="nickname-form" novalidate>
  ${edit?'':`<div class="nickname-intro"><img src="assets/harbor-seal.svg" alt="" width="54" height="54"><p>물결항에서 불릴 이름이에요. 낚시대회와 보트 레이스 순위에도 표시돼요.</p></div>`}
  <label for="nicknameInput">닉네임</label>
  <input id="nicknameInput" type="text" placeholder="예: 물결낚시꾼" autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="done" aria-describedby="nicknameHint nicknameError">
  <p class="muted" id="nicknameHint">글자와 숫자로 시작하는 1~${NICKNAME_LIMIT}자. 공백, 밑줄, 하이픈도 쓸 수 있어요.</p>
  <p id="nicknameError" class="nickname-error" role="alert" hidden></p>
  <button class="primary" type="submit">${edit?'닉네임 저장':'수첩에 기록하기'}</button>
  ${edit?'<button class="secondary" type="button" data-do="settings">취소</button>':'<button class="secondary" type="button" data-do="import">4.0 저장 파일 가져오기</button>'}
 </form>`,edit?'nickname-edit':'nickname-first');
 const form=body.querySelector('.nickname-form'),input=$('nicknameInput'),error=$('nicknameError');
 let composing=false;
 input.value=state.nickname;
 input.addEventListener('compositionstart',()=>{composing=true;});
 input.addEventListener('compositionend',()=>{composing=false;});
 input.addEventListener('keydown',e=>{if(e.key==='Enter'&&(composing||e.isComposing||e.keyCode===229))e.preventDefault();});
 input.addEventListener('input',()=>{error.hidden=true;input.removeAttribute('aria-invalid');});
 form.addEventListener('submit',e=>{
  e.preventDefault();
  if(composing)return;
  const name=normalizeNickname(input.value);
  if(!name){
   error.textContent='닉네임을 확인해 주세요. 글자 또는 숫자로 시작하고, 최대 '+NICKNAME_LIMIT+'자까지 입력할 수 있어요.';
   error.hidden=false;input.setAttribute('aria-invalid','true');input.focus();return;
  }
  state.nickname=name;save();render();
  if(edit){openPanel('settings');toast('닉네임을 바꿨어요.');}
  else resumeNamedGame();
 });
}

function resumeNamedGame(){
 close();
 if(state.tournament&&restoreContestCast())return;
 if(state.tutorial)openPanel('help');
}
const repNumber=new Intl.NumberFormat('ko-KR',{maximumFractionDigits:3});
function repDelta(amount){
 const rounded=Math.round(amount*1000)/1000;
 return (rounded>0?'+':'')+repNumber.format(rounded||0);
}
function autoCatchLine(a){
 return `${fmt(a.caught)}마리 · ${a.kept?`보관 ${fmt(a.kept)} · `:''}판매 +${fmt(a.gold)} G`;
}
function waterNetClock(remaining){
 const seconds=Math.ceil(remaining/1000);
 return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
}
function autoModeLabel(){
 if(!waterNetRemaining(state))return '자동 판매 중';
 return waterNetCanStore(state)?'물빛 어망으로 보관 중':'수족관 가득 참 · 자동 판매 중';
}
function renderAuto(){
 const on=autoRunning(state),a=state.auto,btn=$('autoBtn'),ov=$('autoOverlay'),pill=$('autoPill'),remaining=waterNetRemaining(state);
 pill.hidden=!on;
 if(on)pill.innerHTML=`<i></i><b>🤖 자동 낚시 중</b><span>${REGIONS[a.region].display||REGIONS[a.region].name} · ${autoCatchLine(a)}</span>`;
 btn.textContent=on?`🤖 ${fmt(a.caught)}마리`:'🤖 자동';
 btn.classList.toggle('active',on);
 ov.hidden=!(on&&view==='fish');
 if(!on)return;
 const mode=remaining?`${waterNetCanStore(state)?'물빛 어망':'어망 대기 · 자동 판매'} ${waterNetClock(remaining)}`:`자동 판매 중 · 미끼 자동 구매 ${fmt(a.bought||0)}개`;
 const key=JSON.stringify([autoCatchLine(a),a.xp,state.waterNet.count,!!remaining]);
 if(ov.dataset.renderKey===key){ov.querySelector('small').textContent=mode;return;}
 ov.dataset.renderKey=key;
 ov.innerHTML=`<b>🤖 자동 낚시 중</b><span>${autoCatchLine(a)} · +${fmt(a.xp)} EXP</span><small>${mode}</small><div class="auto-overlay-actions">${remaining||state.waterNet.count?'<button type="button" data-do="auto">물빛 어망</button>':''}<button type="button" data-do="auto-stop">멈추기</button></div>`;
}
const landscapeHeader=window.matchMedia('(max-height: 520px) and (orientation: landscape)');
function placeWallet(){
 const wallet=$('wallet'),home=$('homeBtn'),header=home.parentElement;
 const inHeader=view==='fish'&&!landscapeHeader.matches;
 if(inHeader&&wallet.parentElement!==header)header.insertBefore(wallet,home);
 else if(!inHeader&&wallet.parentElement===header)header.after(wallet);
}
landscapeHeader.addEventListener('change',placeWallet);
function render(){renderAuto();findsUI.update();placeWallet();
 const lvl=playerLevel(state);$('headerLevel').textContent=`Lv.${lvl}`;$('headerXPLabel').textContent=lvl>=MAX_LEVEL?' · ':' · EXP ';$('headerXP').textContent=lvl>=MAX_LEVEL?'MAX':`${fmt(state.xp-xpForLevel(lvl))} / ${fmt(xpForLevel(lvl+1)-xpForLevel(lvl))}`;$('game').classList.toggle('town-view',view==='town');$('playerBadge').textContent=state.nickname||`${lvl>=95?'전설에 도전하는 낚시꾼':lvl>=70?'대양의 명인':lvl>=50?'신비의 바다 탐험가':lvl>=25?'바다의 숙련자':'성장하는 낚시꾼'}`;$('playerBadge').title=state.nickname;$('townHP').textContent=`체력 ${Math.ceil(state.hp)} / ${maxHP(state)}`;$('xpBar').style.width=`${lvl>=MAX_LEVEL?100:(state.xp-xpForLevel(lvl))/(xpForLevel(lvl+1)-xpForLevel(lvl))*100}%`;

 const r=region(state),night=isNight(state);if(state.meal&&!activeMeal(state)){state.meal=null;state.hp=Math.min(state.hp,maxHP(state));}{const m=activeMeal(state),mb=$('mealBtn');if(mb){const rg=activeRegen(state);mb.textContent=(m?`${m.icon} ${Math.ceil(m.left/60)}분`:rg?`${rg.food?.icon||'🍙'} 회복`:'🍙 식사')+(rg?` 💚${Math.ceil(rg.left)}초`:'');mb.classList.toggle('active',Boolean(m||rg));}}const balance=fmt(state.coins);$('coins').textContent=balance;$('wallet').dataset.balance=balance.length>19?'extra':balance.length>14?'large':'';$('bagCount').textContent=`${state.bag.length} / ${capacity(state)}`;$('bagBtn').setAttribute('aria-label',`선상 수족관 ${$('bagCount').textContent}칸`);$('debt').hidden=!state.debt;$('debt').textContent=`미끼 외상 ${fmt(state.debt)}`;$('location').textContent=r.display||r.name;$('chapter').textContent=`CHAPTER ${String(state.region+1).padStart(2,'0')} / ${REGIONS.length}`;$('scene').style.cssText=waterVars(state.region);$('scene').classList.toggle('night',night);$('clockBtn').textContent=`${night?'☾':'☀'} ${gameTime(state).label} ${gameTime(state).name}`;$('scene').dataset.period=PERIODS[gameTime(state).period].id;
 $('sellDot').hidden=!state.bag.length;$('baitText').textContent=`${baitInfo(state.bait).icon} ${baitInfo(state.bait).name}`;
 $('bossBtn').firstElementChild.textContent=r.bossId==null?'✦ 지역 의뢰':state.bosses.includes(r.bossId)?'✦ 보스 완료':'✦ 보스 도전';$('bossHint').textContent=r.bossId==null?`${state.counts[state.region]} / ${r.minimum_catches}마리`:FISH[r.bossId].name;
 $('questChip').textContent=state.ended?'전설의 여행 완료 · 이제 자유롭게 낚시해요':`Lv.${lvl} · 장비 ${state.tackle+1}등급 +${state.tackleUpgrade} · ${state.counts[state.region]}/${r.minimum_catches}마리`;
 $('pauseOverlay').hidden=!paused;syncReel();renderActiveSkills();
}
function setAction(title,sub=''){const b=$('actionBtn');b.firstElementChild.textContent=title;b.lastElementChild.textContent=sub;}
function hint(text,danger=false){$('instruction').textContent=text;$('instruction').classList.toggle('danger',danger);}
function resetIdle(message='다음 물결에는 어떤 친구가 기다릴까요?'){
 $('fightTimer').hidden=true;fx.clear();tournamentFloats.clear();hitClock=0;phase='idle';$('game').classList.remove('casting-mode');$('bobber').style.cssText='';fight=null;currentFish=null;bossTrip=false;releaseInput();$('castGauge').hidden=true;$('fightLabel').hidden=true;$('wildFish').classList.remove('visible');$('bobber').hidden=false;$('sceneMessage').textContent=message;$('sceneMessage').hidden=false;$('fishValue').textContent='—';$('fishBar').style.width='0%';$('heroValue').textContent=Math.ceil(state.hp);$('heroBar').style.width=`${state.hp/maxHP(state)*100}%`;$('tensionValue').textContent='0%';$('tensionBar').style.width='0%';$('skillFill').style.height='0%';$('skillBtn').disabled=false;$('leftBtn').disabled=true;$('rightBtn').disabled=true;if(state.tournament){setAction('대회 낚시 시작',`남은 기회 ${TOURNAMENT_CASTS-state.tournament.casts.length}회`);hint('수면을 터치해 대회 낚시를 시작하세요');}else{setAction('낚시 시작','방향 · 힘 · 챔질');hint('수면을 터치해 낚시를 시작하세요');}render();
}
function start(boss=false){
 if(state.tournament){
  if(boss){toast('대회가 끝나면 보스에 도전할 수 있어요.');return;}
  if(phase==='idle'&&restoreContestCast())return;
  if(state.tackle<state.tournament.id){openPanel('equipment');toast('대회 참가 등급의 장비를 장착해 주세요.');return;}
 }
 if(!fullyEquipped(state)){openPanel('equipment');toast('낚싯대·릴·찌·줄·바늘을 모두 장착해 주세요.');return;}
 if(phase!=='idle')return;if(state.hp<(boss?6:3)){openPanel('home');toast('집에서 잠을 자고 체력을 회복해 주세요.');return;}if(state.region>BOATS[state.boat].region){openPanel('map');toast('현재 배로 갈 수 있는 낚시터를 선택해 주세요.');return;}if(!boss&&!(baitCount(state)>0)){openPanel(state.bait===TROPHY_BAIT.id?'bait':'shop');toast('미끼가 떨어졌어요. 상점에서 준비해 주세요.');return;}view='fish';render();if(state.bag.length>=capacity(state)){toast('보관함이 가득 찼어요. 먼저 물고기를 판매해 주세요.');openPanel('market');return;}
 if(boss){const r=region(state);if(r.bossId==null||state.bosses.includes(r.bossId)||(state.tackle<state.region||state.tackle===state.region&&state.tackleUpgrade<2)||state.counts[state.region]<r.minimum_catches){openPanel('goals');return;}const f=FISH[r.bossId];if(f.legendary&&!legendReady(state)){openPanel('goals');toast('천해룡의 단서와 최종 장비를 먼저 준비하세요.');return;}if(activityWeight(f,state)<=0){toast(`${f.name} 추천: ${scheduleLabel(f)}. 시간 버튼에서 기다려 주세요.`,4500);return;}}
 targets=castTargets();perfectCast=false;bossTrip=boss;phase='direction';cast=0;timer=0;$('castGauge').hidden=false;showCastTarget('direction');setAction('방향 선택','초록 구간에서!');hint('바늘을 초록 구간에 맞춰 보세요');$('sceneMessage').hidden=true;sound();
}
function action(){
 if(modal.open||paused||view!=='fish')return;if(autoRunning(state)){openAuto();return;}sound();
 if(phase==='idle'){start();return;}
 if(phase==='direction'){castAim=cast;castDirection=cast;phase='power';timer=0;showCastTarget('power');setAction('찌 던지기','초록 구간에서!');return;}
 if(phase==='power'){
  castTarget=castLanding(castAim,cast);castFlight=0;
  const accuracy=castResult(targets,castDirection,cast);castQuality=accuracy.quality;perfectCast=accuracy.perfect;$('castGauge').hidden=true;
  currentFish=chooseFish(state,Math.random,bossTrip);if(!currentFish){const message=bossTrip?'지금은 보스에 도전할 수 없어요.':'지금은 입질할 물고기가 없어요. 시간대를 바꿔 보세요.';resetIdle();toast(message);return;}
  let chain=false;if(state.bait==='chain'&&!bossTrip){const chains={9:1,30:14,31:14,41:24,42:24,47:29,48:29,54:37,58:53};const wanted=chains[currentFish.id];const found=state.bag.findIndex(f=>f.id===wanted);if(found>=0){state.bag.splice(found,1);chain=true;toast(`${FISH[wanted].name}를 미끼로 사용했어요.`);}else toast('맞는 먹잇감이 없어 기본 미끼를 사용했어요.');}
  currentGrade=perfectCast||currentFish.boss?0:fishGrade(currentFish,Math.random,chain,state);if(!bossTrip&&!chargeBait(state)){resetIdle();openPanel('shop');return;}state.hp=Math.max(0,state.hp-(bossTrip?5:2));state.attempts++;if(beginTournamentCast(state))tournamentFloats.cast(state.tournament.bots.length,castTarget);save();phase='waiting';timer=waitSeconds(state,state.caught===0?3.5:6+Math.random()*5);$('bobber').hidden=false;setAction('입질 기다림','찌를 지켜보세요');hint('찌가 쑥 내려가면 챔질!');$('sceneMessage').hidden=false;$('sceneMessage').textContent=perfectCast?'방향·힘 명중! 대물이 미끼를 향해 옵니다.':'살랑살랑… 물고기가 다가오고 있어요.';render();return;
 }
 if(phase==='waiting'){toast('아직이에요! 찌가 내려갈 때를 기다려요.');return;}
 if(phase==='bite'){phase='fight';fight=makeFight(state,currentFish,currentGrade,castQuality);fight.screenX=castTarget.x/10;$('fishSprite').style.cssText=fishStyle(currentFish.id);$('wildFish').classList.add('visible');$('wildFish').classList.toggle('boss-fish',currentFish.boss);$('fightLabel').hidden=false;$('fishName').textContent=(currentFish.legendary?'LEGEND · ':currentFish.boss?'BOSS · ':'')+currentFish.name;if(currentFish.legendary){fx.impact('critical','천해룡 아스트라 · 깨어남',true);toast('환상의 물고기가 모습을 드러냈어요. 세 번의 물결을 이겨내세요!',5000);};$('bobber').hidden=true;$('sceneMessage').hidden=true;$('leftBtn').disabled=false;$('rightBtn').disabled=false;setAction('손 떼고 쉬기','긴장을 낮춰요');sound('bite');buzz(35);return;}
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
ACTIVE_SLOTS.forEach(i=>$('active'+i).onclick=()=>useActive(i));
document.addEventListener('keydown',e=>{if(view==='town'||modal.open||e.repeat)return;if(e.code==='Space'){e.preventDefault();action();}if(phase==='fight'&&!paused){if(e.key==='ArrowLeft'){e.preventDefault();reelInput.key(-1);input=reelInput.input;}if(e.key==='ArrowRight'){e.preventDefault();reelInput.key(1);input=reelInput.input;}if(ACTIVE_SLOTS.includes(Number(e.key)-1))useActive(Number(e.key)-1);if(e.key.toLowerCase()==='s')useActive(0);}});document.addEventListener('keyup',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){reelInput.key(0);input=reelInput.input;}});
function completeContestCast(size=0){
 if(!contestCastResult(state,size))return false;
 return showContestResult();
}
function restoreContestCast(){
 if(state.tournament?.pending){contestCastResult(state);save();}
 return showContestResult();
}
function showContestResult(){
 const result=finishTournament(state,credit);
 if(!result)return false;
 resetIdle('지역 낚시대회를 마쳤어요.');save();
 show('낚시대회 최종 결과',tournamentResults(result),'tournament-result');
 if(result.payout){
  celebrate('tournament',{icon:result.place===1?'🏆':'🏅',title:result.place===1?'낚시대회 우승!':`낚시대회 ${result.place}위!`,sub:`상금 ${fmt(result.payout)} G${result.bait?` · 월척미끼 ${result.bait}개`:''}`});
  sound('catch');buzz([25,35,60]);
 }
 return true;
}
function fail(message){const keptTrophyBait=!bossTrip&&state.bait===TROPHY_BAIT.id;if(fight)state.hp=Math.max(0,fight.hero);state.fame=Math.max(0,state.fame-1);addRep(state,-.5);state.stats.failures++;if(completeContestCast())return;save();sound('fail');resetIdle(message);show('아쉽게 놓쳤어요',`<p>${message}</p><div class="notice">물고기가 가는 방향의 <b>반대쪽 수면</b>을 터치해서 줄을 감으세요. 줄이 빨개지면 <b>수면에서 손을 떼고</b> 줄을 풀어 주세요.</div><p class="muted">${keptTrophyBait?'월척확정 미끼는 그대로 남아 다시 사용할 수 있어요.':'미끼를 한 개 사용했어요.'}</p><button class="primary" data-do="retry">다시 낚시하기</button>`,'result');}
function caught(){state.hp=Math.max(0,fight.hero);const oldLevel=playerLevel(state),firstBoss=fight.fish.boss&&!state.bosses.includes(fight.fish.id);const item=addCatch(state,fight.fish,fight.grade,perfectCast?1.1:.92+Math.random()*.16,{trophyBait:!bossTrip&&state.bait===TROPHY_BAIT.id});if(!item){if(completeContestCast())return;resetIdle();save();toast('보관함을 확인해 주세요.');return;}fight.hero=state.hp;if(completeContestCast(item.size)){const found=item.find?`발견물 · ${item.find.name}`:'발견물 가방이 가득 찼어요.';toast(item.waterNetDrop?`${found} · 물빛 어망 +1`:found,4000);return;}pendingCatch=item;save();if(playerLevel(state)>oldLevel)toast(`레벨 업! Lv.${playerLevel(state)} · 스킬 포인트를 확인하세요.`,4000);sound('catch');buzz([30,50,30]);resetIdle('멋진 한 마리! 여행 수첩에 기록했어요.');const f=FISH[item.id];show('월척! 잘 잡았어요',`<div class="catch-heading"><small>${f.boss?'전설의 보스 포획':f.ornamental?'반짝이는 관상어':'오늘의 작은 발견'}</small><div class="catch-art">${sprite(f.id)}</div><h3>${f.name}</h3><p>${['대형','중형','소형'][item.grade]} · ${item.size}cm · ${weightLabel(item)} · ${REGIONS[item.region].name}</p></div><div class="stat-pills"><span>판매가 <b>${fmt(item.value)} G</b></span><span>도감 <b>${Object.keys(state.collection).length}/${FISH.length}</b></span><span><b>+${item.xp} EXP</b></span></div>${item.repGain>0?`<p class="notice">평판 <b>${repDelta(item.repGain)}</b></p>`:''}${item.waterNetDrop?`<div class="water-net-card water-net-reward"><img src="assets/moon-net.webp" alt=""><div><strong>물빛 어망 +1</strong><p>자동 낚시 메뉴에서 사용할 수 있어요.</p></div></div>`:''}${findResult(item.find?{[item.find.id]:1}:null,item.find?0:1,findsUI.full())}${item.raceMaterial?`<p class="notice">개조 재료 · ${item.raceMaterial.name} +${item.raceMaterial.count}</p>`:''}<button class="primary" data-do="sell-catch">바로 판매 · ${fmt(Math.max(0,item.value-(item.boss?0:REGIONS[item.region].expense_on_sale)))} G</button><button class="secondary" data-do="retry">보관하고 계속 낚시</button>${f.legendary?'<button class="primary" data-do="finish">전설의 여행 엔딩 보기</button>':''}${firstBoss?'<p class="notice">보스 단서를 여행 수첩에 기록했어요. 마지막 전설어를 잡았다면 엔딩과 집 기념관을 확인하세요.</p>':''}`,'result');}
function rodTip(){const scene=$('scene').getBoundingClientRect(),hero=document.querySelector('#scene>.hero').getBoundingClientRect();return {x:(hero.left-scene.left+hero.width*.52)/scene.width*1000,y:(hero.top-scene.top+hero.height*.035)/scene.height*1000};}
function drawLine(x,y,sag=0){const tip=rodTip();$('fishingLine').setAttribute('d',`M${tip.x} ${tip.y} Q${(tip.x+x)/2} ${(tip.y+y)/2+sag} ${x} ${y}`);}
function castVisual(dt){const active=['waiting','bite'].includes(phase);$('game').classList.toggle('casting-mode',active);if(!active)return;castFlight=Math.min(1,castFlight+dt/.65);const t=1-(1-castFlight)**2,tip=rodTip(),x=tip.x+(castTarget.x-tip.x)*t,y=tip.y+(castTarget.y-tip.y)*t-Math.sin(t*Math.PI)*90;$('bobber').style.left=x/10+'%';$('bobber').style.top=y/10+'%';drawLine(x,y,castFlight<1?-30:25);}
function tick(now){const dt=Math.min(.08,(now-last)/1000);last=now;
 if(!paused&&!modal.open&&!document.hidden){
  if(state.regen)applyRegen(state,dt,maxHP,phase==='fight'?fight:null);state.seconds+=dt;saveClock+=dt;hudClock+=dt;
  if(phase==='direction'||phase==='power'){timer+=dt;cast=(Math.sin(timer*(phase==='direction'?2.3:3.1))+1)/2;$('castNeedle').style.left=`${cast*98}%`;}
  if(phase==='waiting'){timer-=dt;if(timer<=0){phase='bite';timer=(state.caught<3?5:2.4)+(state.skills.focus||0)*.2+equipmentStats(state).biteBonus;setAction('지금 챔질!','지금 눌러요!');hint('입질! 수면을 터치해 챔질하세요',true);$('sceneMessage').textContent='왔다! 지금 챔질해요!';sound('bite');buzz([30,30,30]);}}
  else if(phase==='bite'){timer-=dt;$('bobber').style.transform=`translate(-50%,calc(-78% + ${Math.sin(now/70)*9}px))`;if(timer<=0)fail('챔질 타이밍이 늦었어요. 다음 입질을 노려요!');}
  castVisual(dt);syncReel();if(phase==='fight'&&fight){input=reelInput.input;const oldPhase=fight.phase;fightStep(fight,dt,input);setDanger(reelFeedback.update({active:!fight.done,winding:fight.effectiveInput!==0,releasing:fight.effectiveInput===0&&fight.tension>0,tension:fight.tension,now,muted:state.muted,haptics:state.haptics}));if(fight.legendary&&fight.phase!==oldPhase){fx.impact('critical',['','깨어남','별빛 폭풍','마지막 해류'][fight.phase],true);toast(`천해룡 ${fight.phase}/3단계 · ${fight.phase===2?'별빛 폭풍':'마지막 해류'}`,4000);}if(fight.legendary)$('fishName').textContent=`LEGEND ${fight.phase}/3 · 천해룡 아스트라`;fx.update(fight,now/1000);const lineX=parseFloat($('wildFish').style.left)*10,lineY=parseFloat($('wildFish').style.top)*10,lineSag=fight.effectiveInput===0?170:Math.max(10,90-fight.tension);drawLine(lineX,lineY,lineSag);hitClock+=dt;if(fight.effectiveInput===-fight.direction&&hitClock>.38){hitClock=0;fx.impact('hit','탁!');sound('hit');}$('heroValue').textContent=Math.ceil(fight.hero);$('heroBar').style.width=`${fight.hero/fight.heroMax*100}%`;$('fishValue').textContent=Math.ceil(fight.hp);$('fishBar').style.width=`${fight.hp}%`;$('tensionBar').style.width=`${fight.tension}%`;$('tensionValue').textContent=`${Math.round(fight.tension)}%`;$('fishDirection').textContent=fight.direction===1?'→':'←';$('fishSprite').style.transform=(fight.direction===-1)?'scaleX(-1)':'none';$('skillFill').style.height=`${fight.skill*100}%`;$('skillBtn').disabled=false;renderActiveSkills();
   $('fightTimer').hidden=false;$('fightTimer').textContent=`남은 ${Math.max(0,Math.ceil(fight.timeLimit-fight.elapsed))}초 · 예상 ${Math.ceil(fight.expectedSeconds)}초${fight.expectedSeconds>fight.timeLimit?' · 장비 강화 권장':''}`;$('fightTimer').classList.toggle('urgent',fight.timeLimit-fight.elapsed<10);
   const crit=fight.elapsed%7>=4.8&&fight.elapsed%7<=6.4;setAction(crit?'지금 강하게!':'손 떼고 쉬기',crit?'타이밍 챔질 ✦':'긴장을 낮춰요');
   hint(fight.tension>78?'줄이 위험해요! 손을 떼고 줄을 풀어 주세요':fight.burst>0?'보스 돌진! 손을 떼서 줄을 풀어요':fight.direction===1?'물고기 → · 왼쪽 수면을 터치해 감기':'물고기 ← · 오른쪽 수면을 터치해 감기',fight.tension>78);
   if(fight.done==='caught')caught();else if(fight.done==='lost')fail(fight.failure==='timeout-line'?'제한 시간 초과! 버티던 낚싯줄이 끊어졌어요. 장비를 강화해 보세요.':fight.failure==='timeout-bait'?'제한 시간 초과! 미끼를 먹고 달아났어요. 장비와 공격 스킬을 확인하세요.':fight.hero<=0?'힘이 다했어요. 반대 방향을 보고 당겨 보세요.':'줄이 팽팽해져 끊어졌어요. 쉬어 가며 당겨요!');
  }
  if(hudClock>1){hudClock=0;render();}if(saveClock>3){saveClock=0;save();}
 }
 requestAnimationFrame(tick);
}
function openPanel(name){
 if(name==='race'||name==='race-shop'){racing.open(name);return;}
 if(autoRunning(state)&&(name==='market'||name==='storage'))runAuto();
 if(name==='town'){goTown();return;}if(name==='tank'){openTank();return;}if(name==='tournament'){show('지역 낚시대회 일정',tournamentPanel(state),name);return;}const content=panelContent(name,state);if(content){show(content.title,content.html,name);render();return;}

 if(name==='time'){const now=gameTime(state);show('낚시 시간표',`<p>현재 ${now.label} · ${now.name}</p><p>게임 하루 = 플레이 10분. 기다리기는 체력을 회복하지 않아요.</p>${PERIODS.map(p=>`<button class="secondary" data-do="wait-hour" data-id="${p.start}">${p.name} ${p.start}:00까지 기다리기</button>`).join('')}<p>현재 노려볼 어종</p>${FISH.filter(f=>f.regions.includes(state.region)&&!f.boss&&activityWeight(f,state)>=.8).map(f=>`<button data-do="fish-detail" data-id="${f.id}">${f.name}</button>`).join('')}<p class="muted">활동 성향을 반영한 게임 확률입니다. 실제 조황은 수온·계절·수심에도 달라집니다.</p>`,'time');}
 else if(name==='market'){for(const id of [...saleSel])if(!state.bag.some(x=>x.uid===id))saleSel.delete(id);const gross=state.bag.reduce((a,f)=>a+f.value,0),rf=repFactor(state),hc=haggleChances(state);
  show('물고기 시장',`<div class="notice"><b>${state.bag.length}마리 · 기준가 ${fmt(gross)} G</b>${state.debt?` · 미끼 외상 ${fmt(state.debt)} G`:''}<br>평판 <b>${Math.round(state.rep||0)}</b> · ${repLabel(state)} · 판매가 ${rf>=0?'+':''}${(rf*10).toFixed(1)}% · 장비·음식·미끼 ${rf>=0?'−':'+'}${Math.abs(rf*10).toFixed(1)}%<br>행운 <b>${luck(state)}</b> · 흥정 대성공 ${(hc.great*100).toFixed(1)}% · 성공 ${(hc.success*100).toFixed(1)}%</div><button class="secondary" type="button" data-do="finds-shop">발견물 상점</button>${state.bag.length?`<div class="row sel-tools"><button class="secondary" data-do="sel-all">전체 선택</button><button class="secondary" data-do="sel-cheap">싼 물고기 선택</button><button class="secondary" data-do="sel-none">선택 해제</button></div><p class="sel-summary" id="selSummary"></p><div class="row sale-actions"><button class="primary" data-do="sell-sel" data-id="normal">일반 판매<br><small>100%</small></button><button class="secondary" data-do="sell-sel" data-id="discount">평판 판매<br><small>80% · 어종별 1회 평판</small></button><button class="secondary" data-do="haggle-confirm">흥정<br><small>×3 / ×2 / 실패 반값</small></button></div><div class="sale-list">${state.bag.map(x=>`<button class="list-item sale-item ${saleSel.has(x.uid)?'selected':''}" data-do="sel-toggle" data-id="${x.uid}">${sprite(x.id)}<div class="desc"><strong>${FISH[x.id].name}</strong><small>${['대형','중형','소형'][x.grade]} · ${x.size}cm · ${weightLabel(x)}</small></div><b class="sale-price">${fmt(x.value)} G</b><i class="sale-check" aria-hidden="true"></i></button>`).join('')}</div>`:'<p>아직 보관한 물고기가 없어요. 낚시터에서 한 마리 잡아볼까요?</p>'}<p class="muted">물고기를 골라서 원하는 방법으로 팔아요. 판매가 = 무게(kg) × kg 단가, 판매마다 유지비가 빠져요. 평판 판매는 어종마다 처음 판 중형·대형 물고기 한 마리에 기본 평판 +0.5를 줘요. 보스는 제외돼요.</p>`,'market');updateSaleSummary();}
 else if(name==='collection')show('물고기 여행 도감',`<p><b>${Object.keys(state.collection).length} / ${FISH.length}종</b>을 만났어요. 물고기를 누르면 미끼와 시간대를 볼 수 있어요.</p><div class="fish-grid">${FISH.map(f=>`<button class="fish-card ${state.collection[f.id]?'':'unknown'}" data-do="fish-detail" data-id="${f.id}">${sprite(f.id)}<b>${f.name}</b><small>${state.collection[f.id]?`${state.collection[f.id]}마리 · ${state.records[f.id]}cm`:f.boss?'보스 어종':f.ornamental?'관상어':'아직 만나지 못함'}</small></button>`).join('')}</div>`,'collection');
 else if(name==='boosts')openBoosts();
 else if(name==='settings')show('게임 설정',`<div class="setting-row nickname-setting"><div><b>닉네임</b><span>${esc(state.nickname)}</span></div><button data-do="nickname-edit">수정</button></div><div class="setting-row"><b>효과음</b><button data-do="sound">${state.muted?'꺼짐':'켜짐'}</button></div><div class="setting-row"><b>진동</b><button data-do="haptics">${state.haptics?'켜짐':'꺼짐'}</button></div><p class="muted">진동은 지원하는 휴대폰에서만 작동해요.</p><button class="secondary" data-do="boosts">업데이트 보상</button><button class="primary" data-do="update">최신 버전 업데이트</button><button class="secondary" data-do="help">게임 방법 · 홈 화면에 추가</button><div class="row"><button class="secondary" data-do="export">저장 내보내기</button><button class="secondary" data-do="import">저장 가져오기</button></div><p class="muted">자동 저장은 지금 사용하는 기기·브라우저에 저장돼요. 다른 휴대폰으로 옮길 때 저장 파일을 가져오세요. 앱을 닫으면 진행 중인 낚시는 끝나지만, 잡은 물고기와 금화는 유지됩니다.</p><button class="danger-button" data-do="reset-confirm">처음부터 다시 시작</button><p class="version">${TITLE} v${VERSION}<br>여행 시간 ${Math.floor(state.seconds/3600)}시간 ${Math.floor(state.seconds/60)%60}분 · ${state.caught}마리 포획<br>그림: 새로 제작한 AI 일러스트 · 폰트: LINE Seed KR<br><b>© 2026 체니. All rights reserved.</b><br>새 게임 코드·창작 콘텐츠 저작권자: 체니<br><a href="LICENSE.txt" target="_blank" rel="noopener">저작권 및 이용 안내</a></p>`,'settings');
 render();
}
document.querySelectorAll('[data-panel]').forEach(b=>b.onclick=()=>openPanel(b.dataset.panel));$('settingsBtn').onclick=()=>openPanel('settings');$('bagBtn').onclick=()=>openPanel('storage');$('baitBtn').onclick=()=>{if(phase==='idle')openPanel('bait');else toast('낚시를 마친 뒤 미끼를 바꿀 수 있어요.');};$('bossBtn').onclick=()=>openPanel('goals');$('mealBtn').onclick=()=>{if(phase==='fight'){toast('물고기와 싸우는 중에는 먹을 수 없어요.');return;}openPanel('food');};$('clockBtn').onclick=()=>{if(phase!=='idle'){toast('낚시를 마치고 집에서 쉬어 주세요.');return;}openPanel('time');};
function showHaggleResult(xs){const base=xs.reduce((a,f)=>a+f.value,0),r=performSale(xs.map(x=>x.uid),'bold',true);if(!r.count){openPanel('market');return;}
 const o=r.outcome,info={great:['대성공!','×3','💰','haggle-great','상인이 감탄했어요! 세 배 값을 받았어요.'],success:['성공!','×2','🤝','haggle-success','좋은 값에 넘겼어요.'],fail:['실패…','×½','😓','haggle-fail','상인이 고개를 저었어요. 물고기는 반값에 넘겼어요.']}[o];
 const dRep=r.repChange;
 show('흥정 결과',`<div class="haggle-result"><span class="haggle-badge ${o}">${info[2]} 흥정 ${info[0]} ${info[1]}</span><p>${info[4]}</p><div class="haggle-rows"><span>물고기</span><b>${r.count}마리</b><span>기준가</span><b>${fmt(base)} G</b><span>흥정 배율</span><b>${info[1]}</b>${r.fee?`<span>유지비</span><b>−${fmt(r.fee)} G</b>`:''}<span>평판</span><b>${repDelta(dRep)} → ${repNumber.format(state.rep||0)}</b><span class="total">받은 금화</span><b class="total">${fmt(r.net)} G</b></div></div><button class="primary" data-do="market">시장으로 돌아가기</button>`,'haggle-result');
 celebrate(info[3],{icon:info[2],title:`흥정 ${info[0]}`,sub:`${info[1]} · ${fmt(r.net)} G`});
 sound(o==='fail'?'fail':o==='great'?'critical':'catch');if(o==='great')setTimeout(()=>sound('critical'),260);buzz(o==='great'?[30,40,30,40,60]:o==='success'?[25,30,25]:60);}
function performSale(ids,method='normal',quiet=false){if(autoRunning(state))runAuto();const r=sell(state,ids,method);for(const id of ids)saleSel.delete(id);save();render();if(!r.count)return r;
 const msg=r.outcome==='great'?`흥정 대성공! 3배 · ${fmt(r.net)} G`:r.outcome==='success'?`흥정 성공! 2배 · ${fmt(r.net)} G`:r.outcome==='fail'?`흥정 실패… 반값에 넘겼어요 · ${fmt(r.net)} G`:method==='discount'?`${r.count}마리 평판 판매 · ${fmt(r.net)} G · 평판 ${repDelta(r.repChange||0)}`:`${r.count}마리 판매! 유지비 제외 ${fmt(r.net)} G`;
 if(quiet)return r;sound(r.outcome==='fail'?'fail':'catch');toast(msg,3500);return r;}
let saleSel=new Set();
body.addEventListener('click',async e=>{const b=e.target.closest('[data-do]');if(!b||b.disabled)return;const cmd=b.dataset.do,id=b.dataset.id;
 if((cmd==='tournament'||cmd.startsWith('contest-'))&&handleContest(cmd,id))return;
 if((cmd==='race'||cmd.startsWith('race-'))&&racing.handle(cmd,id))return;
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
 if(cmd==='bait-select'){if(phase!=='idle'){toast('낚시를 마친 뒤 미끼를 바꿀 수 있어요.');return;}const bait=baitInfo(id);if(bait.id!==id||playerLevel(state)<bait.level||!(baitCount(state,id)>0)){toast('레벨과 미끼 보유 수량을 확인해 주세요.');return;}state.bait=id;save();openPanel('bait');return;}
 if(cmd==='wait-hour'){if(phase!=='idle')return;const hour=Number(id);if(!PERIODS.some(p=>p.start===hour))return;waitUntil(state,hour);save();render();openPanel('time');return;}
 if(cmd==='fish-detail'){const f=FISH[Number(id)];show(f.name,`<div class="catch-art">${sprite(f.id)}</div><p><b>낚시터</b> · ${f.regions.map(i=>REGIONS[i].display||REGIONS[i].name).join(', ')}</p><p><b>시간대</b> · ${scheduleLabel(f)}<br><small>${ecology(f).kind} · ${ecology(f).note}</small>${ecology(f).url?`<br><a href="${ecology(f).url}" target="_blank" rel="noopener">생태 자료 보기</a>`:''}</p><p><b>미끼</b> · ${f.boss?'지역 장비 +2와 포획 목표 달성 후 도전 · 천해룡은 최종 장비 +5와 모든 단서 필요':f.ornamental?'황금 등급 미끼':`${familyInfo(baitFamilyOf(f)).icon} ${familyInfo(baitFamilyOf(f)).name}`}</p><p>${esc(f.note.replace(/[^。.!]*[낮밤]에 출몰[^。.!]*[。.]?/g,''))}</p><p>중형 기준 예상 ${Math.ceil(fightPlan({...state,region:f.regions[0]},f).expected)}초 / 제한 ${fightPlan({...state,region:f.regions[0]},f).limit}초<br><small>반대 방향 조작과 줄 풀기 포함 추정 · 스킬 사용과 실제 조작에 따라 달라집니다.</small></p><div class="notice">${state.collection[f.id]?`포획 ${state.collection[f.id]}마리 · 최고 기록 ${state.records[f.id]}cm`:'아직 만나지 못한 물고기예요.'}</div><button class="secondary" data-do="collection">도감으로 돌아가기</button>`,'fish-detail');return;}
 if(cmd==='nickname-edit'){openNickname(true);return;}
 if(cmd==='import-cancel'){pendingImport=null;if(state.nickname)openPanel('settings');else openNickname();return;}
 if(cmd==='v4-reset-confirm'){
  state.resetNotice=false;
  if(!save()){state.resetNotice=true;return;}
  discardLegacySaves(localStorage);
  if(state.nickname)close();else openNickname();
  return;
 }
 if(cmd==='boosts'){openBoosts();return;}
 if(cmd==='boost-use'){
  const previous=state.rewardBoosts[id];
  if(useRewardBoost(state,id)){
   if(save()){openBoosts();toast('24시간 효과가 시작됐어요.');}
   else state.rewardBoosts[id]=previous;
  }
  return;
 }
 if(cmd==='sound'){state.muted=!state.muted;save();openPanel('settings');return;}
 if(cmd==='haptics'){state.haptics=!state.haptics;save();openPanel('settings');return;}
 if(cmd==='export'){save();const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`${TITLE.replaceAll(' ','')}-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);toast('저장 파일을 내보냈어요. 다른 기기에서 가져올 수 있어요.');return;}
 if(cmd==='import'){if(phase!=='idle'){toast('낚시를 마친 뒤 저장을 가져와 주세요.');return;}$('importFile').click();return;}
 if(cmd==='reset-confirm'){show('정말 처음부터 시작할까요?',`<p>이 브라우저에 저장된 금화, 장비, 도감과 여행 진행이 초기화됩니다. 보관할 기록이 있다면 설정에서 저장 파일을 먼저 내보내세요.</p><button class="danger-button" data-do="reset">모든 진행 초기화</button><button class="secondary" data-do="settings">취소하고 돌아가기</button>`,'reset');return;}
 if(cmd==='reset'){state=keepRewardHistory(state,STARTER());save();view='town';close();resetIdle();openNickname();return;}
 if(cmd==='update'){b.disabled=true;b.textContent='최신 버전 확인 중…';try{await reg?.update();if(reg?.installing){b.textContent='새 게임 파일을 받는 중…';await new Promise((resolve,reject)=>{const worker=reg.installing;const timeout=setTimeout(()=>reject(Error('update timeout')),90000);const check=()=>{if(worker.state==='activated'){clearTimeout(timeout);resolve();}else if(worker.state==='redundant'){clearTimeout(timeout);reject(Error('update failed'));}};worker.addEventListener('statechange',check);check();});}const res=await fetch(`version.json?t=${Date.now()}`,{cache:'no-store'});if(!res.ok)throw Error();const v=await res.json();if(v.version===VERSION){toast(`최신 버전 ${VERSION}을 사용 중이에요.`);openPanel('settings');}else{save();reg?.waiting?.postMessage({type:'SKIP_WAITING'});show('업데이트가 준비됐어요',`<p>저장한 진행은 유지돼요. 다시 열면 최신 버전 ${esc(v.version)}이 적용됩니다.</p><button class="primary" data-do="reload">저장하고 새로 열기</button>`,'update');}}catch{toast('인터넷 연결을 확인하고 다시 시도해 주세요.');openPanel('settings');}return;}
 if(cmd==='reload'){save();location.reload();}
});
let pendingImport=null;$('importFile').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>5000000)throw Error('저장 파일이 너무 커요.');pendingImport=validateSave(JSON.parse(await file.text()));show('저장 파일을 가져올까요?',`<p>현재 진행을 파일 속 기록으로 바꿉니다.</p><div class="notice">${pendingImport.nickname?esc(pendingImport.nickname)+' · ':''}${REGIONS[pendingImport.region].name} · ${pendingImport.caught}마리 · ${fmt(pendingImport.coins)} G</div><button class="primary" id="confirmImport">이 기록으로 이어하기</button><button class="secondary" data-do="import-cancel">취소</button>`,'import');$('confirmImport').onclick=()=>{state=keepRewardHistory(state,pendingImport);pendingImport=null;save();close();resetIdle('가져온 여행을 이어갈 준비가 됐어요.');toast('저장 파일을 가져왔어요.');if(!state.nickname)openNickname();};}catch(err){toast(err.message||'올바른 저장 파일이 아니에요.',4000);}e.target.value='';};
document.addEventListener('visibilitychange',()=>{if(document.hidden)save();try{releaseInput();}catch{}if(document.hidden)paused=true;render();});for(const ev of ['pagehide','freeze','beforeunload'])window.addEventListener(ev,()=>save());window.addEventListener('blur',()=>{releaseInput();if(phase!=='idle')paused=true;render();});$('pauseOverlay').onclick=()=>{paused=false;last=performance.now();render();};
if('serviceWorker'in navigator&&!['localhost','127.0.0.1'].includes(location.hostname)){navigator.serviceWorker.register('./sw.js').then(r=>{reg=r;}).catch(()=>{});}
function handleContest(cmd,id){
 if(cmd==='tournament'){openPanel(cmd);return true;}
 if(!['contest-enter','contest-wait','contest-resume'].includes(cmd))return false;
 if(phase!=='idle'||autoRunning(state)){toast('진행 중인 낚시를 마친 뒤 이용해 주세요.');return true;}
 const event=TOURNAMENTS[Number(id)];
 if(cmd==='contest-wait'){
  if(waitForTournament(state,event)){save();render();openPanel('tournament');}
  else toast(tournamentEntryIssue(state,event,false));
  return true;
 }
 if(cmd==='contest-enter'){
  if(!startTournament(state,event,spend)){toast(tournamentEntryIssue(state,event)||'참가 조건을 확인해 주세요.');return true;}
 }
 if(state.tournament){
  view='fish';paused=false;close();
  if(!restoreContestCast())resetIdle(`대회 참가자 ${state.tournament.bots.length+1}명 · 내 최고 기록 ${Math.max(0,...state.tournament.casts)||'—'} cm`);
 }
 return true;
}
function goTown(){
 if(phase!=='idle'){show('마을로 돌아갈까요?',`<p>진행 중인 낚시를 마치고 물결항으로 돌아갑니다. ${!bossTrip&&state.bait===TROPHY_BAIT.id?'월척확정 미끼는 남아 다시 사용할 수 있어요.':'사용한 일반 미끼는 소모돼요.'}</p><button class="secondary" data-do="town-confirm">낚시를 멈추고 귀항</button><button class="primary" data-do="resume-fishing">낚시 계속하기</button>`,'return');return;}
 view='town';releaseInput();paused=false;close();render();
}
function renderActiveSkills(){
 ACTIVE_SLOTS.forEach(i=>{const id=state.equippedSkills[i],k=SKILL_BY_ID[id],n=state.skills[id]||0,b=$('active'+i),cool=skillCooldown(fight,id),inFight=phase==='fight'&&fight&&!fight.done;
 if(b.dataset.skill!==id){b.dataset.skill=id;b.querySelector('.skill-icon')?.remove();b.insertAdjacentHTML('afterbegin',skillIcon(id));}b.classList.toggle('unlearned',!n);b.style.setProperty('--cool',k&&cool>0?Math.min(1,cool/(SKILL_COOLDOWN[id]||20)):0);b.setAttribute('aria-label',`${i+1}번 ${k.name}`);b.setAttribute('aria-keyshortcuts',String(i+1));b.title=k.name;b.querySelector('b').textContent=k.shortName||k.name;
 b.querySelector('small').textContent=!n?'미습득':!inFight?(phase==='bite'||phase==='waiting'?'챔질 후 사용':`Lv.${n}`):cool>0?`${Math.ceil(cool)}초`:'사용 가능';
 b.disabled=!n||paused||!inFight||cool>0;b.classList.toggle('effect-on',Boolean(fight?.effects[k.effect||id]>0));
 });
}
function useActive(i){if(modal.open||paused)return;const id=state.equippedSkills[i];if(!state.skills[id]){toast('마을의 낚시 학교에서 먼저 배워 주세요.');return;}
 if(phase!=='fight'||!fight){toast(id==='strike'?'강타는 물고기를 건 뒤에 쓸 수 있어요.':'물고기를 건 뒤에 사용할 수 있어요.');return;}
 if(skill(fight,id)){const name=SKILLS.find(k=>k.id===id).name;fx.impact(activeSkillFamily(id),name+'!',true);toast(`${name} 발동!`);sound(activeSkillFamily(id)==='shock'?'electric':'critical');buzz(25);renderActiveSkills();}
}
function selectedFish(){return state.bag.filter(x=>saleSel.has(x.uid));}
function updateSaleSummary(){const el=document.getElementById('selSummary');if(!el)return;const xs=selectedFish(),v=xs.reduce((a,f)=>a+f.value,0),fee=xs.filter(x=>!x.boss).reduce((a,f)=>a+REGIONS[f.region].expense_on_sale,0),rm=repSaleMult(state);
 const rep=discountRepPreview(state,xs);
 el.innerHTML=xs.length?`선택 <b>${xs.length}마리</b> · 일반 ${fmt(Math.max(0,v*rm-fee))} G · 평판 판매 ${fmt(Math.max(0,v*.8*rm-fee))} G · 평판 ${repDelta(rep)}`:'판매할 물고기를 눌러 선택하세요.';
 for(const b of body.querySelectorAll('[data-do="sell-sel"],[data-do="haggle-confirm"]'))b.disabled=!xs.length;}
function waterNetTankLabel(remaining,full){
 const occupancy=`선상 수족관 ${fmt(state.bag.length)}/${fmt(capacity(state))}`;
 if(!full)return occupancy;
 return `${occupancy} · ${remaining?'자동 판매 중. 칸을 비우면 다시 보관해요.':'어망을 쓰려면 물고기를 옮기거나 판매해 주세요.'}`;
}
function waterNetCard(){
 const remaining=waterNetRemaining(state),count=state.waterNet.count,full=state.bag.length>=capacity(state);
 return `<section class="water-net-card" aria-label="물빛 어망">
  <img src="assets/moon-net.webp" alt="">
  <div><div class="water-net-title"><strong>${WATER_NET.name}</strong><span>보유 ${fmt(count)}개</span></div>
  <p>사용하면 실제 시간 30분 동안 월척·관상어도 잡고 선상 수족관에 보관해요. 수족관이 차면 자동 판매하고, 빈 칸이 생기면 남은 시간 동안 다시 보관해요.</p>
  <p>직접 낚시에 성공하면 ${WATER_NET.dropChance*100}% 확률로 얻어요.</p>
  <p id="waterNetTank">${waterNetTankLabel(remaining,full)}</p>
  <p id="waterNetRemaining" class="water-net-time" ${remaining?'':'hidden'}>${remaining?`남은 시간 ${waterNetClock(remaining)}`:''}</p>
  <button class="secondary" type="button" data-do="water-net-use" ${remaining||!count||full||phase!=='idle'||state.tournament?'disabled':''}>물빛 어망 사용</button></div>
 </section>`;
}
function refreshAutoPanel(){
 if(!modal.open||panel!=='auto')return;
 const status=$('waterNetRemaining'),remaining=waterNetRemaining(state);
 if(!status)return;
 status.hidden=!remaining;
 status.textContent=remaining?`남은 시간 ${waterNetClock(remaining)}`:'';
 const tank=$('waterNetTank'),full=state.bag.length>=capacity(state);
 tank.textContent=waterNetTankLabel(remaining,full);
 body.querySelector('[data-do="water-net-use"]').disabled=!!remaining||!state.waterNet.count||full||phase!=='idle'||!!state.tournament;
 const start=body.querySelector('[data-do="auto-start"]'),issue=$('autoStartIssue');
 if(start){
  const why=canStartAuto(state);
  start.disabled=!!why||phase!=='idle'||!!state.tournament;
  issue.textContent=why;
  issue.hidden=!why;
 }
 const stats=$('autoRunStats');
 if(stats){
  const a=state.auto,bid=a.bait||autoBait(state);
  $('autoRunMode').textContent=autoModeLabel();
  stats.textContent=`${autoCatchLine(a)} · 경험치 +${fmt(a.xp)}${a.repGain>0?` · 평판 ${repDelta(a.repGain)}`:''}`;
  $('autoBaitStats').textContent=`미끼 ${baitInfo(bid).name} ${fmt(state.baitStock[bid]||0)}개 남음 · 자동 구매 ${fmt(a.bought||0)}개(−${fmt(a.spent||0)} G)`;
 }
}
function openAuto(){
 const on=autoRunning(state),a=state.auto,bid=on?a.bait||autoBait(state):autoBait(state),bait=BAITS.find(x=>x.id===bid),left=state.baitStock[bid]||0,price=baitPrice(state,bid);
 const ar=autoRates(state,0),pct=v=>(v*100).toFixed(v<.1?1:0)+'%';
 const rules=`<details class="auto-rules"><summary>자동 낚시 규칙</summary><ul class="checklist"><li>이 낚시터의 일반 미끼를 먼저 쓰고, 떨어지면 금화로 1개씩 사요.</li><li>브라우저를 닫아도 진행되며 다시 열면 정산돼요. 미끼를 살 금화가 떨어지거나 멈추면 끝나요.</li><li>일반 자동 낚시는 잡은 물고기를 바로 판매해요. 현재 판매율 ${pct(ar.sale)} · 경험치 ${pct(ar.xp)} · 월척 확률 ${pct(ar.trophy)}.</li><li>물빛 어망의 시간은 수족관이 가득 차도 계속 흘러요. 새 시도는 빈 칸이 있으면 보관하고, 가득 차면 일반 자동 낚시로 판매해요. 보스는 직접 낚시로 만날 수 있어요.</li><li>첫 어종과 월척의 평판은 직접 낚시의 절반을 받아요. 어망으로 보관한 물고기는 기존 크기 기록을 5% 이상 넘으면 평판을 받아요.</li><li>장착한 공격 스킬 단계에 따라 전투 시간이 최대 8% 줄어요. 같은 계열에서는 높은 단계만 적용돼요.</li><li>자동 낚시 중에는 직접 낚시와 낚시터 이동이 잠겨요.</li></ul></details>`;
 if(on){
  show('자동 낚시',`<div class="notice"><b>🤖 ${REGIONS[a.region].display||REGIONS[a.region].name}에서 자동 낚시 중</b><br><span id="autoRunMode">${autoModeLabel()}</span><br><span id="autoRunStats">${autoCatchLine(a)} · 경험치 +${fmt(a.xp)}${a.repGain>0?` · 평판 ${repDelta(a.repGain)}`:''}</span><br><span id="autoBaitStats">미끼 ${bait?.name||''} ${fmt(left)}개 남음 · 자동 구매 ${fmt(a.bought||0)}개(−${fmt(a.spent||0)} G)</span></div>${waterNetCard()}<div class="row"><button class="secondary" data-do="storage">수족관 열기</button><button class="secondary" data-do="market">물고기 판매</button></div>${view!=='fish'?'<button class="primary" data-do="auto-view">낚시터에서 보기</button>':''}<button class="danger-button" data-do="auto-stop">자동 낚시 멈추기</button>${rules}`,'auto');
  return;
 }
 const why=canStartAuto(state),isBusy=phase!=='idle'||state.tournament;
 show('자동 낚시',`<div class="notice"><b>${REGIONS[state.region].display||REGIONS[state.region].name}</b> · 일반 미끼 ${bait?.name||''} <b>${fmt(left)}개</b> 보유 · 개당 ${fmt(price)} G<br>한 마리에 약 ${Math.round(autoPace(state))}초 · 미끼가 떨어지면 금화로 자동 구매</div>${waterNetCard()}<p class="muted" id="autoStartIssue" ${why?'':'hidden'}>${why}</p><button class="primary" data-do="auto-start" ${why||isBusy?'disabled':''}>자동 낚시 시작</button>${isBusy?'<p class="muted">진행 중인 낚시를 마친 뒤 시작할 수 있어요.</p>':''}${rules}`,'auto');
}
function autoSummary(title,d,extra=''){
 show(title,`<div class="haggle-result"><span class="haggle-badge success">🤖 ${fmt(d.caught)}마리</span><div class="haggle-rows"><span>잡은 물고기</span><b>${fmt(d.caught)}마리</b>${d.kept?`<span>선상 수족관 보관</span><b>${fmt(d.kept)}마리</b>`:''}${d.trophies?`<span>✨ 월척</span><b>${fmt(d.trophies)}마리</b>`:''}<span>놓친 물고기</span><b>${fmt(d.missed)}마리</b><span>쓴 미끼</span><b>${fmt(d.used)}개</b>${d.bought?`<span>자동 구매한 미끼</span><b>${fmt(d.bought)}개 · −${fmt(d.spent)} G</b>`:''}<span>경험치</span><b>+${fmt(d.xp)}</b>${d.repGain>0?`<span>평판</span><b>${repDelta(d.repGain)}</b>`:''}<span>현재 레벨 · 체력</span><b>Lv.${playerLevel(state)} · ${Math.ceil(state.hp)}/${maxHP(state)}</b><span class="total">자동 판매 수익</span><b class="total">${fmt(d.gold)} G</b></div>${extra}</div>${findResult(d.finds,d.findsMissed,findsUI.full())}${d.reason==='full'?'<button class="secondary" data-do="storage">선상 수족관 열기</button>':''}<button class="primary" data-do="close">확인</button>`,'auto-summary');
}
function showAutoEnd(){
 const a=state.auto;if(!a)return;a.seen=true;save();
 const mins=Math.round(((a.ended||Date.now())-a.since)/60000);
 const reason={money:'미끼를 살 금화가 떨어졌어요.',bait:'미끼를 모두 썼어요.',empty:'잡을 물고기가 없어요.',full:'선상 수족관이 가득 차 자동 낚시가 멈췄어요.'}[a.reason]||'자동 낚시를 마쳤어요.';
 autoSummary('자동 낚시가 끝났어요',a,`<p class="muted">${reason}<br>${REGIONS[a.region]?.display||REGIONS[a.region]?.name||''} · ${Math.floor(mins/60)}시간 ${mins%60}분 동안</p>`);
 sound('catch');
}
// Settle auto fishing. Results are only shown while the player is looking; otherwise they wait (seen=false).
function runAuto(report=false){
 if(!autoRunning(state)){
  if(unseenAutoResult(state)&&!document.hidden&&(!modal.open||panel==='auto')&&phase==='idle')showAutoEnd();
  refreshAutoPanel();
  return;
 }
 const gap=(Date.now()-state.auto.last)/1000,d=autoTick(state);
 if(!d.caught&&!d.missed&&!d.used&&autoRunning(state)){renderAuto();refreshAutoPanel();return;}
 save();render();
 if(!autoRunning(state)){
  if(!document.hidden&&(!modal.open||panel==='auto'||report&&!panel.startsWith('nickname-'))&&phase==='idle')showAutoEnd();
  return;
 }
 refreshAutoPanel();
 if(report&&!panel.startsWith('nickname-')&&gap>30&&d.caught>0&&!document.hidden)autoSummary('자리를 비운 동안',d,`<p class="muted">${Math.round(gap/60)}분 동안 자동 낚시를 했어요. 계속 진행 중이에요.</p>`);
}
// Calculator-style quantity picker for bait (number pad, quick adds and a MAX that spends all coins).
let qty=null;
const qtyPrice=q=>q.kind==='food'?foodPrice(state,foodInfo(q.id)):baitPrice(state,q.id),qtyCap=q=>q.kind==='food'?9999:99999;
function qtyMax(q){const p=qtyPrice(q);return state.debt>0||p<=0?0:Math.min(qtyCap(q),Math.floor(state.coins/p));}
function qtyRender(){const sh=body.querySelector('.qty-sheet');if(!sh||!qty)return;const p=qtyPrice(qty),max=qtyMax(qty),n=qty.n,over=n>max;
 sh.querySelector('.qty-display b').textContent=fmt(n);sh.querySelector('.qty-display').classList.toggle('over',over);
 sh.querySelector('.qty-calc').innerHTML=`개당 ${fmt(p)} G × ${fmt(n)}개 = <b>${fmt(p*n)} G</b><br><small>보유 ${fmt(state.coins)} G · 최대 ${fmt(max)}개${state.debt>0?' · 외상을 먼저 갚아야 해요':''}</small>`;
 const buy=sh.querySelector('[data-do="qty-buy"]');buy.disabled=!n||over;buy.textContent=over?'금화가 부족해요':n?`${fmt(n)}개 구매 · ${fmt(p*n)} G`:'수량을 입력하세요';}
function openQty(id,kind='bait'){const x=kind==='food'?foodInfo(id):BAITS.find(b=>b.id===id);if(!x)return;body.querySelector('.qty-sheet')?.remove();qty={id,kind,back:panel,n:0};qty.n=Math.min(kind==='food'?1:10,qtyMax(qty));const have=kind==='food'?(state.foods?.[id]||0):(state.baitStock[id]||0);
 const key=(label,d,v='',cls='')=>`<button class="qty-key ${cls}" data-do="${d}" data-id="${v}">${label}</button>`;
 const sh=document.createElement('div');sh.className='qty-sheet';sh.innerHTML=`<div class="qty-card"><div class="qty-head"><strong>${kind==='food'?x.icon+' ':''}${x.name} 구매</strong><small>지금 ${fmt(have)}개 보유</small>${key('✕','qty-close','','qty-x')}</div><div class="qty-display"><b>0</b><span>개</span></div><p class="qty-calc"></p><div class="qty-quick">${key('+1','qty-add',1)}${key('+10','qty-add',10)}${key('+50','qty-add',50)}${key('+100','qty-add',100)}${key('최대','qty-max','','qty-maxkey')}</div><div class="qty-pad">${[1,2,3,4,5,6,7,8,9].map(d=>key(d,'qty-digit',d)).join('')}${key('C','qty-clear','','qty-fn')}${key('0','qty-digit',0)}${key('⌫','qty-back','','qty-fn')}</div><button class="primary" data-do="qty-buy">구매</button></div>`;
 body.append(sh);qtyRender();}
function handleV3(cmd,id,b){
 if(cmd==='bait-qty'){openQty(id);return true;}
 if(cmd==='food-qty'){openQty(id,'food');return true;}
 if(cmd.startsWith('qty-')&&qty){const max=qtyMax(qty);
  if(cmd==='qty-close'){body.querySelector('.qty-sheet')?.remove();qty=null;return true;}
  if(cmd==='qty-digit')qty.n=Math.min(qtyCap(qty),qty.n*10+Number(id));
  if(cmd==='qty-back')qty.n=Math.floor(qty.n/10);
  if(cmd==='qty-clear')qty.n=0;
  if(cmd==='qty-add')qty.n=Math.min(qtyCap(qty),qty.n+Number(id));
  if(cmd==='qty-max')qty.n=max;
  if(cmd==='qty-buy'){const q=qty,x=q.kind==='food'?foodInfo(q.id):BAITS.find(v=>v.id===q.id),n=q.n,cost=qtyPrice(q)*n,ok=n>0&&(q.kind==='food'?buyFood(state,q.id,n,spend):buyBait(state,q.id,n));if(ok){save();qty=null;openPanel(q.kind==='food'?(q.back==='food'?'food':'restaurant'):'shop');toast(`${x.name} ${fmt(n)}개 구매 · −${fmt(cost)} G`);sound('catch');buzz(20);}else toast('금화·레벨과 외상을 확인해 주세요.');return true;}
  qtyRender();return true;}
 if(cmd==='close'){close();return true;}
 if(cmd==='auto'){openAuto();return true;}
 if(cmd==='auto-view'){if(autoRunning(state)){state.region=state.auto.region;view='fish';}close();render();return true;}
 if(cmd==='water-net-use'){
  if(phase!=='idle'||state.tournament)return true;
  runAuto();
  if(state.bag.length>=capacity(state)){
   toast('선상 수족관이 가득 찼어요. 물고기를 옮기거나 판매해 주세요.');
   return true;
  }
  if(activateWaterNet(state)){save();render();openAuto();toast('물빛 어망을 펼쳤어요. 30분 동안 빈 칸이 있으면 어획물을 보관해요.',3500);}
  else if(panel==='auto')refreshAutoPanel();
  return true;
 }
 if(cmd==='auto-start'){if(state.tournament){toast('낚시대회를 마친 뒤 자동 낚시를 시작하세요.');return true;}if(phase!=='idle'){toast('진행 중인 낚시를 마친 뒤 시작하세요.');return true;}if(startAuto(state)){view='fish';save();close();render();toast('자동 낚시를 시작했어요. 브라우저를 닫아도 계속돼요.',3500);}else toast(canStartAuto(state)||'시작할 수 없어요.');return true;}
 if(cmd==='auto-stop'){runAuto();if(autoRunning(state)){const a=stopAuto(state,'stop');save();render();autoSummary('자동 낚시 멈춤',a);}return true;}
 if(cmd==='sel-toggle'){if(saleSel.has(id))saleSel.delete(id);else saleSel.add(id);b.classList.toggle('selected',saleSel.has(id));updateSaleSummary();return true;}
 if(cmd==='sel-all'||cmd==='sel-none'||cmd==='sel-cheap'){saleSel=new Set();const shown=new Set([...body.querySelectorAll('.sale-item')].map(el=>el.dataset.id));if(cmd==='sel-all')shown.forEach(uid=>saleSel.add(uid));if(cmd==='sel-cheap'){const sorted=state.bag.filter(x=>shown.has(x.uid)&&!x.boss).sort((a,c)=>a.value-c.value);sorted.slice(0,Math.ceil(sorted.length/2)).forEach(x=>saleSel.add(x.uid));}for(const el of body.querySelectorAll('.sale-item'))el.classList.toggle('selected',saleSel.has(el.dataset.id));updateSaleSummary();return true;}
 if(cmd==='sell-sel'){const ids=selectedFish().map(x=>x.uid);if(!ids.length){toast('먼저 판매할 물고기를 선택하세요.');return true;}performSale(ids,id==='discount'?'discount':'normal');openPanel('market');return true;}
 if(cmd==='haggle-confirm'){const xs=selectedFish();if(!xs.length){toast('먼저 판매할 물고기를 선택하세요.');return true;}const hc=haggleChances(state),v=xs.reduce((a,f)=>a+f.value,0);show('흥정할까요?',`<p>선택한 <b>${xs.length}마리</b>(기준가 ${fmt(v)} G)를 한 번에 흥정해요.</p><ul class="checklist"><li>대성공 ${(hc.great*100).toFixed(1)}% · <b>3배</b></li><li>성공 ${(hc.success*100).toFixed(1)}% · <b>2배</b></li><li>실패 ${((1-hc.great-hc.success)*100).toFixed(1)}% · <b>반값</b>에 판매</li></ul><p class="muted">실패하면 반값을 받고 평판이 1 떨어져요. 행운이 높을수록 성공 확률이 올라가요. 보스 물고기는 정가로 팔아요.</p><button class="primary" data-do="haggle">흥정 시작</button><button class="secondary" data-do="market">돌아가기</button>`,'haggle');return true;}
 if(cmd==='haggle'){const xs=selectedFish();if(!xs.length){openPanel('market');return true;}showHaggleResult(xs);return true;}
 if(cmd==='restaurant'||cmd==='food'){openPanel(cmd);return true;}
 if(cmd==='food-buy'){if(buyFood(state,id,1,spend)){toast(`${foodInfo(id).name}을(를) 샀어요.`);sound('catch');save();}else toast('금화·레벨·외상을 확인해 주세요.');openPanel(panel==='food'?'food':'restaurant');return true;}
 if(cmd==='food-eat'){if(phase==='fight'){toast('물고기와 싸우는 중에는 먹을 수 없어요.');return true;}const f=foodInfo(id);if(eatFood(state,id,maxHP)){toast(`${f.icon} ${f.name} 냠냠! 체력이 ${f.regen}초 동안 ${f.heal} 차올라요${f.desc?' · '+f.desc:''}`,3500);sound('catch');save();render();}openPanel(panel==='restaurant'?'restaurant':'food');return true;}
 if(cmd==='tank'){openTank();return true;}
 return false;
}
function openTank(){const L=aquariumLuck(state);show('내 수족관',`${tankHTML(state.homeFish)}<div class="notice">집 수족관 ${state.homeFish.length}/${HOMES[state.home].capacity}마리 · 어항에는 최대 36마리가 헤엄쳐요.<br>관상어 행운 <b>+${L}</b> · 관상어는 종류마다 한 번씩, 깊은 바다의 관상어일수록 행운이 커요.</div><div class="row"><button class="secondary" data-do="storage">물고기 보관 · 꺼내기</button><button class="secondary" data-do="home">내 집</button></div>`,'tank');startTank(body,state.homeFish);}
async function handleV2(cmd,id,b){
 if(['boats','boats-all','home','storage','skills','equipment','equipment-all'].includes(cmd)){openPanel(cmd);return true;}
 if(cmd==='town-confirm'){if(fight)state.hp=Math.max(0,fight.hero);if(completeContestCast())return true;save();view='town';resetIdle();close();return true;}
 if(cmd==='resume-fishing'){close();return true;}
 if(cmd.startsWith('equipment-')){
  if(phase!=='idle'){toast('낚시를 마치고 장비를 바꿔 주세요.');return true;}
  const [slot,tierId]=id.split(':'),tier=Number(tierId),act=cmd.slice(10);
  const result=changeEquipment(state,act,slot,tier);
  const keepFocus=document.activeElement===b;
  if(!result)toast('금화·레벨·보유 장비와 외상을 확인해 주세요.');
  else if(act!=='enhance'&&act!=='buy')toast('장비 변경을 완료했어요.');
  if(result){sound(result==='failed'?'fail':act==='enhance'?'hit':'catch');save();}
  openPanel(panel==='shop'||panel==='equipment-all'?panel:'equipment');
  const section=body.querySelector(`[data-equipment-slot="${slot}"]`);
  if(section){
   section.open=true;
   section.scrollIntoView({block:'nearest'});
   if(keepFocus){
    [...section.querySelectorAll('button:not(:disabled)')].find(button=>button.dataset.do===cmd&&button.dataset.id===id)?.focus({preventScroll:true});
   }
  }
  if(result==='failed')enhancementFailed();
  if(result===true&&(act==='enhance'||act==='buy')){
   const icon={rod:'🎣',reel:'⚙️',float:'🔴',line:'🧵',hook:'🪝'}[slot]||'✨',name=equipmentName(slot,tier);
   if(act==='enhance'){
    const rank=ensureEquipment(state)[slot].owned[tier];
    celebrate('forge',{icon,title:`강화 성공! +${rank}`,sub:name});
    setTimeout(()=>sound('critical'),180);buzz([20,30,40]);
   }else{celebrate('newgear',{icon,title:'새 장비!',sub:name});buzz([20,40,20]);}
  }
  return true;
 }
 const ops=['boat-buy','boat-select','boat-sell-confirm','boat-sell','home-upgrade','sleep','store-fish','withdraw-fish','store-all','withdraw-all','skill-learn','skill-equip','v2-travel','v2-boss','bait-buy','bait-buy50','bait-emergency','skill-reset-confirm','skill-reset'];
 if(!ops.includes(cmd))return false;
 if(phase!=='idle'){toast('진행 중인 낚시를 마치거나 마을로 귀항한 뒤 이용해 주세요.');return true;}
 if(autoRunning(state)&&['store-fish','withdraw-fish','store-all','withdraw-all','boat-buy','boat-select','boat-sell'].includes(cmd))runAuto();
 const failMsg='금화·레벨·미끼 외상과 필요한 조건을 확인해 주세요.';
 if(cmd==='skill-reset-confirm'){show('스킬을 다시 배분할까요?',`<p>사용한 스킬 포인트를 모두 돌려받아요. 배운 스킬은 초기화되며 금화는 들지 않아요.</p><button class="primary" data-do="skill-reset">포인트 돌려받기</button><button class="secondary" data-do="skills">취소</button>`,'skills');}
 if(cmd==='skill-reset'){resetSkills(state);save();openPanel('skills');}
 const boatPanel=panel==='boats-all'?'boats-all':'boats';
 if(cmd==='boat-buy'){if(buyBoat(state,Number(id))){selectBoat(state,Number(id));save();openPanel(boatPanel);celebrate('boat',{icon:'⛵',title:'새 배 출항!',sub:`${BOATS[Number(id)].name} 구매 · 탑승 완료`});sound('catch');buzz([20,40,20]);}else{toast(failMsg);save();openPanel(boatPanel);}}
 if(cmd==='boat-select'){if(selectBoat(state,Number(id)))toast(`${BOATS[Number(id)].name}에 탑승했어요.`);else toast('물고기가 배의 수족관 용량보다 많아요. 집에 보관하거나 판매해 주세요.');save();openPanel(boatPanel);}
 if(cmd==='boat-sell-confirm'){const boat=BOATS[Number(id)];show('배를 판매할까요?',`${boatArt(boat.id)}<p><b>${boat.name}</b>을 ${fmt(boat.resale)} G에 판매합니다. 다시 사려면 구매 대금이 필요해요.</p><p class="muted">탑승 중인 배는 다른 소유 배로 갈아탑니다. 물고기를 모두 실을 배가 없으면 판매할 수 없어요.</p><button class="danger-button" data-do="boat-sell" data-id="${boat.id}">이 배 판매하기</button><button class="secondary" data-do="boats">취소</button>`,'boat-confirm');}
 if(cmd==='boat-sell'){if(sellBoat(state,Number(id)))toast('배를 판매했어요.');else toast('다른 배의 저장공간이 부족해요. 물고기를 집으로 옮겨 주세요.');save();openPanel(boatPanel);}
 if(cmd==='home-upgrade'){if(upgradeHome(state)){save();openPanel('home');celebrate('home',{icon:'🏠',title:'이사 완료!',sub:`${HOMES[state.home].name}으로 옮겼어요`});sound('catch');buzz([20,40,20]);}else{toast(failMsg);save();openPanel('home');}}
 if(cmd==='sleep'){sleep(state);view='town';paused=false;save();openPanel('home');toast(`푹 잤어요! 체력 ${maxHP(state)} / ${maxHP(state)} · ${isNight(state)?'밤':'낮'}`,4000);}
 if(cmd==='store-fish'||cmd==='withdraw-fish'){if(!transferFish(state,id,cmd==='store-fish'))toast('수족관이 가득 찼어요. 공간을 비워 주세요.');save();openPanel('storage');}
 if(cmd==='store-all'||cmd==='withdraw-all'){const toHome=cmd==='store-all',source=toHome?state.bag:state.homeFish;let count=0;for(const x of [...source])if(transferFish(state,x.uid,toHome))count++;save();toast(`${count}마리를 ${toHome?'집':'배'} 수족관으로 옮겼어요.`);openPanel(panel==='home'?'home':'storage');}
 if(cmd==='skill-learn'){if(learnSkill(state,id)){save();openPanel('skills');celebrate('skill',{icon:'📜',title:`${SKILLS.find(k=>k.id===id).name} Lv.${state.skills[id]}`,sub:'스킬 습득!'});sound('critical');buzz([15,30,15]);}else{toast('필요 레벨과 남은 스킬 포인트를 확인해 주세요.');save();openPanel('skills');}}
 if(cmd==='skill-equip'){const [skillId,slot]=id.split(':');if(equipSkill(state,skillId,Number(slot)))toast('전투 스킬을 장착했어요.');save();openPanel('skills');}
 if((cmd==='v2-travel'||cmd==='v2-boss')&&autoRunning(state)){toast('자동 낚시를 멈춘 뒤 이동할 수 있어요.');return true;}
 if(cmd==='v2-travel'&&state.tournament){if(Number(id)===state.tournament.id)handleContest('contest-resume');else toast('대회가 끝나면 다른 지역으로 출항할 수 있어요.');return true;}
 if(cmd==='v2-travel'){const target=Number(id);if(state.hp<=0){openPanel('home');toast('먼저 잠을 자고 체력을 회복하세요.');return true;}if(target>state.unlocked)state.region=state.unlocked;if(travel(state,target)){view='fish';paused=false;save();close();resetIdle(`${REGIONS[target].name}에 도착했어요. ${BOATS[state.boat].name}에서 낚시를 시작해요.`);}else{openPanel('goals');toast('배 등급·레벨·이전 낚시터 목표를 확인해 주세요.');}}
 if(cmd==='v2-boss'){view='fish';paused=false;close();start(true);}
 if(cmd==='bait-buy'||cmd==='bait-buy50'){if(buyBait(state,id,cmd==='bait-buy'?10:50))toast('미끼를 구입했어요.');else toast(failMsg);save();openPanel('shop');}
 if(cmd==='bait-emergency'){if(emergencyBait(state))toast('기본 미끼 10개를 외상으로 받았어요. 판매금에서 정산돼요.');else toast('미끼가 남아 있거나 금화가 충분해요.');save();openPanel('shop');}
 render();return true;
}
if(state.tournament)view='fish';
resetIdle();
if(state.resetNotice)openResetNotice();
else if(!state.nickname)openNickname();
else if(!(state.tournament&&restoreContestCast())&&state.tutorial)openPanel('help');
requestAnimationFrame(tick);
{let exitArmed=0;const guard=()=>{try{history.pushState({jo:1},'');}catch{}};guard();
 window.addEventListener('popstate',()=>{save();
  if(modal.open){leavePanel();guard();return;}
  if(view==='fish'){goTown();guard();return;}
  if(Date.now()-exitArmed<2500){history.back();return;}
  exitArmed=Date.now();toast('저장했어요. 뒤로가기를 한 번 더 누르면 게임을 나가요.',2500);guard();});}
// Auto fishing keeps settling on the wall clock (timers keep running at a slower pace in hidden tabs).
$('autoBtn').onclick=e=>{e.stopPropagation();openAuto();};$('autoOverlay').addEventListener('click',e=>{e.stopPropagation();if(e.target.closest('[data-do="auto-stop"]'))handleV3('auto-stop');else openAuto();});$('autoOverlay').addEventListener('pointerdown',e=>e.stopPropagation());setInterval(()=>runAuto(false),1000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)runAuto(true);});$('autoPill').onclick=e=>{e.stopPropagation();openAuto();};if(autoRunning(state)){state.region=state.auto.region;view='fish';}runAuto(true);render();
if(loadError)toast('저장 기록을 읽지 못했어요. 백업 파일이 있다면 가져와 주세요.',6000);
