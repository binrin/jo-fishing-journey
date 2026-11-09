import {FISH,REGIONS} from './data.js';
export const VERSION='1.0.0', TITLE='조선생의 낚시여행';
export const SAVE_KEY='joseonsaeng-fishing-v1';
export const STARTER=()=>({schema:1,coins:0,debt:0,region:0,unlocked:0,gear:Array(10).fill(0),counts:Array(10).fill(0),bosses:[],bag:[],collection:{},records:{},aquarium:[],fame:0,caught:0,attempts:0,seconds:0,dayOffset:0,bait:'basic',pity:Array(10).fill(0),bagLevel:0,ended:false,tutorial:true,muted:false,haptics:true,stats:{earned:0,spent:0,failures:0},savedAt:Date.now()});
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const region=s=>REGIONS[s.region];
export const capacity=s=>24+s.bagLevel*12;
export const isNight=s=>Math.floor((s.seconds+s.dayOffset)/300)%2===1;
export const gearPrice=(s,r=s.region)=>{const stage=REGIONS[r], n=s.gear[r];return n===0?Math.round(stage.equipment*.15):n===1?Math.round(stage.equipment*.30):n===2?stage.equipment-Math.round(stage.equipment*.15)-Math.round(stage.equipment*.30):0;};
export function spend(s,n){if(!Number.isFinite(n)||n<0||s.coins<n||s.debt>0)return false;s.coins-=n;s.stats.spent+=n;return true;}
export function credit(s,n){n=Math.max(0,Math.round(n));s.stats.earned+=n;const paid=Math.min(s.debt,n);s.debt-=paid;s.coins+=n-paid;}
export function chargeBait(s){const fee=Math.round(region(s).bait);const paid=Math.min(s.coins,fee);s.coins-=paid;s.debt+=fee-paid;s.stats.spent+=fee;return fee;}
export function upgradeGear(s){if(s.gear[s.region]>=3)return false;const cost=gearPrice(s);if(!spend(s,cost))return false;s.gear[s.region]++;return true;}
export function gate(s){const r=region(s);return {gear:s.gear[s.region]>=3,catches:s.counts[s.region]>=r.minimum_catches,boss:r.bossId==null||s.bosses.includes(r.bossId),money:s.coins>=r.unlock&&s.debt===0};}
export function travel(s,id){if(!Number.isInteger(id)||id<0||id>9)return false;if(id<=s.unlocked){s.region=id;return true;}if(id!==s.unlocked+1||s.region!==s.unlocked)return false;const g=gate(s),r=region(s);if(!Object.values(g).every(Boolean)||!spend(s,r.unlock))return false;credit(s,Math.round(r.equipment*.2));s.unlocked=id;s.region=id;return true;}
export function finish(s){if(s.region!==9||s.ended||!Object.values(gate(s)).every(Boolean))return false;if(!spend(s,region(s).unlock))return false;s.ended=true;return true;}
export function chooseFish(s,rng=Math.random,boss=false){
 const r=region(s);if(boss){if(r.bossId==null||s.bosses.includes(r.bossId)||s.gear[s.region]<3||s.counts[s.region]<r.minimum_catches)return null;const bossFish=FISH[r.bossId];if(bossFish.time!=='any'&&bossFish.night!==isNight(s))return null;return bossFish;}
 let pool=FISH.filter(f=>f.regions.includes(s.region)&&!f.boss&&(f.time==='any'||(f.night===isNight(s))));
 if(s.bait==='golden'){const rare=pool.filter(f=>f.ornamental);s.pity[s.region]++;if(rare.length&&(s.pity[s.region]>=60||rng()<.04)){s.pity[s.region]=0;return rare[Math.floor(rng()*rare.length)];}}
 pool=pool.filter(f=>!f.ornamental);if(!pool.length)pool=FISH.filter(f=>f.regions.includes(s.region)&&!f.boss&&!f.ornamental);
 return pool[Math.min(pool.length-1,Math.floor(rng()*pool.length))];
}
export function fishGrade(f,rng=Math.random,chain=false){const valid=[2,1,0].filter(g=>f.hp[g]>0&&(g!==0||chain||![9,30,31,41,42,47,48,54].includes(f.id)));if(chain&&valid.includes(0))return 0;return valid[Math.min(valid.length-1,Math.floor(rng()*valid.length))];}
export function quote(s,f,g){if(f.boss)return region(s).boss_reward;const base=f.prices[g];const pool=FISH.filter(x=>x.regions.includes(s.region)&&!x.boss&&!x.ornamental);const avg=pool.reduce((sum,x)=>sum+x.prices.filter(v=>v>0).reduce((a,b)=>a+b,0)/x.prices.filter(v=>v>0).length,0)/pool.length;return Math.max(1,Math.round(region(s).value*clamp(base/avg,.45,2.1)));}
export function addCatch(s,f,g,quality=1){
 if(s.bag.length>=capacity(s))return null;if(f.boss&&s.bosses.includes(f.id))return null;
 const value=quote(s,f,g),entry={uid:Date.now().toString(36)+Math.random().toString(36).slice(2,7),id:f.id,grade:g,value,region:s.region,boss:f.boss,size:Math.round((15+f.id*3)*(g===0?1.4:g===1?1:.65)*quality)};
 s.bag.push(entry);s.caught++;s.counts[s.region]++;s.fame+=f.boss?20:2;s.collection[f.id]=(s.collection[f.id]||0)+1;s.records[f.id]=Math.max(s.records[f.id]||0,entry.size);if(f.boss)s.bosses.push(f.id);return entry;
}
export function sell(s,ids,method='normal',rng=Math.random){
 const accepted=new Set(ids), sold=s.bag.filter(x=>accepted.has(x.uid));if(!sold.length)return {gross:0,fee:0,net:0,count:0,success:false};
 const risky=method==='bold',success=!risky||rng()<.68;
 const mult=method==='discount'?.8:risky?(success?1.5:0):1;
 const gross=Math.round(sold.reduce((a,f)=>a+f.value*(f.boss?1:mult),0));
 const fee=Math.round(sold.filter(f=>!f.boss).reduce((a,f)=>a+REGIONS[f.region].expense_on_sale,0));
 s.bag=s.bag.filter(x=>!accepted.has(x.uid));credit(s,Math.max(0,gross-fee));s.stats.spent+=Math.min(gross,fee);
 s.fame=Math.max(0,s.fame+(method==='discount'?2:success?1:-2)*sold.length);
 return {gross,fee:Math.min(gross,fee),net:Math.max(0,gross-fee),count:sold.length,success};
}
export function validateSave(raw){
 if(!raw||raw.schema!==1)throw Error('지원하지 않는 저장 파일입니다.');const s=STARTER();
 for(const k of ['coins','debt','region','unlocked','fame','caught','attempts','seconds','dayOffset','bagLevel']){if(!Number.isFinite(raw[k])||raw[k]<0)throw Error('저장값이 손상되었습니다.');s[k]=raw[k];}
 if(!Number.isInteger(s.region)||!Number.isInteger(s.unlocked)||s.region>s.unlocked||s.unlocked>9||s.bagLevel>8)throw Error('잘못된 지역 정보입니다.');
 for(const k of ['gear','counts','pity']){if(!Array.isArray(raw[k])||raw[k].length!==10||raw[k].some(n=>!Number.isInteger(n)||n<0||(k==='gear'&&n>3)))throw Error('성장 정보가 손상되었습니다.');s[k]=[...raw[k]];}
 if(!Array.isArray(raw.bag)||raw.bag.length>120)throw Error('보관함 정보가 손상되었습니다.');
 s.bag=raw.bag.map(x=>{if(!x||!Number.isInteger(x.id)||!FISH[x.id]||![0,1,2].includes(x.grade)||!Number.isFinite(x.value)||x.value<0||!REGIONS[x.region]||typeof x.uid!=='string'||!Number.isFinite(x.size))throw Error('물고기 정보가 손상되었습니다.');return {...x,boss:FISH[x.id].boss};});
 if(new Set(s.bag.map(x=>x.uid)).size!==s.bag.length)throw Error('중복 물고기입니다.');
 for(const k of ['collection','records']){if(!raw[k]||typeof raw[k]!=='object')throw Error('도감 정보가 손상되었습니다.');s[k]={};for(const [id,n] of Object.entries(raw[k]))if(FISH[id]&&Number.isFinite(n)&&n>=0)s[k][id]=n;}
 s.bosses=[...new Set((raw.bosses||[]).filter(id=>FISH[id]?.boss))];s.aquarium=[...new Set((raw.aquarium||[]).filter(id=>FISH[id]?.ornamental&&s.collection[id]))].slice(0,10);
 for(const k of ['ended','tutorial','muted','haptics'])s[k]=Boolean(raw[k]);s.bait=['basic','golden','chain'].includes(raw.bait)?raw.bait:'basic';
 if(raw.stats)for(const k of ['earned','spent','failures'])s.stats[k]=Math.max(0,Number(raw.stats[k])||0);
 return s;
}
export function makeFight(s,f,g,castQuality=1){const r=region(s);return {fish:f,grade:g,hp:100,hero:100,tension:0,elapsed:0,direction:1,nextTurn:2.8,criticalAt:5,skill:0,burst:0,phase:1,castQuality,damageRate:100/(f.boss?r.boss_fight:r.fight),gearFactor:.82+s.gear[s.region]*.06,protected:s.caught<3,overload:0,done:null};}
export function fightStep(f,dt,input,rng=Math.random){
 if(f.done)return f;dt=clamp(dt,0,.1);f.elapsed+=dt;f.burst=Math.max(0,f.burst-dt);f.nextTurn-=dt;
 if(f.nextTurn<=0){f.direction=rng()<.5?-1:1;f.nextTurn=2.2+rng()*2.0;if(f.fish.boss&&rng()<.4)f.burst=1.2;}
 const correct=input===-f.direction,pulling=input!==0;
 if(pulling){f.tension+=(f.burst>0?27:13)*dt;if(correct){f.hp-=f.damageRate*f.gearFactor*f.castQuality*dt;f.hero-=.12*dt;f.skill+=dt/12;}else{f.hero-=8*dt;f.tension+=6*dt;}}
 else{f.tension-=25*dt;f.hero=Math.min(100,f.hero+1.5*dt);}
 f.tension=clamp(f.tension,0,100);f.skill=clamp(f.skill,0,1);f.phase=f.fish.boss?(f.hp<33?3:f.hp<66?2:1):1;
 if(f.tension>=99)f.overload+=dt;else f.overload=0;
 if(f.protected){f.hero=Math.max(25,f.hero);f.tension=Math.min(85,f.tension);f.overload=0;}
 if(f.hp<=0){f.hp=0;f.done='caught';}else if(f.hero<=0||f.overload>1.15){f.done='lost';}
 return f;
}
export function skill(f){if(f.skill<1||f.done)return false;f.skill=0;f.tension=Math.max(0,f.tension-45);f.hero=Math.min(100,f.hero+15);f.hp=Math.max(0,f.hp-7);if(f.hp===0)f.done='caught';return true;}
export function critical(f){const phase=f.elapsed%7;if(phase<4.8||phase>6.4||f.done)return false;f.hp=Math.max(0,f.hp-5);f.tension=Math.max(0,f.tension-8);f.elapsed+=1.7;if(f.hp===0)f.done='caught';return true;}
