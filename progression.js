// v2 design constants. These are new balancing values, not original APK timing.
import {extendProgression,REGION_LEVELS} from './expansion-config.js';
export const REGION_NAMES=['솔바람 개울','연꽃 물굽이','조개바위 포구','안개잠긴 협곡','에메랄드 초호','노을등대 해안','푸른산호 만','비취폭포 골','은빛파도 해','별잠든 심연'];
const VALUES=[200,400,700,1100,1800,2800,4200,6500,10000,15000];
export const TARGET_CATCHES=[60,130,210,300,400,520,650,800,960,1150];
export const STAGE_BUDGETS=TARGET_CATCHES.map((n,i)=>Math.round(n*VALUES[i]*.75));
const boatNames=['조각배','대나무 뗏목선','붉은돛 통통배','노란등대 예인선','산호 쌍동선','보랏빛 쾌속선','초록그물 트롤선','물레바퀴 유람선','심해 연구선','별바다 탐험범선'];
const hulls=['노와 작은 선상 수족관을 갖춘 첫 배','넓고 평평한 대나무 선체','삼각돛과 곡선 뱃머리가 있는 목선','둥근 선체와 짧은 굴뚝','두 선체를 잇는 넓은 갑판','낮고 긴 유선형 선체','대형 그물 장치와 작업 갑판','붉은 외륜과 이층 테라스','소나 돔과 심해 탐사 장비','세 개의 돛대와 대형 유리 수족관'];
export const BOATS=boatNames.map((name,id)=>({id,name,description:hulls[id],level:id===0?1:id*5,price:id===0?0:Math.round(STAGE_BUDGETS[id-1]*.35),resale:id===0?0:Math.round(STAGE_BUDGETS[id-1]*.35*.25),capacity:[20,28,38,50,65,82,104,130,160,200][id],region:id}));
const gearNames=['대나무 여행 세트','버들잎 민물 세트','청동빛 연안 세트','안개지기 강철 세트','산호빛 바다 세트','노을지기 숙련 세트','푸른물결 전문 세트','비취용 장인 세트','은빛심해 명인 세트','별바다 전설 세트'];
export const TACKLE=gearNames.map((name,id)=>{const total=Math.round(STAGE_BUDGETS[id]*(id===9?1:.65)),base=id===0?0:Math.round(total*.25);const weights=[.07,.10,.14,.19,.25];const upgrades=weights.map(w=>Math.round((total-base)*w/.75));upgrades[4]+=(total-base)-upgrades.reduce((a,b)=>a+b,0);return {id,name,level:id===0?1:id*5,price:base,total,upgrades};});
export const HOMES=[
 {name:'단칸방',price:0,capacity:20,level:1,description:'작은 이불과 탁상 수족관이 있는 첫 보금자리'},
 {name:'나무 오두막',price:8000,capacity:45,level:8,description:'햇살 드는 침대와 벽 옆 수족관'},
 {name:'햇살 주택',price:60000,capacity:90,level:16,description:'넓어진 거실과 허리 높이 수족관'},
 {name:'바닷가 별장',price:300000,capacity:160,level:25,description:'바다를 보며 쉬는 넓은 침실'},
 {name:'유리정원 저택',price:1200000,capacity:260,level:35,description:'정원과 대형 파노라마 수족관'},
 {name:'별바다 대저택',price:6000000,capacity:400,level:45,description:'웅장한 곡면 수족관이 있는 꿈의 집'}
];
export const SKILLS=[
 {id:'strength',name:'근력',type:'passive',max:5,level:2,costs:[1,1,2,2,3],description:'단계마다 당기는 힘 +8%. 항상 적용됩니다.'},
 {id:'vitality',name:'체력',type:'passive',max:5,level:2,costs:[1,1,2,2,3],description:'단계마다 최대 체력 +15. 잠자기로 새 최대치까지 회복해요.'},
 {id:'knot',name:'줄매듭',type:'passive',max:5,level:5,costs:[1,1,2,2,3],description:'단계마다 줄 긴장 증가량 −5%.'},
 {id:'focus',name:'집중',type:'passive',max:5,level:5,costs:[1,1,2,2,3],description:'단계마다 챔질 시간 +0.2초, 타이밍 공격 피해 +0.7%p.'},
 {id:'strike',name:'강타',type:'active',max:3,level:2,costs:[1,3,6],description:'입질 때 확실한 챔질. 전투 중에는 즉시 체력 12/17/22% 감소. MP 60% · 재사용 18초.'},
 {id:'elastic',name:'탄력',type:'active',max:3,level:7,costs:[1,3,6],description:'6/8/10초 동안 줄 긴장이 오르지 않아요. MP 100% · 재사용 24초.'},
 {id:'shock',name:'충격',type:'active',max:3,level:10,costs:[1,3,6],description:'전기 충격으로 5초 동안 물고기 체력 총 20/27/34% 감소. MP 100% · 재사용 22초.'},
 {id:'heal',name:'회복',type:'active',max:3,level:12,costs:[1,3,6],description:'내 체력을 30/40/50 회복해요. MP 100% · 재사용 25초.'},
 {id:'slow',name:'피로',type:'active',max:3,level:15,costs:[1,3,6],description:'6/8/10초 동안 방향 전환과 돌진을 늦춰요. MP 80% · 재사용 24초.'},
 {id:'grit',name:'근성',type:'active',max:3,level:20,costs:[1,3,6],description:'6/8/10초 동안 내 체력 피해를 막아요. MP 100% · 재사용 28초.'}
];
export const BAITS=[{id:'basic',name:'기본 미끼',factor:1,description:'이 지역의 일반 어종을 만나요.'},{id:'golden',name:'황금 미끼',factor:1.5,description:'맞는 낮·밤에 관상어 입질 확률 4%, 60번째 입질 보장.'},{id:'chain',name:'먹이사슬 채비',factor:1.2,description:'보관한 먹잇감 한 마리를 사용하면 해당 어종의 대형을 노려요.'}];
extendProgression(BOATS,TACKLE,HOMES,SKILLS,BAITS,STAGE_BUDGETS,TARGET_CATCHES);
export {REGION_LEVELS};
export const boatForRegion=id=>BOATS.find(b=>b.region>=id);
export const gearRequiredLevel=(tier,rank)=>Math.min(100,TACKLE[tier].level+rank);
export const MAX_LEVEL=100;
// Preserve levels 1–50 and existing saves. Later bands grow by 20%,
// pending calibration with the complete 350-hour region/economy simulation.
export const levelMultiplier=l=>l<=10?1:l<=20?2:l<=30?3:l<=40?4.5:l<=50?6.75:6.75*1.2**Math.ceil((l-50)/10);
export const xpToNext=l=>l>=MAX_LEVEL?0:Math.round((120+(l+1)*40)*levelMultiplier(l+1)*(l>=50?12:1));
const levelThresholds=[0,0];
for(let level=2;level<=MAX_LEVEL;level++)levelThresholds[level]=levelThresholds[level-1]+xpToNext(level-1);
export const xpForLevel=l=>levelThresholds[Math.max(1,Math.min(MAX_LEVEL,Math.floor(l)))];
export const catchXP=(regionId,fish,grade)=>Math.round((24+fish.hp[grade]*.10+(fish.id%7)*2)*(1+regionId*.18)*(fish.boss?3:fish.ornamental?1.5:1));
export function playerLevel(s){let level=1;while(level<MAX_LEVEL&&s.xp>=xpForLevel(level+1))level++;return level;}
// Advanced passive ranks give the new levels meaningful SP choices.
for(const skill of SKILLS.filter(k=>['strength','vitality','knot','focus'].includes(k.id))){
 skill.max=10;skill.costs=[1,1,2,2,3,3,4,5,6,7];
}
export const skillRequiredLevel=(skill,rank)=>skill.type==='passive'&&rank>=5?51+(rank-5)*10:skill.level+rank*3;
export function availableSP(s){const used=SKILLS.reduce((n,k)=>n+k.costs.slice(0,s.skills[k.id]||0).reduce((a,b)=>a+b,0),0);return Math.max(0,(playerLevel(s)-1)*2-used);}
