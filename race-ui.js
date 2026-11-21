import {escapeRankingName} from './nickname.js';
import {BOATS} from './progression.js';
import {boatArt} from './panels.js';
import {createRaceScene} from './race-scene.js';
import {
 LEAGUES,PARTS,MAKERS,SUCCESS,raceState,unlockedLeague,partKey,partPrice,upgradePrice,
 modCost,modPrice,raceStats,prizeFor,raceBaitFor,startRace,raceOrder,stepRace,settleRace,changeRacePart
} from './race.js';

const fmt=n=>n.toLocaleString('ko-KR');
const time=t=>t==null?'—':t.toFixed(2)+'초';
const button=(label,cmd,id='',disabled=false,kind='secondary')=>`<button class="${kind}" data-do="${cmd}" data-id="${id}" ${disabled?'disabled':''}>${label}</button>`;

const percent=n=>Math.round(n*100)+'%';
const kmh=n=>Math.round(n*.54)+' km/h';
const signed=(n,unit='')=>n===0?'—':(n>0?'+':'−')+fmt(Math.abs(n))+unit;
const ledger=(label,value)=>`<div><dt>${label}</dt><dd>${value}</dd></div>`;
const boatSpecs=spec=>`<dl class="race-stat-grid">${ledger('최고속도',kmh(spec.speed))}${ledger('가속',percent(spec.accel))}${ledger('조향',percent(spec.handling))}${ledger('안정',percent(spec.stability))}</dl>`;
const shortage=(s,cost)=>s.debt>0?'외상을 갚아 주세요':s.coins<cost?`${fmt(cost-s.coins)} G 부족`:'';
const boatCard=(s,spec)=>`<section class="race-boat-card">${boatArt(s.boat)}<div><small>현재 탑승 선박</small><h3>${BOATS[s.boat].name}</h3></div>${boatSpecs(spec)}</section>`;

function leagueCard(s,l,race,unlocked){
 const locked=l.id>unlocked,wins=race.wins[l.id];
 const firstWin=wins===0,winLabel=firstWin?'첫 우승':'재우승';
 const status=locked?'잠김':wins?fmt(wins)+'승':'참가 가능';
 const recommend=l.recommended?`${BOATS[l.boat].name} 이상 · ${l.name} 부품 +${l.recommended} · 개조 1회`:'기본 선박으로 출전 가능';
 return `<article class="race-league ${locked?'race-league-locked':''}"><header><h3>${l.name} 리그</h3><b>${status}</b></header>
 <dl class="race-stat-grid race-league-money">${ledger('참가비',fmt(l.fee)+' G')}${ledger(winLabel+' 상금',fmt(prizeFor(l.id,1,firstWin))+' G')}${ledger('우승 보너스','월척 미끼 '+raceBaitFor(l.id)+'개')}</dl>
 <div class="race-league-meta"><span>2위 ${fmt(prizeFor(l.id,2))} G · 3위 ${fmt(prizeFor(l.id,3))} G</span><span>최고 기록 ${time(race.best[l.id])}</span></div>
 ${locked?`<p class="race-recommend">${LEAGUES[l.id-1].name} 리그 우승 시 개방</p>`:`<p class="race-recommend">${l.recommended?"추천 · ":""}${recommend}</p>${button(l.name+' 출전 준비','race-confirm',l.id,false,'primary')}`}</article>`;
}

function lobby(s){
 const race=raceState(s),unlocked=unlockedLeague(s),spec=raceStats(s),featured=LEAGUES[unlocked];
 const other=LEAGUES.filter(l=>l!==featured);
 return `<section class="race-paddock">
 <div class="race-banner"><div><h2>낚시배 레이스</h2><p>10~15팀 · 매회 새로운 수로</p></div></div>
 ${boatCard(s,spec)}
 <div class="race-menu">${button('레이싱 부품점','race-shop')}${button('배 바꾸기','boats')}</div>
 ${leagueCard(s,featured,race,unlocked)}
 <details class="race-disclosure"><summary>다른 리그 · ${other.length}개</summary><div class="race-leagues">${other.map(l=>leagueCard(s,l,race,unlocked)).join('')}</div></details>
 </section>`;
}

function projectedStats(s,race,part,key,owned){
 const group=race.parts[part.id];
 return raceStats({...s,race:{...race,parts:{...race.parts,[part.id]:{
  active:key,owned:{...group.owned,[key]:owned}
 }}}});
}

const statLabels={speed:'최고속도',accel:'가속',handling:'조향',stability:'안정',boost:'부스트 출력',charge:'부스트 효율'};
function partComparison(base,preview){
 return Object.entries(statLabels).map(([stat,label])=>{
  const speed=stat==='speed',factor=speed?540:1000;
  const delta=(Math.round(preview[stat]*factor)-Math.round(base[stat]*factor))/10;
  return delta?ledger(label,`<span class="${delta>0?'race-increase':'race-decrease'}">${signed(delta,speed?' km/h':'%p')}</span>`):'';
 }).join('');
}
const option=(label,id,selected)=>`<button class="${selected?'primary':'secondary'}" data-do="race-select" data-id="${id}" aria-pressed="${selected}">${label}</button>`;

function shop(s,tier,selected){
 const r=raceState(s),part=PARTS.find(p=>p.id===selected),league=LEAGUES[tier];
 const unlocked=unlockedLeague(s),base=raceStats(s),group=r.parts[part.id];
 const [activeTier,activeMaker]=group.active?.split('-')??[];
 const active=group.active?`${LEAGUES[activeTier].name} ${MAKERS.find(m=>m.id===activeMaker).name} +${group.owned[group.active].level}`:'기본 부품';
 const price=partPrice(tier,part.id),materials=r.materials[tier][part.id];
 return `<section class="race-paddock race-workshop">
 <div class="race-menu">${button('레이스 접수처','race')}${button('선박 거래소','boats')}</div>
 <div class="race-wallet"><span>보유 금화 <b>${fmt(s.coins)} G</b></span><span>현재 ${part.name} · <b>${active}</b></span></div>
 <div class="race-chooser race-grade-chooser" role="group" aria-label="부품 등급 선택">${LEAGUES.map(l=>option(l.name,l.id+':'+part.id,l.id===tier)).join('')}</div>
 <div class="race-chooser" role="group" aria-label="레이싱 부품 선택">${PARTS.map(p=>option(p.name,tier+':'+p.id,p===part)).join('')}</div>
 <div class="race-showcase"><img src="assets/race-parts/${part.id}-${tier}.webp" alt="" draggable="false"><div><h3>${league.name} ${part.name}</h3><p>${part.description}</p><small>${league.name} ${part.material} <b>${fmt(materials)}개 보유</b><br>${league.water+1}~${league.water+5}번 낚시터에서 획득</small></div></div>
 ${MAKERS.map(m=>{
  const key=partKey(tier,m.id),owned=group.owned[key],equipped=group.active===key,id=[tier,part.id,m.id].join(':');
  const preview=projectedStats(s,r,part,key,owned??{level:0,mods:0});
  const comparison=partComparison(base,preview);
  const enhanceCost=owned&&owned.level<10?upgradePrice(tier,part.id,owned.level):0;
  const modifyCost=owned&&owned.mods<3?modCost(owned.mods):0;
  const buyBlock=tier>unlocked?`${league.name} 리그 개방 필요`:shortage(s,price);
  const enhanceBlock=enhanceCost&&shortage(s,enhanceCost);
  const modifyPrice=modifyCost?modPrice(tier,part.id,owned.mods):0;
  const modifyBlock=modifyCost&&(materials<modifyCost?`재료 ${modifyCost-materials}개 부족`:shortage(s,modifyPrice));
  return `<article class="race-part ${equipped?'race-part-equipped':''}"><header><img src="assets/race-parts/${m.id}.svg" alt=""><div><h3>${m.name}</h3><small>${m.trait}</small></div><b class="race-active">${equipped?'장착 중':owned?'보유':''}</b></header>
  ${owned?`<p class="race-part-level">강화 +${owned.level} · 개조 ${owned.mods}/3</p>`:''}
  ${comparison?`<p class="race-comparison-label">장착 시 현재 선박 대비</p><dl class="race-stat-grid race-comparison">${comparison}</dl>`:`<p class="race-comparison-label">${equipped?'현재 선박에 적용 중':'표시할 성능 변화 없음'}</p>`}
  ${owned?`<div class="race-actions">
    ${equipped?'':button('장착','race-equip',id)}
    ${button(owned.level===10?'강화 최대 +10':`+${owned.level+1} 강화<br><small>${fmt(enhanceCost)} G · 성공 ${SUCCESS[owned.level]}%${enhanceBlock?'<br>'+enhanceBlock:''}</small>`,'race-enhance',id,owned.level===10||!!enhanceBlock)}
    ${button(owned.mods===3?'개조 완료':`개조 · 재료 ${modifyCost}개<br><small>${fmt(modifyPrice)} G · ${modifyBlock||'부품 효과 ×2'}</small>`,'race-modify',id,owned.mods===3||!!modifyBlock)}
  </div>`:`<div class="race-actions">${button(`구매 및 장착 · ${fmt(price)} G`,'race-buy',id,!!buyBlock,'primary')}</div>${buyBlock?`<p class="race-block">${buyBlock}</p>`:''}`}</article>`;
 }).join('')}
 <details class="race-disclosure"><summary>강화와 개조 안내</summary><p>강화에 실패하면 금화가 차감되고 강화 단계는 유지돼요. 개조는 금화와 부위별 재료를 사용하며 3회까지 할 수 있어요.</p></details>
 </section>`;
}

function confirmHTML(s,tier){
 const league=LEAGUES[tier],block=shortage(s,league.fee);
 return `<section class="race-paddock race-check-in">${boatCard(s,raceStats(s))}
 <dl class="race-stat-grid race-check-in-money">${ledger('참가비',fmt(league.fee)+' G')}${ledger('보유 금화',fmt(s.coins)+' G')}${ledger('결제 후 금화',block?'—':fmt(s.coins-league.fee)+' G')}</dl>
 <div class="race-guide"><h3>첫 출전 조작법</h3><ol>
 <li><b>가속과 조향</b> · 가속을 누른 채 좌우로 조향해 점선을 따라가세요.</li>
 <li><b>급커브</b> · 빨간 줄무늬 구간에서는 브레이크로 감속하세요.</li>
 <li><b>부스트</b> · 녹색 부표 사이를 통과하면 부스트가 충전돼요.</li>
 </ol><p>키보드 · 방향키 또는 WASD · 스페이스 부스트</p></div>
 ${block?`<p class="race-block">${block}</p>`:`<p class="race-tip">기권하면 참가비가 소진돼요.</p>`}
 <div class="race-menu">${button('대회 목록','race')}${button('참가비 결제 및 출발','race-start',tier,!!block,'primary')}</div></section>`;
}

function liveHTML(r){
 return `<section class="race-live">
 <div class="race-viewport"><canvas aria-label="조선생 팀의 경주 수로"></canvas></div>
 <div class="race-drive-hud">
  <div class="race-drive-heading"><div><small>${LEAGUES[r.tier].name} 리그</small><strong>${r.course.name}</strong></div><span id="raceTime">0.00초</span></div>
  <div class="race-instruments">
   <div class="race-standing"><small>순위</small><div><b id="raceRank">—</b><span> / ${r.teams.length+1}</span></div></div>
   <div class="race-progress-hud"><label for="raceProgress">코스 <b id="raceDistance">0%</b></label><progress id="raceProgress" max="${r.course.length}" value="0"></progress></div>
  </div>
 </div>
 <div id="raceCue" class="race-cue" data-kind="start" role="status">3</div>
 <div class="race-drive-bottom">
  <div class="race-drive-readouts">
   <div class="race-speed"><b id="raceSpeed">0</b><span>km/h</span></div>
   <label class="race-boost-hud" for="raceEnergy"><span>부스트 <b id="raceCharge">65%</b></span><progress id="raceEnergy" max="100" value="65"></progress></label>
  </div>
  <div class="race-controls" aria-label="선박 조종">
   <div class="race-steering"><button type="button" data-drive="left" aria-label="왼쪽 조향"><i aria-hidden="true"></i></button><button type="button" data-drive="right" aria-label="오른쪽 조향"><i aria-hidden="true"></i></button></div>
   <div class="race-engine"><button type="button" data-drive="brake"><i aria-hidden="true"></i><span>제동</span></button><button type="button" data-drive="boost"><i aria-hidden="true">↯</i><span>부스트</span></button><button type="button" data-drive="throttle"><i aria-hidden="true"></i><span>가속</span></button></div>
  </div>
  <p class="race-keyboard">방향키 / WASD · 스페이스 부스트</p>
 </div>
 <aside class="race-pause" hidden aria-labelledby="racePauseTitle">
  <div><h3 id="racePauseTitle">일시정지</h3><p>기권하면 낸 참가비는 소진돼요.</p>
  <button type="button" class="primary" data-race-resume>레이스 계속</button>
  <button type="button" class="danger-button" data-race-quit>기권하고 접수처로</button></div>
 </aside>
 </section>`;
}

function resultHTML(r,result){
 const {order,rank,prize,bait,timedOut,unlocked}=result;
 const podium=[order[1],order[0],order[2]],net=prize-LEAGUES[r.tier].fee;
 return `<section class="race-paddock race-results">
 <header class="race-finish"><div class="race-finish-title"><p>${LEAGUES[r.tier].name} 리그 · ${r.course.name}</p><h2>${timedOut?'시간 초과':rank===1?'우승':rank+'위 완주'}</h2>${timedOut?'':`<span>${time(r.player.finish)}</span>`}</div>
 <div class="race-podium" aria-label="상위 세 팀">${podium.map((team,i)=>`<div class="race-podium-${i} ${team===r.player?'race-podium-player':''}"><span class="race-podium-rank">${[2,1,3][i]}위</span><b>${escapeRankingName(team.name)}</b><small>${time(team.finish)}</small></div>`).join('')}</div></header>
 <dl class="race-stat-grid race-payout">${ledger('상금',fmt(prize)+' G')}${ledger('순수익',net===0?'0 G':signed(net,' G'))}${ledger('월척 미끼',bait?'+'+bait+'개':'0개')}</dl>
 ${unlocked?`<p class="race-unlocked">${LEAGUES[r.tier+1].name} 리그가 열렸어요!</p>`:''}
 <div class="race-menu">${button('대회 목록','race')}${button('다시 도전','race-confirm',r.tier,false,'primary')}</div>
 <details class="race-disclosure"><summary>전체 순위 · ${order.length}팀</summary><ol class="race-table">${order.map(team=>`<li class="${team===r.player?'race-your-team':''}"><span>${escapeRankingName(team.name)}</span><small>${team.finish==null?'미완주':time(team.finish)}</small></li>`).join('')}</ol></details>
 </section>`;
}

const DRIVE_KEYS={ArrowUp:'throttle',w:'throttle',ArrowDown:'brake',s:'brake',ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right',' ':'boost'};

export function createRaceUI({getState,body,modal,show,save,render,toast,spend,credit,canRace,sound,buzz}){
 let live=null,tier=0,slot=PARTS[0].id;
 const reset=()=>{if(live){live.abort();live=null;}};
 modal.addEventListener('close',()=>{if(!modal.open)reset();});
 const showRace=(title,html,panel)=>{reset();show(title,html,panel);render();};
 function open(name){
  if(name==='race')showRace('레이스 접수처',lobby(getState()),name);
  else showRace('레이싱 부품점',shop(getState(),tier,slot),name);
 }
 function drive(r){
  r.boatSprite=Math.min(2,Math.floor(getState().boat/7));
  showRace(LEAGUES[r.tier].name+' · '+r.course.name,liveHTML(r),'race-live');
  const ctrl=new AbortController();
  live=ctrl;
  modal.classList.add('race-driving');
  const canvas=body.querySelector('canvas'),draw=createRaceScene(canvas,r);
  const stage=canvas.closest('.race-live'),cue=stage.querySelector('#raceCue');
  const [rank,speed,timer,progress,distance,energy,charge]=['Rank','Speed','Time','Progress','Distance','Energy','Charge'].map(id=>stage.querySelector('#race'+id));
  const close=modal.querySelector('#closeModal');
  const closeLabel=close.getAttribute('aria-label');
  close.setAttribute('aria-label','레이스 일시정지');
  const keyboard=new Set(),pointers=new Map();
  const pause=stage.querySelector('.race-pause'),resume=pause.querySelector('[data-race-resume]');
  const controls=[...stage.querySelectorAll('[data-drive]')];
  let frame=0,last=0,paused=false;
  const refresh=()=>controls.forEach(el=>{
   const down=[...pointers.values(),...[...keyboard].map(key=>DRIVE_KEYS[key])].includes(el.dataset.drive);
   el.classList.toggle('pressed',down);
  });
  const clear=()=>{keyboard.clear();pointers.clear();refresh();last=0;};
  const listen=(el,event,fn,capture=false)=>el.addEventListener(event,fn,{signal:ctrl.signal,capture});
  const setPaused=(value)=>{
   paused=value;
   clear();
   pause.hidden=!paused;
   controls.forEach(button=>button.disabled=paused);
   close.setAttribute('aria-label',paused?'레이스 계속':'레이스 일시정지');
   (paused?resume:close).focus({preventScroll:true});
  };
  const togglePause=e=>{
   e.preventDefault();
   e.stopImmediatePropagation();
   setPaused(!paused);
  };
  listen(close,'click',togglePause,true);
  listen(modal,'cancel',togglePause,true);
  listen(resume,'click',()=>setPaused(false));
  listen(pause.querySelector('[data-race-quit]'),'click',()=>open('race'));
  ctrl.signal.addEventListener('abort',()=>{
   cancelAnimationFrame(frame);
   modal.classList.remove('race-driving');
   close.setAttribute('aria-label',closeLabel);
  });
  listen(window,'blur',clear);
  listen(document,'visibilitychange',clear);
  for(const type of ['keydown','keyup'])listen(window,type,e=>{
   const key=e.key.length===1?e.key.toLowerCase():e.key;
   if(paused||!DRIVE_KEYS[key])return;
   e.preventDefault();
   if(e.type==='keydown')keyboard.add(key);
   else keyboard.delete(key);
   refresh();
  });
  for(const button of controls){
   listen(button,'pointerdown',e=>{
    if(e.button!==0)return;
    e.preventDefault();
    button.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId,button.dataset.drive);
    refresh();
   });
   for(const event of ['pointerup','pointercancel','lostpointercapture'])listen(button,event,e=>{pointers.delete(e.pointerId);refresh();});
  }
  function tick(now){
   if(!modal.open||!stage.isConnected){reset();return;}
   const dt=last?(now-last)/1000:0;
   last=now;
   const held=[...pointers.values(),...[...keyboard].map(key=>DRIVE_KEYS[key])];
   if(paused||document.hidden){frame=requestAnimationFrame(tick);return;}
   stepRace(r,dt,Object.fromEntries(held.map(key=>[key,true])));
   draw(dt);
   const p=r.player;
   const order=raceOrder(r);
   rank.textContent=order.indexOf(p)+1;
   speed.textContent=Math.round(p.speed*.54);
   const brake=r.course.braking.some(area=>area.start-24<=p.at&&p.at<area.end)&&p.speed>r.stats.speed*.68;
   speed.classList.toggle('race-slow',brake);
   timer.textContent=time(r.time);
   progress.value=p.at;
   distance.textContent=Math.floor(p.at/r.course.length*100)+'%';
   energy.value=p.energy;
   charge.textContent=Math.floor(p.energy)+'%';
   stage.classList.toggle('race-boosting',Boolean(p.boosting));
   const starting=r.countdown>0||r.time<1;
   const message=r.countdown>0?String(Math.ceil(r.countdown)):starting?'출발!':p.impact>0?'바위 충돌':p.edge?'수로 이탈 · 감속':brake?'급커브 · 감속':'';
   if(cue.textContent!==message)cue.textContent=message;
   cue.dataset.kind=starting?'start':'warning';
   cue.hidden=!message;
   if(!r.done){frame=requestAnimationFrame(tick);return;}
   const result=settleRace(getState(),r,credit);
   save();
   showRace('레이스 결과',resultHTML(r,result),'race-result');
   sound(result.rank===1?'critical':'catch');
   if(result.rank<=3)buzz([25,30,40]);
  }
  frame=requestAnimationFrame(tick);
 }
 function handle(cmd,id){
  if(!cmd.startsWith('race'))return false;
  const s=getState();
  if(cmd==='race'||cmd==='race-shop'){open(cmd);return true;}
  if(cmd==='race-confirm'||cmd==='race-start'){
   const league=LEAGUES[Number(id)];
   if(!league||league.id>unlockedLeague(s))return true;
   if(!canRace()){toast('낚시와 낚시대회를 마치고 자동 낚시를 멈춘 뒤 출전해 주세요.');return true;}
   if(cmd==='race-confirm'){showRace(league.name+' 출전 준비',confirmHTML(s,league.id),'race-confirm');return true;}
   const r=startRace(s,league.id,spend);
   if(!r){toast('금화와 외상을 확인해 주세요.');return true;}
   save();drive(r);return true;
  }
  const focused=document.activeElement;
  const workshopFocus=body.contains(focused)&&focused.matches('button[data-do]');
  const groupLabel=workshopFocus?focused.parentElement.getAttribute('aria-label'):null;
  const [grade,part,maker]=id.split(':');
  if(!LEAGUES[Number(grade)]||!PARTS.some(p=>p.id===part))return true;
  tier=Number(grade);slot=part;
  if(cmd!=='race-select'){
   const message=changeRacePart(s,{action:cmd.slice(5),tier,slot,maker},spend);
   if(message)toast(message);
   save();
  }
  open('race-shop');
  if(workshopFocus){
   const buttons=[...body.querySelectorAll('button[data-do]:not(:disabled)')];
   const next=buttons.find(el=>el.dataset.do===cmd&&el.dataset.id===id&&el.parentElement.getAttribute('aria-label')===groupLabel)
    ??buttons.find(el=>el.dataset.id===id)
    ??buttons.find(el=>el.getAttribute('aria-pressed')==='true');
   next?.focus({preventScroll:true});
  }
  return true;
 }
 return {open,handle,reset};
}
