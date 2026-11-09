import {FISH,REGIONS} from './data.js';
import {BOATS,TACKLE,HOMES,SKILLS,BAITS,playerLevel,xpForLevel,availableSP,catchXP,skillRequiredLevel,boatForRegion,gearRequiredLevel,REGION_LEVELS} from './progression.js';
export const VERSION='2.1.2',TITLE='조선생의 낚시여행',SAVE_KEY='joseonsaeng-fishing-v1';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const STARTER=()=>({schema:3,coins:0,debt:0,region:0,unlocked:0,gear:Array(REGIONS.length).fill(0),counts:Array(REGIONS.length).fill(0),bosses:[],bag:[],homeFish:[],collection:{},records:{},aquarium:[],fame:0,caught:0,attempts:0,seconds:0,dayOffset:0,bait:'basic',pity:Array(REGIONS.length).fill(0),bagLevel:0,ended:false,tutorial:true,muted:false,haptics:true,stats:{earned:0,spent:0,failures:0},savedAt:Date.now(),xp:0,boat:0,ownedBoats:[0],boatLicense:0,tackle:0,tackleUpgrade:0,skills:{},equippedSkills:['strike','elastic','shock'],baitStock:Object.fromEntries(BAITS.map(b=>[b.id,b.id==='basic'?30:0])),home:0,hp:100,regionSpecies:{},trophies:Array(REGIONS.length).fill(0),legendTrophy:false});
export const region=s=>REGIONS[s.region];
export const capacity=s=>BOATS[s.boat].capacity;
export const maxHP=s=>100+(s.skills.vitality||0)*15+(s.skills.recovery||0)*5;
export const isNight=s=>Math.floor((s.seconds+s.dayOffset)/300)%2===1;
export const gearPrice=s=>TACKLE[s.tackle].upgrades[s.tackleUpgrade]||0;
export const baitPrice=(s,id)=>Math.max(1,Math.round(REGIONS[BOATS[s.boatLicense].region].bait*(BAITS.find(b=>b.id===id)?.factor||1)));
export function spend(s,n){if(!Number.isFinite(n)||n<0||s.coins<n||s.debt>0)return false;s.coins-=n;s.stats.spent+=n;return true;}
export function credit(s,n){n=Math.max(0,Math.round(n));s.stats.earned+=n;const debt=Math.min(s.debt,n);s.debt-=debt;s.coins+=n-debt;}
export function buyBait(s,id,n=10){if(!BAITS.some(b=>b.id===id&&playerLevel(s)>=(b.level||1))||!Number.isInteger(n)||n<1||n>100)return false;const fee=baitPrice(s,id)*n;if(!spend(s,fee))return false;s.baitStock[id]+=n;return true;}
export function emergencyBait(s){if(s.baitStock.basic>=3||s.coins>=baitPrice(s,'basic')*10)return false;const n=10,fee=baitPrice(s,'basic')*n;s.debt+=fee;s.stats.spent+=fee;s.baitStock.basic+=n;return true;}
export function chargeBait(s){if(s.baitStock[s.bait]<=0)return false;s.baitStock[s.bait]--;return true;}
export function upgradeGear(s){if(s.tackleUpgrade>=5||playerLevel(s)<gearRequiredLevel(s.tackle,s.tackleUpgrade+1)||!spend(s,gearPrice(s)))return false;s.tackleUpgrade++;return true;}
export function buyTackle(s){const next=TACKLE[s.tackle+1];if(!next||s.tackleUpgrade<5||playerLevel(s)<next.level||!spend(s,next.price))return false;credit(s,Math.round(TACKLE[s.tackle].total*.2));s.tackle++;s.tackleUpgrade=0;return true;}
export function buyBoat(s,id){const b=BOATS[id];if(!b||s.ownedBoats.includes(id)||id>s.boatLicense+1||playerLevel(s)<b.level||!spend(s,b.price))return false;s.ownedBoats.push(id);s.boatLicense=Math.max(s.boatLicense,id);return true;}
export function selectBoat(s,id){if(!s.ownedBoats.includes(id)||s.bag.length>BOATS[id].capacity)return false;s.boat=id;return true;}
export function sellBoat(s,id){if(id===0||!s.ownedBoats.includes(id))return false;const other=s.ownedBoats.filter(n=>n!==id).sort((a,b)=>b-a);if(s.boat===id){const replacement=other.find(n=>BOATS[n].capacity>=s.bag.length);if(replacement==null)return false;s.boat=replacement;}s.ownedBoats=other;credit(s,BOATS[id].resale);return true;}
export function surveyProgress(s,id=s.region){const species=(s.regionSpecies[id]||[]).length,trophies=s.trophies[id]||0,targetSpecies=id<10?0:3,targetTrophies=id<10?0:5;return {species,trophies,targetSpecies,targetTrophies,complete:species>=targetSpecies&&trophies>=targetTrophies};}
export function legendReady(s){return playerLevel(s)>=100&&s.boat===BOATS.length-1&&s.tackle===TACKLE.length-1&&s.tackleUpgrade===5&&REGIONS.slice(0,-1).every(r=>r.bossId==null||s.bosses.includes(r.bossId))&&s.counts[29]>=REGIONS[29].minimum_catches&&surveyProgress(s,29).complete;}
export function gate(s){const r=region(s),next=Math.min(REGIONS.length-1,s.region+1);return {gear:s.tackle>=s.region&&s.tackleUpgrade>=5,catches:s.counts[s.region]>=r.minimum_catches,boss:r.bossId==null||s.bosses.includes(r.bossId),boat:BOATS[s.boat].region>=next,level:playerLevel(s)>=(s.region===REGIONS.length-1?100:REGION_LEVELS[next]),survey:surveyProgress(s).complete};} 
export function travel(s,id){if(!Number.isInteger(id)||id<0||id>=REGIONS.length||id>BOATS[s.boat].region||playerLevel(s)<REGION_LEVELS[id]||s.hp<=0)return false;if(id<=s.unlocked){s.region=id;return true;}if(id!==s.unlocked+1||s.region!==s.unlocked||!Object.values(gate(s)).every(Boolean))return false;s.unlocked=id;s.region=id;return true;}
export function finish(s){if(s.region!==REGIONS.length-1||!s.legendTrophy||s.ended||!Object.values(gate(s)).every(Boolean))return false;s.ended=true;return true;}
export function sleep(s){s.hp=maxHP(s);s.dayOffset+=300;return s.hp;}
export function upgradeHome(s){const h=HOMES[s.home+1];if(!h||playerLevel(s)<h.level||!spend(s,h.price))return false;s.home++;return true;}
export function transferFish(s,uid,toHome){const from=toHome?s.bag:s.homeFish,to=toHome?s.homeFish:s.bag,max=toHome?HOMES[s.home].capacity:capacity(s);const i=from.findIndex(x=>x.uid===uid);if(i<0||to.length>=max)return false;to.push(from.splice(i,1)[0]);return true;}
export function learnSkill(s,id){const k=SKILLS.find(x=>x.id===id),rank=s.skills[id]||0;if(!k||rank>=k.max||playerLevel(s)<skillRequiredLevel(k,rank)||availableSP(s)<k.costs[rank])return false;s.skills[id]=rank+1;return true;}
export function equipSkill(s,id,slot){if(!Number.isInteger(slot)||slot<0||slot>2||!s.skills[id]||!SKILLS.some(k=>k.id===id&&k.type==='active'))return false;const old=s.equippedSkills.indexOf(id);if(old>=0)[s.equippedSkills[old],s.equippedSkills[slot]]=[s.equippedSkills[slot],s.equippedSkills[old]];else s.equippedSkills[slot]=id;return true;}
export function chooseFish(s,rng=Math.random,boss=false){
 const r=region(s);if(s.region>BOATS[s.boat].region)return null;
 if(boss){if(r.bossId==null||s.bosses.includes(r.bossId)||s.tackle<s.region||s.tackleUpgrade<2||s.counts[s.region]<r.minimum_catches)return null;const f=FISH[r.bossId];if(f.legendary&&!legendReady(s))return null;return f.time!=='any'&&f.night!==isNight(s)?null:f;}
 let pool=FISH.filter(f=>f.regions.includes(s.region)&&!f.boss&&(f.time==='any'||f.night===isNight(s)));
 const rareBait=s.bait==='golden'||s.bait==='pearl'||s.bait==='glow'&&isNight(s);if(rareBait){const rare=pool.filter(f=>f.ornamental);if(rare.length){const chance=s.bait==='pearl'?.1:s.bait==='glow'?.08:.04,limit=s.bait==='pearl'?20:s.bait==='glow'?30:60;s.pity[s.region]++;if(s.pity[s.region]>=limit||rng()<chance){s.pity[s.region]=0;return rare[Math.floor(rng()*rare.length)];}}}
 pool=pool.filter(f=>!f.ornamental);return pool[Math.min(pool.length-1,Math.floor(rng()*pool.length))];
}
export function fishGrade(f,rng=Math.random,chain=false,s=null){const valid=[2,1,0].filter(g=>f.hp[g]>0&&(g!==0||chain||![9,30,31,41,42,47,48,54].includes(f.id)));if((chain||s?.bait==='shrimp'&&rng()<.5)&&valid.includes(0))return 0;return valid[Math.min(valid.length-1,Math.floor(rng()*valid.length))];}
export function quote(s,f,g){if(f.boss)return Math.round(region(s).boss_reward*(1+(s.skills.economy||0)*.03));const pool=FISH.filter(x=>x.regions.includes(s.region)&&!x.boss&&!x.ornamental),avg=pool.reduce((sum,x)=>sum+x.prices.filter(v=>v>0).reduce((a,b)=>a+b,0)/x.prices.filter(v=>v>0).length,0)/pool.length;return Math.max(1,Math.round(region(s).value*clamp(f.prices[g]/avg,.45,2.1)*(1+(s.skills.economy||0)*.03)));}
export function addCatch(s,f,g,quality=1){if(s.bag.length>=capacity(s)||f.boss&&s.bosses.includes(f.id))return null;const entry={uid:Date.now().toString(36)+Math.random().toString(36).slice(2,9),id:f.id,grade:g,value:quote(s,f,g),xp:Math.round(catchXP(s.region,f,g)*(1+(s.skills.lore||0)*.05)*(s.bait==='pearl'?1.2:1)),region:s.region,boss:f.boss,size:Math.round((15+f.id*3)*(g===0?1.4:g===1?1:.65)*quality)};s.bag.push(entry);if(!f.boss){s.regionSpecies[s.region]=[...new Set([...(s.regionSpecies[s.region]||[]),f.id])];if(g===0)s.trophies[s.region]++;}if(f.legendary)s.legendTrophy=true;s.caught++;s.counts[s.region]++;s.fame+=f.boss?20:2;s.xp+=entry.xp;s.collection[f.id]=(s.collection[f.id]||0)+1;s.records[f.id]=Math.max(s.records[f.id]||0,entry.size);if(f.boss)s.bosses.push(f.id);return entry;}
export function sell(s,ids,method='normal',rng=Math.random){const wanted=new Set(ids),sold=s.bag.filter(x=>wanted.has(x.uid));if(!sold.length)return {gross:0,fee:0,net:0,count:0,success:false};const success=method!=='bold'||rng()<.68,mult=method==='discount'?.8:method==='bold'?(success?1.5:0):1,gross=Math.round(sold.reduce((a,f)=>a+f.value*(f.boss?1:mult),0)),fee=Math.min(gross,Math.round(sold.filter(x=>!x.boss).reduce((a,f)=>a+REGIONS[f.region].expense_on_sale,0)));s.bag=s.bag.filter(x=>!wanted.has(x.uid));credit(s,gross-fee);s.stats.spent+=fee;s.fame=Math.max(0,s.fame+(method==='discount'?2:success?1:-2)*sold.length);return {gross,fee,net:gross-fee,count:sold.length,success};}
function verifyFishArray(a,max){if(!Array.isArray(a)||a.length>max)throw Error('수족관 정보가 손상되었습니다.');return a.map(x=>{if(!x||!Number.isInteger(x.id)||!FISH[x.id]||![0,1,2].includes(x.grade)||!Number.isFinite(x.value)||x.value<0||!REGIONS[x.region]||typeof x.uid!=='string'||!Number.isFinite(x.size)||x.size<0)throw Error('물고기 정보가 손상되었습니다.');return {...x,boss:FISH[x.id].boss};});}
export function validateSave(raw){
 if(!raw||![1,2,3].includes(raw.schema))throw Error('지원하지 않는 저장 파일입니다.');const s=STARTER();
 for(const k of ['coins','debt','region','unlocked','fame','caught','attempts','seconds','dayOffset']){if(!Number.isFinite(raw[k])||raw[k]<0)throw Error('저장값이 손상되었습니다.');s[k]=raw[k];}if(!Number.isInteger(s.region)||!Number.isInteger(s.unlocked)||s.region>s.unlocked||s.unlocked>=REGIONS.length)throw Error('잘못된 지역 정보입니다.');
 for(const k of ['counts','pity']){if(!Array.isArray(raw[k])||![10,REGIONS.length].includes(raw[k].length)||raw[k].some(n=>!Number.isInteger(n)||n<0))throw Error('성장 정보가 손상되었습니다.');s[k]=Array.from({length:REGIONS.length},(_,i)=>raw[k][i]||0);}
 s.bag=verifyFishArray(raw.bag,BOATS.at(-1).capacity);for(const k of ['collection','records']){if(!raw[k]||typeof raw[k]!=='object'||Array.isArray(raw[k]))throw Error('도감 정보가 손상되었습니다.');for(const [id,n]of Object.entries(raw[k]))if(FISH[id]&&Number.isFinite(n)&&n>=0)s[k][id]=n;}
 s.bosses=[...new Set((Array.isArray(raw.bosses)?raw.bosses:[]).filter(id=>FISH[id]?.boss))];s.aquarium=[...new Set((Array.isArray(raw.aquarium)?raw.aquarium:[]).filter(id=>FISH[id]?.ornamental&&s.collection[id]))].slice(0,10);
 for(const k of ['ended','tutorial','muted','haptics'])s[k]=Boolean(raw[k]);s.bait=BAITS.some(b=>b.id===raw.bait)?raw.bait:'basic';if(raw.stats)for(const k of ['earned','spent','failures'])s.stats[k]=Math.max(0,Number(raw.stats[k])||0);
 if(raw.schema===1){const oldBag=Math.min(8,Math.max(0,Number(raw.bagLevel)||0));s.coins+=1500*(2**oldBag-1);s.boat=Math.max(s.unlocked,BOATS.find(b=>b.capacity>=s.bag.length)?.id||0);s.boatLicense=s.boat;s.ownedBoats=[...new Set([0,s.boat])];s.tackle=s.unlocked;s.tackleUpgrade=Math.min(5,Math.round((raw.gear?.[s.unlocked]||0)*5/3));s.xp=Math.max(s.caught*100,xpForLevel(Math.min(50,TACKLE[s.tackle].level+s.tackleUpgrade)));s.migrated=true;
 }else{
  for(const k of ['xp','boat','boatLicense','tackle','tackleUpgrade','home','hp']){if(!Number.isFinite(raw[k])||raw[k]<0)throw Error('새 성장 정보가 손상되었습니다.');s[k]=raw[k];}
  if(!BOATS[s.boat]||!BOATS[s.boatLicense]||!TACKLE[s.tackle]||!Number.isInteger(s.tackleUpgrade)||s.tackleUpgrade>5||!HOMES[s.home])throw Error('배와 집 정보가 손상되었습니다.');
  if(!Array.isArray(raw.ownedBoats)||!raw.ownedBoats.includes(0)||!raw.ownedBoats.includes(s.boat)||raw.ownedBoats.some(n=>!BOATS[n]||n>s.boatLicense))throw Error('소유 선박 정보가 손상되었습니다.');s.ownedBoats=[...new Set(raw.ownedBoats)];
  s.homeFish=verifyFishArray(raw.homeFish,HOMES.at(-1).capacity);for(const k of SKILLS){const n=raw.skills?.[k.id]||0;if(!Number.isInteger(n)||n<0||n>k.max)throw Error('스킬 정보가 손상되었습니다.');s.skills[k.id]=n;}
  const used=SKILLS.reduce((a,k)=>a+k.costs.slice(0,s.skills[k.id]).reduce((x,y)=>x+y,0),0);if(used>(playerLevel(s)-1)*2)throw Error('스킬 포인트가 맞지 않습니다.');
  if(!Array.isArray(raw.equippedSkills)||raw.equippedSkills.length!==3||new Set(raw.equippedSkills).size!==3||raw.equippedSkills.some(id=>!SKILLS.some(k=>k.id===id&&k.type==='active')))throw Error('장착 스킬이 올바르지 않습니다.');s.equippedSkills=[...raw.equippedSkills];
  for(const b of BAITS){const n=raw.baitStock?.[b.id];if(n==null&&raw.schema<3){s.baitStock[b.id]=0;continue;}if(!Number.isInteger(n)||n<0||n>1000000)throw Error('미끼 정보가 손상되었습니다.');s.baitStock[b.id]=n;}
 }
 s.regionSpecies={};for(const [key,ids]of Object.entries(raw.regionSpecies||{})){if(REGIONS[key]&&Array.isArray(ids))s.regionSpecies[key]=[...new Set(ids.filter(id=>FISH[id]&&!FISH[id].boss&&FISH[id].regions.includes(Number(key))))];}
 s.trophies=Array.from({length:REGIONS.length},(_,i)=>Number.isInteger(raw.trophies?.[i])&&raw.trophies[i]>=0?raw.trophies[i]:0);
 s.legendTrophy=Boolean(s.collection[239]);s.ended=s.ended&&s.legendTrophy;
 const ids=[...s.bag,...s.homeFish].map(x=>x.uid);if(new Set(ids).size!==ids.length||s.bag.length>capacity(s)||s.homeFish.length>HOMES[s.home].capacity)throw Error('수족관 용량 또는 중복 물고기를 확인하세요.');s.hp=clamp(s.hp,0,maxHP(s));return s;
}
export function makeFight(s,f,g,castQuality=1){const r=region(s);return {fish:f,grade:g,hp:100,hero:s.hp,heroMax:maxHP(s),tension:0,elapsed:0,direction:1,nextTurn:2.8,skill:.3,burst:0,phase:1,legendary:Boolean(f.legendary),castQuality,damageRate:100/(f.boss?r.boss_fight:r.fight),gearFactor:(.85+s.tackleUpgrade*.04+Math.max(-.3,(s.tackle-s.region)*.08))*(1+(s.skills.strength||0)*.08)*(s.bait==='squid'?1.15:1),skills:{...s.skills},equipped:[...s.equippedSkills],cooldowns:{},effects:{elastic:0,shock:0,grit:0,slow:0},shockDps:0,protected:s.caught<3,overload:0,done:null};}
export function fightStep(f,dt,input,rng=Math.random){if(f.done)return f;dt=clamp(dt,0,.1);f.elapsed+=dt;f.burst=Math.max(0,f.burst-dt);for(const k of Object.keys(f.cooldowns))f.cooldowns[k]=Math.max(0,f.cooldowns[k]-dt);for(const k of Object.keys(f.effects))f.effects[k]=Math.max(0,f.effects[k]-dt);if(f.effects.shock>0)f.hp-=f.shockDps*dt;if(f.effects.bleed>0)f.hp-=(12+6*(f.skills.bleed||0))/6*dt;
 f.nextTurn-=dt*(f.effects.slow>0?.45:1);if(f.nextTurn<=0){f.direction=rng()<.5?-1:1;f.nextTurn=(2.2+rng()*2)*({dart:.72,eel:.9,glide:1.3,crawl:1.4,float:1.5,predator:.8}[f.fish.motion]||1)/(f.legendary?1+(f.phase-1)*.18:1);if(f.fish.boss&&f.effects.slow<=0&&rng()<.4)f.burst=1.2;}
 const correct=input===-f.direction,pulling=input!==0,guard=f.effects.grit>0;
 if(pulling){if(f.effects.elastic<=0)f.tension+=(f.burst>0?27:13)*(f.legendary?1+(f.phase-1)*.12:1)*(1-(f.skills.knot||0)*.05)*dt;if(correct){f.hp-=f.damageRate*f.gearFactor*f.castQuality*(f.effects.surge>0?1+(f.skills.surge||0)*.3:1)*dt;if(!guard)f.hero-=.12*dt;f.skill+=dt/12*(1+(f.skills.reserve||0)*.05);}else{if(!guard)f.hero-=8*dt;if(f.effects.elastic<=0)f.tension+=6*dt;}}
 else f.tension-=25*dt;
 f.tension=clamp(f.tension,0,100);f.skill=clamp(f.skill,0,1);if(!f.legendary)f.phase=f.fish.boss?(f.hp<33?3:f.hp<66?2:1):1;if(f.tension>=99)f.overload+=dt;else f.overload=0;
 if(f.protected){f.hero=Math.max(25,f.hero);f.tension=Math.min(85,f.tension);f.overload=0;}if(f.hp<=0)resolveCatch(f);else if(f.hero<=0||f.overload>1.15){f.hero=Math.max(0,f.hero);f.done='lost';}return f;}
export function skill(f,id=f.equipped[0]){const n=f.skills[id]||0,cost=({strike:.6,slow:.8,surge:.7,cool:.5,bleed:.8,renewal:.8}[id]||1);if(!n||!f.equipped.includes(id)||f.skill+1e-6<cost||f.done||(f.cooldowns[id]||0)>0)return false;f.skill=Math.max(0,f.skill-cost);const duration=4+2*n;
 if(id==='strike'){f.hp-=7+5*n;f.cooldowns[id]=18;}
 if(id==='elastic'){f.effects.elastic=duration;f.cooldowns[id]=24;}
 if(id==='shock'){f.effects.shock=5;f.shockDps=(13+7*n)/5;f.cooldowns[id]=22;}
 if(id==='heal'){f.hero=Math.min(f.heroMax,f.hero+20+10*n);f.cooldowns[id]=25;}
 if(id==='slow'){f.effects.slow=duration;f.cooldowns[id]=24;}
 if(id==='grit'){f.effects.grit=duration;f.cooldowns[id]=28;}
 if(id==='surge'){f.effects.surge=6;f.cooldowns[id]=20;}
 if(id==='cool'){f.tension=Math.max(0,f.tension-10-10*n);f.cooldowns[id]=16;}
 if(id==='bleed'){f.effects.bleed=6;f.cooldowns[id]=22;}
 if(id==='renewal'){f.hero=Math.min(f.heroMax,f.hero+10+10*n);f.tension=Math.max(0,f.tension-15);f.cooldowns[id]=22;}
 if(id==='execute'){f.hp-=f.hp<30?10+10*n:4+4*n;f.cooldowns[id]=30;}
 if(f.hp<=0)resolveCatch(f);return true;}
export function critical(f){const p=f.elapsed%7;if(p<4.8||p>6.4||f.done)return false;f.hp=Math.max(0,f.hp-5-(f.skills.focus||0)*.7);f.tension=Math.max(0,f.tension-8);f.elapsed+=1.7;if(f.hp===0)resolveCatch(f);return true;}

function resolveCatch(f){if(f.legendary&&f.phase<3){f.phase++;f.hp=100;f.tension=Math.min(f.tension,40);f.effects={};f.burst=1.2;f.nextTurn=.8;}else{f.hp=0;f.done='caught';}}
export function resetSkills(s){s.skills={};s.hp=Math.min(s.hp,maxHP(s));return true;}
export const waitSeconds=(s,base=8.5)=>base*(1-(s.skills.lure||0)*.04)*(s.bait==='spinner'?.75:1);
