// Auto fishing: runs on the wall clock until the current bait runs out, so it keeps going while the
// tab is hidden or the browser is closed (progress is settled when the game is opened again).
// Only ordinary fish bite (no trophies, bosses or ornamentals); every catch is sold on the spot
// for 25% of its price and gives 25% of its experience.
import {FISH} from './data.js';
import {chooseFish,fishGrade,quote,credit,waitSeconds,fightPlan,buyBait,baitPrice} from './engine.js';
import {catchXP,BAITS,playerLevel} from './progression.js';
import {luck,regionProfile} from './systems.js';
// Auto fishing uses the basic (first-grade) bait of the spot's recommended family, buying one at a time
// with coins when none is left. A run has no time limit: it lasts until the coins run out or it is stopped.
export function autoBait(s){const fam=regionProfile(s.region).recommended,b=BAITS.find(x=>x.id===fam+'1');return b&&playerLevel(s)>=(b.level||1)?b.id:'worm1';}
export const AUTO_SALE=.25,AUTO_XP=.25,AUTO_SUCCESS=.9,AUTO_CAST=4,AUTO_RESULT=2;
// Good reputation raises the sale share and experience (25% -> up to 40% at reputation 100);
// luck lets a trophy (월척) bite even on auto: 1% at luck 0 (the minimum), +0.03%p per luck, up to 10%.
export const AUTO_REP_BONUS=.15,AUTO_TROPHY_MIN=.01,AUTO_TROPHY_PER_LUCK=.0003,AUTO_TROPHY_MAX=.1;
export function autoRates(s){const r=Math.max(0,Math.min(100,s.rep||0))/100,L=Math.max(0,luck(s));
 return {sale:AUTO_SALE+AUTO_REP_BONUS*r,xp:AUTO_XP+AUTO_REP_BONUS*r,trophy:Math.min(AUTO_TROPHY_MAX,AUTO_TROPHY_MIN+L*AUTO_TROPHY_PER_LUCK),luck:L};}

export function autoRunning(s){return Boolean(s.auto&&s.auto.on);}
export function canStartAuto(s){
 if(autoRunning(s))return '이미 자동 낚시 중이에요.';
 const id=autoBait(s);if(!(s.baitStock[id]>0)&&(s.debt>0||s.coins<baitPrice(s,id)))return '일반 미끼를 살 금화가 없어요.';
 return '';
}
export function startAuto(s,now=Date.now()){
 if(canStartAuto(s))return false;
 s.auto={on:true,since:now,last:now,acc:0,ran:0,next:null,region:s.region,bait:autoBait(s),caught:0,missed:0,trophies:0,gold:0,xp:0,used:0,bought:0,spent:0,reason:'',seen:true};
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
 // Lucky trophy: only species that come in trophy size.
 if(f.hp[0]>0&&rng()<autoRates(s).trophy)g=0;
 return {f,g};
}
export function autoAttemptSeconds(s,f,g){return AUTO_CAST+waitSeconds(s)+fightPlan(s,f,g).expected*.8+AUTO_RESULT;}
// Average seconds per fish at the current spot (for the estimate shown before starting).
export function autoPace(s){const pool=FISH.filter(x=>x.regions.includes(s.region)&&!x.boss&&!x.ornamental);if(!pool.length)return 60;
 return pool.reduce((a,f)=>a+autoAttemptSeconds(s,f,f.hp[1]>0?1:2),0)/pool.length;}

// Settle everything that happened between the last tick and `now`. Returns what this tick added.
export function autoTick(s,now=Date.now(),rng=Math.random){
 const a=s.auto,got={caught:0,missed:0,trophies:0,gold:0,xp:0,used:0,bought:0,spent:0,ids:{}};if(!a||!a.on)return got;
 a.acc+=Math.max(0,(now-a.last)/1000);a.last=now;
 for(let guard=0;guard<100000;guard++){
  if(!a.next){
   const id=a.bait||autoBait(s);
   if(!(s.baitStock[id]>0)){const price=baitPrice(s,id);if(!buyBait(s,id,1)){stopAuto(s,'money');a.ended=now-a.acc*1000;break;}a.bought=(a.bought||0)+1;a.spent=(a.spent||0)+price;got.bought++;got.spent+=price;}
   const prev=s.bait;s.bait=id;const pick=ordinaryFish(s,rng);s.bait=prev;if(!pick){stopAuto(s,'empty');a.ended=now-a.acc*1000;break;}
   s.baitStock[id]--;a.used++;got.used++;
   a.next={id:pick.f.id,g:pick.g,dur:autoAttemptSeconds(s,pick.f,pick.g)};
  }
  if(a.acc<a.next.dur)break;
  a.acc-=a.next.dur;a.ran=(a.ran||0)+a.next.dur;const f=FISH[a.next.id],g=a.next.g;a.next=null;
  if(rng()>AUTO_SUCCESS){a.missed++;got.missed++;continue;}
  const rate=autoRates(s),gold=Math.max(1,Math.round(quote(s,f,g)*rate.sale)),xp=Math.max(1,Math.round(catchXP(s.region,f,g)*rate.xp));if(g===0){a.trophies=(a.trophies||0)+1;got.trophies++;}
  credit(s,gold);s.xp+=xp;s.collection[f.id]=(s.collection[f.id]||0)+1;s.stats.autoCaught=(s.stats.autoCaught||0)+1;
  a.caught++;a.gold+=gold;a.xp+=xp;got.caught++;got.gold+=gold;got.xp+=xp;got.ids[f.id]=(got.ids[f.id]||0)+1;
 }
 return got;
}
