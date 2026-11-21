import {BOATS} from './progression.js';
import {boatArt} from './panels.js';
import {
 LEAGUES,PARTS,MAKERS,SUCCESS,raceState,unlockedLeague,partKey,partPrice,partEffect,upgradePrice,
 modCost,raceStats,prizeFor,startRace,courseCenter,raceOrder,stepRace,settleRace,changeRacePart
} from './race.js';

const fmt=n=>n.toLocaleString('ko-KR');
const time=t=>t==null?'—':t.toFixed(2)+'초';
let boatSprites;
const button=(label,cmd,id='',disabled=false,kind='secondary')=>`<button class="${kind}" data-do="${cmd}" data-id="${id}" ${disabled?'disabled':''}>${label}</button>`;

function lobby(s){
 const race=raceState(s),unlocked=unlockedLeague(s),spec=raceStats(s);
 return `<div class="race-banner"><div><h2>낚시배 레이스</h2><p>10~15팀 · 매회 새로운 코스</p></div></div>
 <div class="race-current"><b>${BOATS[s.boat].name}</b><span>최고속도 ${spec.speed.toFixed(0)} · 조향 ${Math.round(spec.handling*100)}%</span><small>월척 미끼 ${fmt(s.trophyBait||0)}개</small></div>
 <div class="race-menu">${button('레이싱 부품점','race-shop')}${button('배 바꾸기','boats')}</div>
 <p class="race-tip">점선을 따라 항로를 읽으세요. 빨간 줄무늬는 급커브 감속 구간이에요. 녹색 부표를 통과하면 부스트가 충전돼요.</p>
 <div class="race-leagues">${LEAGUES.map(l=>{
  const locked=l.id>unlocked,wins=race.wins[l.id];
  return `<article class="race-league"><header><h3>${l.name}</h3><b>${locked?'🔒 잠김':wins?'🏆 '+fmt(wins)+'승':'참가 가능'}</b></header>
  <p><b>참가비 ${fmt(l.fee)} G</b> · 우승 ${fmt(prizeFor(l.id,1))} G + 월척 미끼 ${l.bait}개</p>
  <small>2위 ${fmt(prizeFor(l.id,2))} · 3위 ${fmt(prizeFor(l.id,3))} G</small>
  <p class="race-recommend">추천 · ${BOATS[l.boat].name} 이상 · ${l.recommended?`${l.name} 부품 +${l.recommended} · 개조 1회`:'기본 선박 또는 초급 부품'}<br>최고 기록 ${time(race.best[l.id])}</p>
  ${button(locked?LEAGUES[l.id-1].name+' 우승 후 개방':'출전 준비','race-confirm',l.id,locked,'primary')}</article>`;
 }).join('')}</div>`;
}

function shop(s,tier,selected){
 const r=raceState(s),part=PARTS.find(p=>p.id===selected),league=LEAGUES[tier];
 return `<div class="race-menu">${button('레이스 접수처','race')}${button('선박 거래소','boats')}</div>
 <div class="race-chooser" aria-label="부품 등급 선택">${LEAGUES.map(l=>button(l.name,'race-select',l.id+':'+part.id,false,l.id===tier?'primary':'secondary')).join('')}</div>
 <div class="race-chooser" aria-label="레이싱 부품 선택">${PARTS.map(p=>button(p.name,'race-select',tier+':'+p.id,false,p===part?'primary':'secondary')).join('')}</div>
 <div class="race-showcase"><img src="assets/race-parts/${part.id}.webp" alt="" draggable="false"><div><h3>${league.name} ${part.name}</h3><p>${part.description}</p><small>재료 · ${league.name} ${part.material} <b>${fmt(r.materials[tier][part.id])}개</b><br>${league.water+1}~${league.water+5}번 낚시터 포획으로 획득</small></div></div>
 ${MAKERS.map(m=>{
  const key=partKey(tier,m.id),group=r.parts[part.id],owned=group.owned[key],id=[tier,part.id,m.id].join(':');
  return `<article class="race-part"><header><img src="assets/race-parts/${m.id}.svg" alt=""><div><h3>${m.name}</h3><small>${m.trait}</small></div>${group.active===key?'<b class="race-active">장착 중</b>':''}</header>
  <p>부품 효과 ${partEffect(tier,m,owned||{level:0,mods:0}).toFixed(2)}배 ${owned?'· +'+owned.level+' · 개조 '+owned.mods+'/3':''}</p>
  ${owned?`<div class="race-actions">
    ${button(group.active===key?'사용 중':'이 부품 장착','race-equip',id,group.active===key)}
    ${button(owned.level===10?'강화 최대 +10':`+${owned.level+1} 강화 · ${fmt(upgradePrice(tier,part.id,owned.level))} G<br><small>성공 ${SUCCESS[owned.level]}%</small>`,'race-enhance',id,owned.level===10)}
    ${button(owned.mods===3?'개조 완료':`개조 · 재료 ${modCost(owned.mods)}개<br><small>효과 ×2</small>`,'race-modify',id,owned.mods===3)}
  </div>`:`<div class="race-actions">${button(tier>unlockedLeague(s)?'레이스 등급 개방 후 구매':`구매 및 장착 · ${fmt(partPrice(tier,part.id))} G`,'race-buy',id,tier>unlockedLeague(s),'primary')}</div>`}</article>`;
 }).join('')}
 <p class="race-tip">강화에 실패하면 강화비가 차감되고 강화 단계는 유지돼요. 개조는 부위별 재료를 쓰며 3회까지 할 수 있어요.</p>`;
}

function confirmHTML(s,tier){
 const league=LEAGUES[tier];
 return `<div class="race-entry">${boatArt(s.boat)}<h3>${BOATS[s.boat].name}</h3><p>참가비 <b>${fmt(league.fee)} G</b> · 보유 ${fmt(s.coins)} G</p>
 <p>가속 버튼을 누른 채 좌우로 조향하세요. 부스트와 가속은 함께 누를 수 있어요. 기권하면 참가비는 소진돼요.</p>
 <p class="race-tip">키보드 · 방향키 또는 WASD · 스페이스 부스트<br>출발 1초 전에 부스트를 누르면 출발 가속을 얻어요.</p>
 ${button('참가비 결제 및 출발','race-start',tier,s.coins<league.fee||s.debt>0,'primary')}${button('대회 목록','race')}</div>`;
}

function liveHTML(r){
 return `<section class="race-live">
 <div class="race-instruments"><b id="raceRank">—</b><b id="raceSpeed">0 km/h</b><span id="raceTime">0.00초</span></div>
 <div class="race-viewport"><canvas width="420" height="470" aria-label="조선생 팀의 경주 수로"></canvas><div id="raceCue" class="race-cue">3</div></div>
 <div class="race-meters"><label>진행 <progress id="raceProgress" max="${r.course.length}" value="0"></progress></label><label>부스트 <progress id="raceEnergy" max="100" value="65"></progress></label></div>
 <div class="race-controls"><div><button data-drive="left" aria-label="왼쪽 조향">◀</button><button data-drive="right" aria-label="오른쪽 조향">▶</button></div><div><button data-drive="brake">브레이크</button><button data-drive="boost">부스트</button><button data-drive="throttle">가속</button></div></div>
 <p class="race-keyboard">방향키 / WASD · 스페이스 부스트</p>
 </section>`;
}

function resultHTML(r,result){
 const {order,rank,prize,bait,timedOut,unlocked}=result;
 const podium=[order[1],order[0],order[2]];
 return `<section class="race-results">
 <div class="race-podium">${podium.map((team,i)=>`<div class="race-podium-${i}"><span>${['🥈','🏆','🥉'][i]}</span><b>${team.name}</b></div>`).join('')}</div>
 <p class="race-payout"><b>${timedOut?'시간 초과':rank+'위 완주 · '+time(r.player.finish)}</b><br>상금 ${fmt(prize)} G${bait?` · 월척 미끼 +${bait}개`:''}</p>
 ${unlocked?`<p class="race-unlocked">${LEAGUES[r.tier+1].name} 대회가 열렸어요!</p>`:''}
 <ol class="race-table">${order.map(team=>`<li class="${team===r.player?'race-your-team':''}"><span>${team.name}</span><small>${time(team.finish)}</small></li>`).join('')}</ol>
 <div class="race-menu">${button('다시 도전','race-confirm',r.tier,false,'primary')}${button('대회 목록','race')}</div>
 </section>`;
}

function drawRace(ctx,r){
 const {course:c,player:p}=r,{width:w,height:h}=ctx.canvas,base=h*.76,scale=.77,lookAhead=base/scale,half=c.width/2;
 const cameraX=courseCenter(c,p.at);
 const sx=x=>w/2+(x-cameraX)*1.57;
 const sy=at=>base-(at-p.at)*scale;
 const from=Math.max(0,p.at-(h-base)/scale),to=Math.min(c.length+90,p.at+lookAhead);
 const sample=Array.from({length:27},(_,i)=>from+(to-from)*i/26);
 ctx.clearRect(0,0,w,h);
 ctx.fillStyle=c.color;
 ctx.globalAlpha=.87;
 for(const sign of [-1,1]){
  ctx.beginPath();
  ctx.moveTo(sign<0?0:w,sy(sample[0]));
  for(const at of sample)ctx.lineTo(sx(courseCenter(c,at)+sign*half),sy(at));
  ctx.lineTo(sign<0?0:w,sy(sample.at(-1)));
  ctx.closePath();
  ctx.fill();
 }
 ctx.globalAlpha=1;
 for(const sign of [-1,1]){
  ctx.beginPath();
  for(const at of sample)ctx.lineTo(sx(courseCenter(c,at)+sign*half),sy(at));
  ctx.strokeStyle='#c9f5e6';
  ctx.lineWidth=2;
  ctx.setLineDash([7,10]);
  ctx.stroke();
 }
 ctx.setLineDash([]);
 for(const area of c.braking){
  if(area.end<from||area.start>to)continue;
  for(let at=Math.max(area.start,from);at<Math.min(area.end,to);at+=9){
   ctx.fillStyle='#fd765d95';
   ctx.fillRect(sx(courseCenter(c,at)-half*.85),sy(at),half*1.57*1.7,4);
  }
 }
 ctx.beginPath();
 for(const at of sample)ctx.lineTo(sx(courseCenter(c,at)),sy(at));
 ctx.strokeStyle='#fffbd7a8';ctx.lineWidth=2;ctx.setLineDash([3,10]);ctx.stroke();ctx.setLineDash([]);
 for(let at=Math.ceil(from/90)*90;at<to;at+=90){
  const y=sy(at),mid=courseCenter(c,at);
  for(const sign of [-1,1]){
   const x=sx(mid+sign*half);
   ctx.fillStyle=sign<0?'#ffa96c':'#ffffcf';
   ctx.beginPath();ctx.arc(x,y,3.3,0,Math.PI*2);ctx.fill();
  }
 }
 if(c.length>from&&c.length<to){
  const mid=courseCenter(c,c.length),step=c.width*1.57/14,y=sy(c.length);
  for(let i=0;i<28;i++){
   ctx.fillStyle=(i+Math.floor(i/14))%2?'#102f39':'#edfdf7';
   ctx.fillRect(sx(mid-half)+(i%14)*step,y+Math.floor(i/14)*6,step+.4,6);
  }
 }
 for(const g of c.gates){
  if(g.at<from||g.at>to||r.gates.has(g))continue;
  const y=sy(g.at);
  ctx.fillStyle='#9fffa9';
  ctx.strokeStyle='#d4ffcc';
  ctx.lineWidth=2;
  ctx.beginPath();
  ctx.moveTo(sx(g.x-g.radius),y);ctx.lineTo(sx(g.x+g.radius),y);ctx.stroke();
  for(const side of [-1,1]){
   ctx.beginPath();ctx.arc(sx(g.x+side*g.radius),y,4.5,0,Math.PI*2);ctx.fill();
  }
  ctx.beginPath();
  ctx.moveTo(sx(g.x)-7,y+6);ctx.lineTo(sx(g.x),y-7);ctx.lineTo(sx(g.x)+7,y+6);ctx.stroke();
 }
 for(const hazard of c.hazards){
  if(hazard.at<from||hazard.at>to)continue;
  const x=sx(hazard.x),y=sy(hazard.at);
  ctx.fillStyle='#9aafb5';ctx.strokeStyle='#384e57';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(x-hazard.radius,y+7);ctx.lineTo(x-hazard.radius*.55,y-8);
  ctx.lineTo(x+1,y-13);ctx.lineTo(x+hazard.radius*.7,y-6);ctx.lineTo(x+hazard.radius,y+7);
  ctx.lineTo(x+hazard.radius*.3,y+13);ctx.closePath();ctx.fill();ctx.stroke();
 }
 for(const [i,team] of [...r.teams,p].entries()){
  if(sy(team.at)<-25||sy(team.at)>h+20)continue;
  const self=team===p,x=sx(team.x),y=sy(team.at),k=self?1.14:.9;
  ctx.save();ctx.translate(x,y);ctx.scale(k,k);ctx.rotate(self?p.side*.003:0);
  if(r.countdown===0&&(self?p.speed>8:true)){
   ctx.fillStyle=self&&p.boosting?'#a3fcffb8':'#e5fbf485';
   ctx.beginPath();ctx.moveTo(-7,7);ctx.lineTo(-18,self&&p.boosting?40:29);ctx.lineTo(0,25);ctx.lineTo(18,29);ctx.lineTo(7,7);ctx.fill();
   if(self&&p.boosting){
    ctx.fillStyle='#f1ffffc8';
    for(let j=0;j<6;j++){
     const y=14+(r.time*54+j*6)%38;
     ctx.beginPath();ctx.arc((j%2===0?1:-1)*(7+y*.18),y,1.5+j%3,0,Math.PI*2);ctx.fill();
    }
   }
  }
  const sprite=boatSprites[self?r.boatSprite:i%3];
  if(sprite.complete&&sprite.naturalWidth){
   const height=36,width=height*sprite.naturalWidth/sprite.naturalHeight;
   ctx.drawImage(sprite,-width/2,-height/2,width,height);
  }else{
  ctx.fillStyle=team.color;ctx.strokeStyle='#153d47';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(0,-16);ctx.quadraticCurveTo(-13,-9,-10,10);ctx.lineTo(-6,15);
  ctx.lineTo(6,15);ctx.lineTo(10,10);ctx.quadraticCurveTo(13,-9,0,-16);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#17454f';ctx.fillRect(-5,-4,10,7);
  ctx.fillStyle='#fff9ce';ctx.fillRect(-4,5,8,4);
  }
  if(self){ctx.fillStyle='#f9ffef';ctx.beginPath();ctx.moveTo(-5,-22);ctx.lineTo(5,-22);ctx.lineTo(0,-17);ctx.fill();}
  ctx.restore();
 }
}

const DRIVE_KEYS={ArrowUp:'throttle',w:'throttle',ArrowDown:'brake',s:'brake',ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right',' ':'boost'};

export function createRaceUI({getState,body,modal,show,save,render,toast,spend,credit,canRace,sound,buzz}){
 let live=null,tier=0,slot=PARTS[0].id;
 const reset=()=>{if(live){live.abort();live=null;}};
 modal.addEventListener('close',()=>{if(!modal.open)reset();});
 modal.addEventListener('cancel',reset);
 const showRace=(title,html,panel)=>{reset();show(title,html,panel);render();};
 function open(name){
  if(name==='race')showRace('물결항 레이스 접수처',lobby(getState()),name);
  else showRace('레이싱 부품점',shop(getState(),tier,slot),name);
 }
 function drive(r){
  boatSprites??=Array.from({length:3},(_,i)=>{
   const image=new Image();
   image.src='assets/race-parts/boat-'+i+'.webp';
   return image;
  });
  r.boatSprite=Math.min(2,Math.floor(getState().boat/7));
  showRace(LEAGUES[r.tier].name+' · '+r.course.name,liveHTML(r),'race-live');
  const ctrl=new AbortController();
  live=ctrl;
  const canvas=body.querySelector('canvas'),ctx=canvas.getContext('2d');
  const stage=canvas.closest('.race-live'),cue=stage.querySelector('#raceCue');
  const close=modal.querySelector('#closeModal');
  const closeLabel=close.getAttribute('aria-label');
  close.setAttribute('aria-label','레이스 기권 및 닫기');
  const keyboard=new Set(),pointers=new Map();
  let frame=0,last=0;
  const refresh=()=>stage.querySelectorAll('[data-drive]').forEach(el=>{
   const down=[...pointers.values(),...[...keyboard].map(key=>DRIVE_KEYS[key])].includes(el.dataset.drive);
   el.classList.toggle('pressed',down);
  });
  const clear=()=>{keyboard.clear();pointers.clear();refresh();last=0;};
  const listen=(el,event,fn)=>el.addEventListener(event,fn,{signal:ctrl.signal});
  ctrl.signal.addEventListener('abort',()=>{cancelAnimationFrame(frame);close.setAttribute('aria-label',closeLabel);});
  listen(window,'blur',clear);
  listen(document,'visibilitychange',clear);
  for(const type of ['keydown','keyup'])listen(window,type,e=>{
   const key=e.key.length===1?e.key.toLowerCase():e.key;
   if(!DRIVE_KEYS[key])return;
   e.preventDefault();
   if(e.type==='keydown')keyboard.add(key);
   else keyboard.delete(key);
   refresh();
  });
  for(const button of stage.querySelectorAll('[data-drive]')){
   listen(button,'pointerdown',e=>{
    e.preventDefault();button.setPointerCapture(e.pointerId);pointers.set(e.pointerId,button.dataset.drive);refresh();
   });
   for(const event of ['pointerup','pointercancel','lostpointercapture'])listen(button,event,e=>{pointers.delete(e.pointerId);refresh();});
  }
  function tick(now){
   if(!modal.open||!stage.isConnected){reset();return;}
   const dt=last?(now-last)/1000:0;
   last=now;
   const held=[...pointers.values(),...[...keyboard].map(key=>DRIVE_KEYS[key])];
   if(!document.hidden)stepRace(r,dt,Object.fromEntries(held.map(key=>[key,true])));
   drawRace(ctx,r);
   const order=raceOrder(r);
   stage.querySelector('#raceRank').textContent=`${order.indexOf(r.player)+1} / ${order.length}위`;
   const speed=stage.querySelector('#raceSpeed');
   speed.textContent=Math.round(r.player.speed*.54)+' km/h';
   const brake=r.course.braking.some(area=>area.start-17<=r.player.at&&r.player.at<area.end)&&r.player.speed>r.stats.speed*.68;
   speed.classList.toggle('race-slow',brake);
   stage.querySelector('#raceTime').textContent=time(r.time);
   stage.querySelector('#raceProgress').value=r.player.at;
   stage.querySelector('#raceEnergy').value=r.player.energy;
   cue.textContent=r.countdown>0?Math.ceil(r.countdown):r.time<1?'출발!':r.player.impact>0?'바위 충돌':r.player.edge?'수로 이탈 · 감속':'';
   cue.hidden=!cue.textContent;
   if(!r.done){frame=requestAnimationFrame(tick);return;}
   const result=settleRace(getState(),r,credit);
   save();
   showRace(result.rank===1?'우승!':'레이스 결과',resultHTML(r,result),'race-result');
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
  const [grade,part,maker]=id.split(':');
  if(!LEAGUES[Number(grade)]||!PARTS.some(p=>p.id===part))return true;
  tier=Number(grade);slot=part;
  if(cmd!=='race-select'){
   const message=changeRacePart(s,{action:cmd.slice(5),tier,slot,maker},spend);
   if(message)toast(message);
   save();
  }
  open('race-shop');
  return true;
 }
 return {open,handle,reset};
}
