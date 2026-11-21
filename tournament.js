import {FISH,REGIONS} from './data.js';
import {typicalLength} from './species-traits.js';
import {BOATS,REGION_LEVELS,playerLevel} from './progression.js';
import {fullyEquipped} from './equipment.js';

const DAY_SECONDS=600;
const YEAR_DAYS=365;
const MONTH_DAYS=[31,28,31,30,31,30,31,31,30,31,30,31];
export const TOURNAMENT_CASTS=3;

export const TOURNAMENTS=REGIONS.reduce((events,region,id)=>{
 const day=id*12;
 let month=0,monthDay=day+1;
 while(monthDay>MONTH_DAYS[month])monthDay-=MONTH_DAYS[month++];
 const fee=Math.round(region.bait*32/100)*100;
 events.push({id,day,date:`${month+1}월 ${monthDay}일`,grade:id+1,fee,payouts:[fee*1.8,fee*1.1,fee*.65].map(Math.round),bait:3+id*2});
 return events;
},[]);

// Active tournaments in older saves have already paid these entry fees.
const legacyFees=REGIONS.reduce((fees,region)=>{
 fees.push(Math.max((fees.at(-1)||0)+100,Math.round((region.boss_reward||region.bait*40)*.05/100)*100));
 return fees;
},[]);

const absoluteDay=s=>Math.floor((s.seconds+s.dayOffset+150)/DAY_SECONDS);
const tournamentYear=s=>Math.floor(absoluteDay(s)/YEAR_DAYS);
const distance=(day,event)=>(event.day-day%YEAR_DAYS+YEAR_DAYS)%YEAR_DAYS;
const alreadyEntered=(s,event)=>s.tournamentYears?.[event.id]===tournamentYear(s);
const canReach=(s,event)=>event.id<=s.unlocked&&event.id<=BOATS[s.boat].region&&playerLevel(s)>=REGION_LEVELS[event.id];
export const fishLength=(f,g,quality=1)=>Math.max(2,Math.round(typicalLength(f)*Math.cbrt([1.8,1,.55][g])*quality));
const number=n=>n.toLocaleString('ko-KR');
const regionName=id=>REGIONS[id].display||REGIONS[id].name;

export function tournamentEntryIssue(s,event,includeDate=true){
 if(!event)return '대회 정보를 확인해 주세요.';
 if(s.tournament)return '참가 중인 대회를 먼저 마쳐 주세요.';
 if(!canReach(s,event))return '지역을 개방하고 출항 가능한 배와 레벨을 준비해 주세요.';
 if(includeDate&&distance(absoluteDay(s),event)!==0)return '대회 당일에 참가할 수 있어요.';
 if(includeDate&&alreadyEntered(s,event))return '올해 이 지역 대회에 이미 참가했어요.';
 if(!fullyEquipped(s)||s.tackle<event.id)return `${event.grade}등급 이상의 낚시 장비 5부위를 장착해 주세요.`;
 if(s.hp<3)return '집에서 잠을 자고 체력을 회복해 주세요.';
 if(s.debt>0||s.coins<event.fee)return '참가비와 미끼 외상을 확인해 주세요.';
 return '';
}

export function waitForTournament(s,event){
 if(!event||tournamentEntryIssue(s,event,false))return false;
 const day=absoluteDay(s);
 const days=distance(day,event)||(alreadyEntered(s,event)?YEAR_DAYS:0);
 if(days>0)s.dayOffset+=(day+days)*DAY_SECONDS+100-(s.seconds+s.dayOffset);
 return true;
}

const NAMES=['새벽별','은빛물결','잔물결','파도소리','해오라기','돌고래','산바람','모래알','솔바람','반딧불','보름달','여울','물비늘','청물결','바다별','갈매기','무지개','한낮의 햇살','노을빛','등대지기'];

export function startTournament(s,event,spend,rng=Math.random){
 if(tournamentEntryIssue(s,event)||!spend(s,event.fee))return false;
 const pool=FISH.filter(f=>f.regions.includes(event.id)&&!f.boss&&!f.ornamental);
 const names=[...NAMES];
 const count=10+Math.floor(rng()*11);
 const bots=Array.from({length:count},()=>{
  const name=names.splice(Math.floor(rng()*names.length),1)[0];
  const ability=.50+rng()*.32;
  const sizes=Array.from({length:TOURNAMENT_CASTS},()=>{
   const fish=pool[Math.floor(rng()*pool.length)];
   return rng()<.2?0:fishLength(fish,rng()<.32?2:1,ability+rng()*.24);
  });
  return {name,size:Math.max(...sizes)};
 });
 s.tournamentYears??={};
 s.tournamentYears[event.id]=tournamentYear(s);
 s.tournament={id:event.id,bots,casts:[],pending:false,entryFee:event.fee};
 s.region=event.id;
 return true;
}

export function beginTournamentCast(s){
 if(!s.tournament||s.tournament.pending||s.tournament.casts.length>=TOURNAMENT_CASTS)return false;
 s.tournament.pending=true;
 return true;
}

export function contestCastResult(s,size=0){
 if(!s.tournament?.pending)return false;
 s.tournament.pending=false;
 s.tournament.casts.push(size);
 return true;
}

export function finishTournament(s,credit){
 const entry=s.tournament;
 if(!entry||entry.casts.length<TOURNAMENT_CASTS)return null;
 const latest=TOURNAMENTS[entry.id],legacyFee=legacyFees[entry.id];
 const event=entry.entryFee===latest.fee?latest:{...latest,fee:legacyFee,payouts:[9,5,2].map(multiplier=>legacyFee*multiplier)};
 const ranking=[...entry.bots,{name:'나',size:Math.max(...entry.casts),player:true}].sort((a,b)=>b.size-a.size);
 const place=1+ranking.findIndex(row=>row.player);
 const payout=ranking[place-1].size>0?(event.payouts[place-1]||0):0;
 const bait=payout&&place===1?event.bait:0;
 if(payout)credit(s,payout);
 if(bait)s.trophyBait=(s.trophyBait||0)+bait;
 s.tournament=null;
 return {event,ranking,place,payout,bait};
}

export function restoreTournament(s,raw){
 s.tournamentYears={};
 for(const event of TOURNAMENTS){
  const year=raw.tournamentYears?.[event.id];
  if(Number.isSafeInteger(year)&&year>=0&&year<=tournamentYear(s))s.tournamentYears[event.id]=year;
 }
 const saved=raw.tournament;
 s.tournament=null;
 if(!saved||saved.id!==s.region||s.tournamentYears[saved.id]==null||!Array.isArray(saved.casts)||saved.casts.length>TOURNAMENT_CASTS||saved.casts.some(size=>!Number.isSafeInteger(size)||size<0)||!Array.isArray(saved.bots)||saved.bots.length<10||saved.bots.length>20)return;
 const bots=saved.bots.filter(bot=>NAMES.includes(bot?.name)&&Number.isSafeInteger(bot.size)&&bot.size>=0).map(({name,size})=>({name,size}));
 if(bots.length!==saved.bots.length||new Set(bots.map(bot=>bot.name)).size!==bots.length)return;
 const entryFee=saved.entryFee===TOURNAMENTS[saved.id].fee?saved.entryFee:legacyFees[saved.id];
 s.tournament={id:saved.id,bots,casts:[...saved.casts],pending:Boolean(saved.pending)&&saved.casts.length<TOURNAMENT_CASTS,entryFee};
}

export function tournamentNotice(s){
 const day=absoluteDay(s);
 const remaining=event=>distance(day,event)||(alreadyEntered(s,event)?YEAR_DAYS:0);
 const next=TOURNAMENTS.filter(event=>canReach(s,event)).sort((a,b)=>remaining(a)-remaining(b))[0];
 const current=s.tournament;
 const headline=current?`${regionName(current.id)} · ${current.casts.length}/${TOURNAMENT_CASTS}회 완료`:
  next?`${remaining(next)===0?'오늘':next.date} · ${regionName(next.id)}`:'매년 30개 지역에서 열려요';
 return `<button class="secondary tournament-notice" data-do="tournament"><strong>🏆 지역 낚시대회</strong><small>${headline}</small></button>`;
}

export function tournamentPanel(s){
 const day=absoluteDay(s);
 const [month,date]=new Date(Date.UTC(2001,0,1+day%YEAR_DAYS)).toISOString().slice(5,10).split('-').map(Number);
 const current=s.tournament;
 return `<div class="notice"><b>현재 게임 날짜 ${month}월 ${date}일</b><br>참가자마다 세 번 캐스팅해 가장 긴 물고기 한 마리로 순위를 겨룹니다.</div>
 ${current?`<button class="primary" data-do="contest-resume">진행 중인 ${regionName(current.id)} 대회로 돌아가기</button>`:''}
 <div class="tournament-schedule">${TOURNAMENTS.map(event=>{
  const today=distance(day,event)===0;
  const entered=alreadyEntered(s,event);
  const issue=tournamentEntryIssue(s,event,false);
  return `<article class="tournament-event">
   <div><b>${regionName(event.id)}</b><span>${event.date}${today?' · 오늘':''}</span></div>
   <p>${event.grade}등급 장비 이상 · 참가비 ${number(event.fee)} G</p>
   <p>1위 ${number(event.payouts[0])} G + 월척미끼 ${event.bait}개<br>2위 ${number(event.payouts[1])} G · 3위 ${number(event.payouts[2])} G</p>
   ${current?'':issue?`<small>${issue}</small>`:today&&!entered?`<button class="primary" data-do="contest-enter" data-id="${event.id}">참가하기 · ${number(event.fee)} G</button>`:`<button class="secondary" data-do="contest-wait" data-id="${event.id}">${entered?'내년 대회':'대회 당일'}까지 기다리기</button>`}
  </article>`;
 }).join('')}</div>`;
}

export function tournamentResults({event,ranking,place,payout,bait}){
 const size=row=>row.size?`${row.size} cm`:'기록 없음';
 return `<div class="catch-heading"><h3>${regionName(event.id)} 낚시대회</h3><p>${ranking[place-1].size?`${ranking.length}명 중 ${place}위 · ${size(ranking[place-1])}`:'세 번의 낚시에서 포획 기록이 없어요.'}</p></div>
 <div class="tournament-podium" aria-label="상위 세 명">${ranking.slice(0,3).map((row,i)=>`<div class="podium-${i+1}${row.player?' my-place':''}"><span>${['🥇','🥈','🥉'][i]}</span><strong>${row.name}</strong><small>${size(row)}</small></div>`).join('')}</div>
 ${payout?`<p class="notice">상금 <b>${number(payout)} G</b>${bait?` · 월척미끼 <b>${bait}개</b>`:''}</p>`:''}
 <details><summary>전체 순위</summary><ol class="tournament-ranking">${ranking.map(row=>`<li${row.player?' class="my-place"':''}>${row.name} · ${size(row)}</li>`).join('')}</ol></details>
 <button class="primary" data-do="close">확인</button>`;
}

export function tournamentFloatLayout(count,target,rng=Math.random){
 const anglers=[{x:16,y:73},{x:84,y:73}];
 if(count>=14)anglers.push({x:24,y:58});
 if(count>=18)anglers.push({x:76,y:58});
 const schools=[
  {x:43,y:62,spread:4},{x:57,y:64,spread:4},
  {x:38,y:73,spread:5},{x:62,y:74,spread:5}
 ];
 const floats=Array.from({length:count},(_,i)=>{
  const school=schools[i%schools.length];
  const direction=school.x<50?-1:1;
  const side=i%2;
  const angler=(i%4<2?anglers[side+2]:null)||anglers[side];
  const x=school.x+(rng()-.5)*school.spread*2;
  const y=school.y+(rng()-.5)*6;
  const overlapsPlayer=Math.abs(x-target.x/10)<5&&Math.abs(y-target.y/10)<5;
  return {x:overlapsPlayer?target.x/10+direction*(5+rng()*2):x,y,angler};
 });
 return {anglers,floats};
}

export function createTournamentFloats(scene){
 const layer=document.createElement('div');
 layer.className='tournament-floats';
 layer.setAttribute('aria-hidden','true');
 scene.append(layer);
 return {
  cast(count,target){
   const {anglers,floats}=tournamentFloatLayout(count,target);
   const width=scene.clientWidth/100,height=scene.clientHeight/100;
   const boats=anglers.map(({x,y},i)=>{
    const boat=document.createElement('i');
    boat.className='tournament-angler';
    boat.style.left=`${x}%`;
    boat.style.top=`${y}%`;
    boat.style.setProperty('--facing',x<50?'1':'-1');
    boat.style.setProperty('--distance',y<65?'.74':'1');
    boat.style.animationDelay=`${120*i}ms`;
    return boat;
   });
   const dots=floats.map(({x,y,angler},i)=>{
    const dot=document.createElement('i');
    dot.className='tournament-bobber';
    dot.style.setProperty('--start-x',`${(angler.x-x)*width}px`);
    dot.style.setProperty('--start-y',`${(angler.y-y)*height-12}px`);
    dot.style.setProperty('--scale',String(.58+(y-57)*.022));
    dot.style.left=`${x}%`;
    dot.style.top=`${y}%`;
    dot.style.animationDelay=`${i*18+Math.random()*210}ms`;
    return dot;
   });
   layer.replaceChildren(...boats,...dots);
  },
  clear(){layer.replaceChildren();}
 };
}
