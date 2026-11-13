// v3.0 gameplay systems: bait matching, food buffs, reputation, luck and haggling.
import {FISH,REGIONS} from './data.js';
import {BOATS,BAITS,BAIT_FAMILIES,BAIT_TIERS,playerLevel} from './progression.js';
import {HABITAT,HABITAT_NAME} from './fish-additions.js';
export {HABITAT,HABITAT_NAME};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;

// ---------- bait families ----------
const HUNTERS=new Set(['쏘가리','꺽지','배스','가물치','산천어','연어','농어','삼치','갈치','청새치']);
const OFFSHORE_BIG=new Set(['황다랑어','방어','별상어','백상아리','돌고래','범고래','메가마우스','청새치']);
const DEFAULT_FAMILY={fresh:'worm',coastal:'shrimp',reef:'shrimp',offshore:'squid',deep:'glow',mythic:'glow'};
export const habitatOf=regionId=>HABITAT[regionId]||'coastal';
export function baitFamilyOf(f){
 if(!f)return 'worm';if(f.family)return f.family;
 const h=habitatOf(f.regions[0]);
 if(f.id<59){if(OFFSHORE_BIG.has(f.name))return 'squid';if(HUNTERS.has(f.name))return h==='offshore'?'squid':'lure';}
 else if(f.motion==='predator'&&(h==='fresh'||h==='coastal'||h==='reef'))return 'lure';
 return DEFAULT_FAMILY[h];
}
export const familyInfo=id=>BAIT_FAMILIES.find(f=>f.id===id)||{id,name:'먹이사슬 채비',icon:'🐟',fits:''};
export const baitInfo=id=>BAITS.find(b=>b.id===id)||BAITS[0];
const meanHP=f=>mean(f.hp.filter(v=>v>0));
const regionCache=new Map();
export function regionProfile(regionId){
 if(regionCache.has(regionId))return regionCache.get(regionId);
 const pool=FISH.filter(f=>f.regions.includes(regionId)&&!f.boss&&!f.ornamental);
 const counts={};for(const f of pool){const k=baitFamilyOf(f);counts[k]=(counts[k]||0)+1;}
 const recommended=Object.entries(counts).sort((a,b)=>b[1]-a[1]||(a[0]===DEFAULT_FAMILY[habitatOf(regionId)]?-1:1))[0]?.[0]||DEFAULT_FAMILY[habitatOf(regionId)];
 const big=new Set([...pool].sort((a,b)=>meanHP(b)-meanHP(a)).slice(0,2).map(f=>f.id));
 const avgHP=mean(pool.map(meanHP));
 const out={pool,counts,recommended,big,avgHP,habitat:habitatOf(regionId)};regionCache.set(regionId,out);return out;
}
export const isBigSpecies=(f,regionId)=>regionProfile(regionId).big.has(f.id);
// Catch weight multiplier from bait: the matching family attracts the species; the two biggest
// species of a spot mostly ignore the wrong bait.
export function baitWeight(f,s){
 const b=baitInfo(s.bait);if(!b||b.family==='chain'||f.ornamental)return 1;
 const match=baitFamilyOf(f)===b.family,big=isBigSpecies(f,s.region);
 return big?(match?1.6:.35):(match?1.8:1);
}
export function gradeOdds(f,s){
 const b=baitInfo(s?.bait);const t=BAIT_TIERS.find(x=>x.tier===b?.tier)||BAIT_TIERS[0];
 let [p0,p1,p2]=t.grades;if(b&&b.family!=='chain'&&baitFamilyOf(f)===b.family){p0+=.1;p2=Math.max(0,p2-.1);}
 return [p0,p1,p2];
}
export const baitQuality=s=>(BAIT_TIERS.find(x=>x.tier===baitInfo(s.bait)?.tier)||BAIT_TIERS[0]).quality;
export function recommendedBait(s,regionId=s.region){
 const fam=regionProfile(regionId).recommended,lvl=playerLevel(s);
 const owned=BAITS.filter(b=>b.family===fam&&lvl>=b.level).sort((a,b)=>b.tier-a.tier);
 return owned.find(b=>s.baitStock[b.id]>0)||owned[0]||BAITS.find(b=>b.id==='worm1');
}

// ---------- reputation ----------
export const REP_MIN=-100,REP_MAX=100;
export const repFactor=s=>clamp((s.rep||0)/100,-1,1);
export const repSaleMult=s=>1+.1*repFactor(s);
export const repPrice=(s,n)=>Math.max(0,Math.round(n*(1-.1*repFactor(s))));
export function addRep(s,n){s.rep=clamp((s.rep||0)+n,REP_MIN,REP_MAX);return s.rep;}
export function repLabel(s){const r=Math.round(s.rep||0);return r>=60?'존경받는 낚시꾼':r>=25?'믿을 만한 단골':r>-25?'평범한 손님':r>-60?'깐깐한 흥정꾼':'소문난 진상';}

// ---------- luck ----------
// Ornamental fish kept in the home aquarium give luck once per species; deeper spots give more.
export const luckOf=f=>f?.ornamental?1+Math.floor(Math.min(...f.regions)/2):0;
export function aquariumLuck(s){const seen=new Set();let n=0;for(const x of s.homeFish||[]){const f=FISH[x.id];if(f?.ornamental&&!seen.has(f.id)){seen.add(f.id);n+=luckOf(f);}}return n;}
export const luck=s=>aquariumLuck(s)+(mealBuff(s).luck||0);

// ---------- haggling ----------
export function haggleChances(s){const L=luck(s);return {great:Math.min(.08,.01+L*.00008),success:Math.min(.4,.1+L*.0004)};}
export function haggleRoll(s,rng=Math.random){const c=haggleChances(s),r=rng();return r<c.great?'great':r<c.great+c.success?'success':'fail';}
export const HAGGLE_MULT={great:3,success:2,fail:.5};

// ---------- food ----------
// heal: instant HP (Infinity = full). Buffs last `min` minutes of fishing play time; one meal at a time.
export const FOODS=[
 {id:'riceball',name:'주먹밥',icon:'🍙',level:1,cost:6,heal:30,min:0,buff:{},desc:'체력 30 회복'},
 {id:'gimbap',name:'김밥',icon:'🍱',level:4,cost:10,heal:60,min:10,buff:{wait:.05},desc:'체력 60 회복 · 입질 대기 −5%'},
 {id:'fishcake',name:'어묵탕',icon:'🍢',level:8,cost:14,heal:50,min:15,buff:{maxHp:15},desc:'체력 50 회복 · 최대 체력 +15'},
 {id:'ramen',name:'라면',icon:'🍜',level:12,cost:18,heal:30,min:15,buff:{power:.05},desc:'당기는 힘 +5%'},
 {id:'tteokbokki',name:'떡볶이',icon:'🌶️',level:18,cost:22,heal:30,min:15,buff:{tension:.08},desc:'줄 긴장 증가 −8%'},
 {id:'maeuntang',name:'매운탕',icon:'🍲',level:25,cost:30,heal:Infinity,min:20,buff:{power:.06},desc:'체력 전부 회복 · 당기는 힘 +6%'},
 {id:'eel',name:'장어구이',icon:'🍖',level:32,cost:40,heal:40,min:20,buff:{power:.1},desc:'당기는 힘 +10%'},
 {id:'hoedeop',name:'회덮밥',icon:'🥗',level:40,cost:48,heal:40,min:20,buff:{xp:.08},desc:'경험치 +8%'},
 {id:'abalone',name:'전복죽',icon:'🥣',level:48,cost:60,heal:Infinity,min:25,buff:{maxHp:40},desc:'체력 전부 회복 · 최대 체력 +40'},
 {id:'seafood',name:'해물찜',icon:'🦀',level:56,cost:70,heal:60,min:25,buff:{power:.08,tension:.08},desc:'당기는 힘 +8% · 줄 긴장 −8%'},
 {id:'galbi',name:'갈비찜',icon:'🥩',level:64,cost:90,heal:60,min:25,buff:{power:.14},desc:'당기는 힘 +14%'},
 {id:'samgye',name:'보양 삼계탕',icon:'🐔',level:72,cost:110,heal:Infinity,min:30,buff:{maxHp:60,power:.08},desc:'체력 전부 회복 · 최대 체력 +60 · 당기는 힘 +8%'},
 {id:'dragon',name:'용궁 해신탕',icon:'🐉',level:82,cost:140,heal:Infinity,min:30,buff:{power:.16,tension:.12},desc:'체력 전부 회복 · 당기는 힘 +16% · 줄 긴장 −12%'},
 {id:'starlight',name:'별빛 정식',icon:'🌟',level:92,cost:180,heal:Infinity,min:30,buff:{power:.18,xp:.12,luck:20},desc:'체력 전부 회복 · 당기는 힘 +18% · 경험치 +12% · 행운 +20'}
];
export const foodInfo=id=>FOODS.find(f=>f.id===id);
const economyUnit=s=>REGIONS[BOATS[s.boatLicense]?.region??0]?.bait||16;
export const foodPrice=(s,food)=>repPrice(s,Math.round(food.cost*economyUnit(s)));
export function activeMeal(s){const m=s.meal;if(!m||!foodInfo(m.id)||!(m.until>s.seconds))return null;return {...foodInfo(m.id),left:m.until-s.seconds};}
export function mealBuff(s){return activeMeal(s)?.buff||{};}
export function buyFood(s,id,n=1,spend){const f=foodInfo(id);if(!f||!Number.isInteger(n)||n<1||n>20||playerLevel(s)<f.level)return false;if(!spend(s,foodPrice(s,f)*n))return false;s.foods=s.foods||{};s.foods[id]=(s.foods[id]||0)+n;return true;}
export function eatFood(s,id,maxHP){const f=foodInfo(id);if(!f||!(s.foods?.[id]>0))return false;s.foods[id]--;if(f.min>0)s.meal={id,until:s.seconds+f.min*60};else if(s.meal&&!activeMeal(s))s.meal=null;s.hp=Math.min(maxHP(s),s.hp+(f.heal===Infinity?Infinity:f.heal));return true;}
