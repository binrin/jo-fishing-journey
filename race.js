import {normalizeNickname} from './nickname.js';

const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const integer=(n,max)=>Number.isInteger(n)?clamp(n,0,max):0;

export const LEAGUES=['초급','중급','상급','최상급','왕급','황제급'].map((name,id)=>({
 id,name,fee:[450,6000,55000,180000,450000,2200000][id],
 boat:[0,2,5,9,14,20][id],water:id*5,
 recommended:[0,3,4,5,6,7][id],bait:3+id*2
}));

export const PARTS=[
 {id:'hull',name:'선체',material:'비늘 복합판',description:'파도에서 속도를 유지해요.'},
 {id:'engine',name:'엔진',material:'어유 첨가제',description:'최고속도와 재가속을 높여요.'},
 {id:'propeller',name:'프로펠러',material:'어골 합금',description:'추진 효율과 최고속도를 높여요.'},
 {id:'rudder',name:'방향타',material:'지느러미 섬유',description:'선회 반응과 방향 전환을 높여요.'},
 {id:'booster',name:'부스터',material:'발광 어낭',description:'부스트 출력과 지속 시간을 늘려요.'}
];

export const MAKERS=[
 {id:'swift',name:'청해정밀',trait:'가속·속도 ↑ · 조향·안정 ↓',scale:1.16,speed:1.04,handling:.92,stability:.90,charge:.96},
 {id:'anchor',name:'해성조선',trait:'조향·안정 ↑ · 가속·속도 ↓',scale:1.04,speed:.97,handling:1.09,stability:1.13,charge:.98},
 {id:'current',name:'파도공방',trait:'부스트 효율 ↑ · 가속·안정 보통',scale:1,speed:1,handling:1,stability:1,charge:1.18}
];

const GRADES=LEAGUES.length;
export const SUCCESS=[98,96,91,85,78,70,62,54,46,37];
const makeRaceState=()=>({wins:Array(GRADES).fill(0),best:Array(GRADES).fill(null),attempts:0,
 materials:LEAGUES.map(()=>Object.fromEntries(PARTS.map(({id})=>[id,0]))),
 parts:Object.fromEntries(PARTS.map(({id})=>[id,{active:null,owned:{}}]))});

export const raceState=s=>s.race??=makeRaceState();
export function unlockedLeague(s){
 const next=raceState(s).wins.findIndex(n=>!n);
 return next<0?GRADES-1:next;
}
export const partKey=(tier,maker)=>tier+'-'+maker;

export function restoreRace(s,raw){
 const race=makeRaceState();
 for(const {id} of LEAGUES){
  if(id===0||race.wins[id-1]>0)race.wins[id]=integer(raw?.wins?.[id],1000000);
  const time=raw?.best?.[id];
  if((id===0||race.wins[id-1]>0)&&Number.isFinite(time)&&time>0&&time<=180)race.best[id]=time;
  for(const slot of PARTS)race.materials[id][slot.id]=integer(raw?.materials?.[id]?.[slot.id],1000000);
 }
 race.attempts=integer(raw?.attempts,1000000000);
 for(const {id} of PARTS){
  const source=raw?.parts?.[id],target=race.parts[id];
  for(const {id:tier} of LEAGUES)for(const m of MAKERS){
   const key=partKey(tier,m.id),value=source?.owned?.[key];
   if(value&&typeof value==='object')target.owned[key]={level:integer(value.level,10),mods:integer(value.mods,3)};
  }
  if(typeof source?.active==='string'&&Object.hasOwn(target.owned,source.active))target.active=source.active;
 }
 s.race=race;
}

export function raceMaterial(s,f,grade,region=s.region,automatic=false){
 if(automatic&&((s.stats.autoCaught||0)%4)!==0)return null;
 const race=raceState(s),tier=clamp(Math.floor(region/5),0,GRADES-1);
 const slot=PARTS[((automatic?(s.stats.autoCaught||0)/4:s.caught)+f.id+grade)%PARTS.length];
 const count=f.boss?5:grade===0?2:1;
 race.materials[tier][slot.id]=Math.min(1000000,race.materials[tier][slot.id]+count);
 return {name:LEAGUES[tier].name+' '+slot.material,count};
}

export const prizeFor=(tier,rank,firstWin=true)=>Math.round(LEAGUES[tier].fee*([firstWin?2.5:1.4,.9,.6][rank-1]??0));
export const raceBaitFor=tier=>LEAGUES[tier].bait;
export const partPrice=(tier,slot)=>Math.round(LEAGUES[tier].fee*(slot==='booster'?5.8:4));
export const upgradePrice=(tier,slot,level)=>Math.round(partPrice(tier,slot)*(.30+level*.125));
export const modCost=mods=>[5,10,20][mods];
export const modPrice=(tier,slot,mods)=>Math.round(partPrice(tier,slot)*[.6,1.2,2.4][mods]);
export const partEffect=(tier,maker,part)=>(1+tier*.30)*(1+part.level*.075)*2**part.mods*maker.scale;

export function changeRacePart(s,{action,slot,tier,maker},spend,rng=Math.random){
 const type=PARTS.find(p=>p.id===slot),brand=MAKERS.find(m=>m.id===maker),league=LEAGUES[tier];
 if(!type||!brand||!league||!Number.isInteger(tier))return '';
 const race=raceState(s),group=race.parts[slot],key=partKey(tier,maker),owned=group.owned[key];
 if(action==='buy'){
  if(owned||tier>unlockedLeague(s))return '';
  if(!spend(s,partPrice(tier,slot)))return '구매할 금화와 외상을 확인해 주세요.';
  group.owned[key]={level:0,mods:0};
  group.active=key;
  return type.name+' 구매 · 장착 완료';
 }
 if(!owned)return '';
 if(action==='equip'){
  group.active=key;
  return type.name+' 장착 완료';
 }
 if(action==='enhance'&&owned.level<10){
  if(!spend(s,upgradePrice(tier,slot,owned.level)))return '강화할 금화와 외상을 확인해 주세요.';
  if(rng()*100>=SUCCESS[owned.level])return '강화 실패 · 강화 단계 유지';
  owned.level++;
  return type.name+' 강화 성공 · +'+owned.level;
 }
 if(action==='modify'&&owned.mods<3){
  const cost=modCost(owned.mods);
  if(race.materials[tier][slot]<cost)return type.material+'이 부족해요.';
  if(!spend(s,modPrice(tier,slot,owned.mods)))return '개조할 금화와 외상을 확인해 주세요.';
  race.materials[tier][slot]-=cost;
  owned.mods++;
  return type.name+' 개조 '+owned.mods+'단계 · 효과 2배';
 }
 return '';
}

export function raceStats(s){
 const groups=raceState(s).parts;
 const value={speed:1,accel:1,handling:1,stability:1,boost:1,charge:1};
 for(const {id} of PARTS){
  const group=groups[id];
  if(!group.active)continue;
  const [tier,makerId]=group.active.split('-'),maker=MAKERS.find(m=>m.id===makerId);
  const effect=partEffect(Number(tier),maker,group.owned[group.active]);
  if(id==='hull'){value.stability+=effect*.13*maker.stability;value.handling+=effect*.014*maker.handling;}
  if(id==='engine'){value.speed+=effect*.041*maker.speed;value.accel+=effect*.095*maker.speed;}
  if(id==='propeller'){value.speed+=effect*.032*maker.speed;value.accel+=effect*.032;value.charge+=effect*.055*maker.charge;}
  if(id==='rudder'){value.handling+=effect*.10*maker.handling;value.stability+=effect*.034*maker.stability;}
  if(id==='booster'){value.boost+=effect*.085*maker.speed;value.charge+=effect*.12*maker.charge;}
  value.speed+=(maker.speed-1)*.10;
  value.handling+=(maker.handling-1)*.24;
  value.stability+=(maker.stability-1)*.27;
  value.charge+=(maker.charge-1)*.18;
 }
 const boat=LEAGUES.reduce((current,league,i)=>{
  if(s.boat<league.boat)return current;
  const next=LEAGUES[i+1]?.boat??24;
  return i+clamp((s.boat-league.boat)/(next-league.boat),0,.99)*.6;
 },0);
 value.speed=(112+boat*14)*value.speed;
 return value;
}

const VENUES=['물결항 방파제','솔바람 협수로','산호섬 순환로','등대 여울','은모래 만','별빛 수로'];
const WORDS=['은빛','들물','청록','물수리','여울','남풍','황새','노랑돛','수평선','동백','푸른달','윤슬','별바다','백파'];
const PALETTES=['#077c90','#12788b','#147e79','#146e91','#257f8c','#125d81'];

export function createCourse(tier,rng=Math.random){
 const length=3300+tier*230+Math.round(rng()*400);
 const venue=Math.floor(rng()*VENUES.length),color=PALETTES[venue],width=151-tier*3;
 const points=[{at:0,x:0},{at:220,x:0}];
 let direction=rng()<.5?-1:1;
 for(let at=430;at<length-175;at+=210+rng()*190){
  const x=direction*(28+rng()*(64+tier*6));
  points.push({at,x});
  if(rng()<.82)direction*=-1;
 }
 points.push({at:length-90,x:points.at(-1).x},{at:length,x:points.at(-1).x});
 const course={name:VENUES[venue],color,length,width,points,hazards:[],gates:[],braking:[]};
 for(let i=1;i<points.length-1;i++){
  const before=points[i-1],after=points[i];
  if(Math.abs(after.x-before.x)>102)course.braking.push({start:before.at+6,end:before.at+52});
 }
 for(let at=380;at<length-190;at+=190+rng()*195){
  const center=courseCenter(course,at);
  const offset=(rng()<.5?-1:1)*(29+rng()*57);
  course.hazards.push({at,x:center+offset,radius:12+rng()*8});
 }
 for(let at=570;at<length-180;at+=435+rng()*150){
  course.gates.push({at,x:courseCenter(course,at)+(rng()-.5)*76,radius:25});
 }
 return course;
}

export function courseCenter(course,at){
 const points=course.points;
 const index=points.findIndex(p=>p.at>=at);
 if(index<=0)return index<0?points.at(-1).x:0;
 const before=points[index-1],after=points[index],fraction=(at-before.at)/(after.at-before.at);
 return before.x+(after.x-before.x)*(.5-.5*Math.cos(Math.PI*fraction));
}

export function startRace(s,tier,spend,rng=Math.random){
 if(!Number.isInteger(tier)||!LEAGUES[tier]||tier>unlockedLeague(s)||!spend(s,LEAGUES[tier].fee))return null;
 raceState(s).attempts++;
 const course=createCourse(tier,rng),stats=raceStats(s);
 const count=10+Math.floor(rng()*6);
 const teams=Array.from({length:count-1},(_,i)=>{
  const variation=.97-i*.032+rng()*.013;
  const pace=(112+tier*14)*[1.04,1.32,1.43,1.54,1.64,1.75][tier]*variation;
  const gridX=[-22,22,-43,43,-61,61][i%6],row=Math.floor(i/6);
  return {name:WORDS[i]+' 팀',at:-3-row*16-(i%6)*1.4,x:gridX,gridX,pace,finish:null,
   color:'hsl('+((21+i*41)%360)+' 75% 67%)'};
 });
 const player={name:normalizeNickname(s.nickname)||'조선생 팀',at:0,x:0,speed:0,side:0,energy:65,impact:0,edge:false,finish:null,color:'#ffdf54'};
 return {course,stats,tier,teams,player,time:0,countdown:3,done:false,settled:false,hit:new Set(),gates:new Set()};
}

export function raceOrder(r){
 return [...r.teams,r.player].sort((a,b)=>(a.finish??Infinity)-(b.finish??Infinity)||b.at-a.at);
}

function finishBoat(boat,previous,length,t,dt){
 if(boat.at<length||boat.finish!==null)return;
 boat.finish=t-dt*(boat.at-length)/Math.max(.001,boat.at-previous);
 boat.at=length;
}

function advanceTeams(r,dt,t){
 for(const [i,team] of r.teams.entries()){
  if(team.finish!==null)continue;
  const previous=team.at,launch=Math.min(1,t*(.65+(i%4)*.08));
  const rhythm=1+Math.sin(t*.85+i*1.4)*.065;
  team.at+=team.pace*launch*rhythm*dt;
  const center=courseCenter(r.course,team.at);
  const passing=Math.min(1,t*.40)*Math.sin(team.at*.008+i*1.37)*((i%3)+1)*4;
  const lane=team.gridX*(1-Math.min(.28,t*.055))+passing;
  team.x=center+clamp(lane,-r.course.width/2+9,r.course.width/2-9);
  finishBoat(team,previous,r.course.length,t,dt);
 }
}

export function stepRace(r,dt,input){
 if(r.done)return;
 dt=clamp(dt,0,.05);
 if(r.countdown>0){
  if(input.boost&&!r.launchPressed)r.launchBoost=r.countdown<=1.05&&r.countdown>=.35;
  r.launchPressed=input.boost;
  r.countdown=Math.max(0,r.countdown-dt);
  return;
 }
 r.time+=dt;
 const {player:p,course:c,stats:s}=r;
 const boost=input.boost&&!input.brake&&p.energy>0&&(input.throttle||p.speed>s.speed*.5);
 p.energy=boost?Math.max(0,p.energy-dt*31/s.charge):Math.min(100,p.energy+dt*1.1*s.charge);
 const steering=Number(Boolean(input.right))-Number(Boolean(input.left));
 const wake=r.teams.find(team=>team.at>p.at+5&&team.at<p.at+47&&Math.abs(team.x-p.x)<16);
 const chop=wake?(p.x<wake.x?-1:1)*16/s.stability:0;
 const fastTurn=boost?1/Math.max(.92,s.handling*.79+.32):1;
 p.side+=(steering*110*s.handling*fastTurn*(input.brake?1.18:1)+chop-p.side)*Math.min(1,dt*(5+s.handling));
 const preceding=p.at;
 p.at+=p.speed*dt;
 p.x+=p.side*dt;
 const center=courseCenter(c,p.at);
 p.edge=Math.abs(p.x-center)>c.width/2-9;
 if(p.edge)p.x=clamp(p.x,center-c.width/2+8,center+c.width/2-8);
 const launch=r.launchBoost&&r.time<.9&&input.throttle&&!input.brake;
 const top=s.speed*(boost?1+.30*s.boost:launch?1.23:1)*(p.edge?.61:1)*(p.impact>0?.49:1);
 const target=input.brake?0:(input.throttle||boost?top:top*.21);
 const reaction=input.brake?3.7:target>p.speed?(input.throttle||boost?1.75*s.accel*(launch?1.8:1):.55):2.3;
 p.speed+=(target-p.speed)*Math.min(1,dt*reaction);
 p.impact=Math.max(0,p.impact-dt);
 p.boosting=boost||launch;
 for(const hazard of c.hazards){
  if(r.hit.has(hazard)||Math.abs(p.at-hazard.at)>16||Math.abs(p.x-hazard.x)>hazard.radius+6)continue;
  r.hit.add(hazard);
  p.impact=.85/s.stability;
  p.speed*=Math.max(.52,1-.38/s.stability);
 }
 for(const gate of c.gates){
  if(r.gates.has(gate)||preceding>gate.at||p.at<gate.at||Math.abs(p.x-gate.x)>=gate.radius)continue;
  r.gates.add(gate);
  p.energy=Math.min(100,p.energy+22);
 }
 advanceTeams(r,dt,r.time);
 finishBoat(p,preceding,c.length,r.time,dt);
 r.done=p.finish!==null||r.time>=115;
}

export function settleRace(s,r,credit){
 if(!r.done||r.settled)return null;
 r.settled=true;
 const race=raceState(s),timedOut=r.player.finish===null;
 // Complete the field while holding the player's finish time.
 for(let t=r.time+.05;r.teams.some(team=>team.finish===null)&&t<180;t+=.05)advanceTeams(r,.05,t);
 const order=raceOrder(r).filter(team=>team!==r.player);
 const rank=timedOut?r.teams.length+1:1+order.filter(team=>team.finish!==null&&team.finish<=r.player.finish).length;
 order.splice(rank-1,0,r.player);
 const firstWin=race.wins[r.tier]===0;
 const prize=timedOut?0:prizeFor(r.tier,rank,firstWin);
 const unlocked=rank===1&&firstWin&&r.tier<GRADES-1;
 const bait=rank===1?raceBaitFor(r.tier):0;
 if(!timedOut&&(race.best[r.tier]===null||r.player.finish<race.best[r.tier]))race.best[r.tier]=r.player.finish;
 if(rank===1){
  race.wins[r.tier]=Math.min(1000000,race.wins[r.tier]+1);
  s.trophyBait=Math.min(Number.MAX_SAFE_INTEGER,(s.trophyBait||0)+bait);
 }
 if(prize)credit(s,prize);
 return {rank,prize,bait,unlocked,timedOut,order};
}
