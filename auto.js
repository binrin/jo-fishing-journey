// Auto fishing: runs on the wall clock until the current bait runs out, so it keeps going while the
// tab is hidden or the browser is closed (progress is settled when the game is opened again).
// Only ordinary fish bite (no trophies, bosses or ornamentals); every catch is sold on the spot
// for 25% of its price and gives 25% of its experience.
import {FISH} from './data.js';
import {chooseFish,fishGrade,quote,credit,waitSeconds,fightPlan} from './engine.js';
import {catchXP} from './progression.js';
export const AUTO_SALE=.25,AUTO_XP=.25,AUTO_SUCCESS=.9,AUTO_CAST=4,AUTO_RESULT=2;

export function autoRunning(s){return Boolean(s.auto&&s.auto.on);}
export function canStartAuto(s){
 if(autoRunning(s))return '이미 자동 낚시 중이에요.';
 if(!(s.baitStock[s.bait]>0))return '미끼가 없어요. 미끼를 사거나 다른 미끼를 골라 주세요.';
 return '';
}
export function startAuto(s,now=Date.now()){
 if(canStartAuto(s))return false;
 s.auto={on:true,since:now,last:now,acc:0,next:null,region:s.region,bait:s.bait,caught:0,missed:0,gold:0,xp:0,used:0,reason:'',seen:true};
 return true;
}
export function stopAuto(s,reason='stop'){if(!s.auto)return null;s.auto.on=false;s.auto.reason=reason;s.auto.next=null;s.auto.ended=Date.now();s.auto.seen=reason==='stop';return s.auto;}
// A run that ended by itself (bait ran out) whose result the player has not seen yet.
export function unseenAutoResult(s){return Boolean(s.auto&&!s.auto.on&&s.auto.seen===false);}

// An ordinary fish for auto fishing: re-roll ornamentals, never a trophy-size grade.
function ordinaryFish(s,rng){
 let f=null;for(let i=0;i<6&&(!f||f.ornamental||f.boss);i++)f=chooseFish(s,rng);
 if(!f||f.ornamental||f.boss){const pool=FISH.filter(x=>x.regions.includes(s.region)&&!x.boss&&!x.ornamental);f=pool[Math.floor(rng()*pool.length)];}
 if(!f)return null;
 let g=fishGrade(f,rng,false,s);if(g===0)g=f.hp[1]>0?1:2;if(!(f.hp[g]>0))g=[2,1].find(i=>f.hp[i]>0)??g;
 return {f,g};
}
export function autoAttemptSeconds(s,f,g){return AUTO_CAST+waitSeconds(s)+fightPlan(s,f,g).expected*.8+AUTO_RESULT;}
// Average seconds per fish at the current spot (for the estimate shown before starting).
export function autoPace(s){const pool=FISH.filter(x=>x.regions.includes(s.region)&&!x.boss&&!x.ornamental);if(!pool.length)return 60;
 return pool.reduce((a,f)=>a+autoAttemptSeconds(s,f,f.hp[1]>0?1:2),0)/pool.length;}

// Settle everything that happened between the last tick and `now`. Returns what this tick added.
export function autoTick(s,now=Date.now(),rng=Math.random){
 const a=s.auto,got={caught:0,missed:0,gold:0,xp:0,used:0,ids:{}};if(!a||!a.on)return got;
 a.acc+=Math.max(0,(now-a.last)/1000);a.last=now;
 for(let guard=0;guard<100000;guard++){
  if(!a.next){
   if(!(s.baitStock[s.bait]>0)){stopAuto(s,'bait');a.ended=now-a.acc*1000;break;}
   const pick=ordinaryFish(s,rng);if(!pick){stopAuto(s,'empty');a.ended=now-a.acc*1000;break;}
   s.baitStock[s.bait]--;a.used++;got.used++;
   a.next={id:pick.f.id,g:pick.g,dur:autoAttemptSeconds(s,pick.f,pick.g)};
  }
  if(a.acc<a.next.dur)break;
  a.acc-=a.next.dur;const f=FISH[a.next.id],g=a.next.g;a.next=null;
  if(rng()>AUTO_SUCCESS){a.missed++;got.missed++;continue;}
  const gold=Math.max(1,Math.round(quote(s,f,g)*AUTO_SALE)),xp=Math.max(1,Math.round(catchXP(s.region,f,g)*AUTO_XP));
  credit(s,gold);s.xp+=xp;s.collection[f.id]=(s.collection[f.id]||0)+1;s.stats.autoCaught=(s.stats.autoCaught||0)+1;
  a.caught++;a.gold+=gold;a.xp+=xp;got.caught++;got.gold+=gold;got.xp+=xp;got.ids[f.id]=(got.ids[f.id]||0)+1;
 }
 return got;
}
