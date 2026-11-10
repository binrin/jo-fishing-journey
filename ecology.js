import {FISH} from './data.js';
// Relative encounter weights are game tuning, not measured catch probabilities.
export const PERIODS=[{id:'deep',name:'심야',start:0,end:4},{id:'dawn',name:'새벽',start:4,end:7},{id:'morning',name:'아침',start:7,end:11},{id:'day',name:'한낮',start:11,end:16},{id:'dusk',name:'해질녘',start:16,end:19},{id:'night',name:'밤',start:19,end:24}];
export function gameTime(s){const minutes=Math.floor(((s.seconds+s.dayOffset)/600*1440+360)%1440),hour=minutes/60,period=PERIODS.findIndex(p=>hour>=p.start&&hour<p.end);return {hour,period,name:PERIODS[period].name,label:`${String(Math.floor(hour)).padStart(2,'0')}:${String(minutes%60).padStart(2,'0')}`};}
export function waitUntil(s,hour){const now=gameTime(s).hour;const hours=(hour-now+24)%24;s.dayOffset+=(hours<.02?24:hours)*25;}
const profiles={dayBias:[.15,.7,1,1,.7,.15],day:[0,.65,1,1,.65,0],night:[1,.8,.15,.1,.8,1],twilight:[.3,1,.55,.25,1,.6],mixed:[1,1,1,1,1,1],deep:[1,.6,0,0,.6,1]};
const records={};
function add(ids,profile,note,url){for(const id of ids)records[id]={profile,note,url,kind:'실제 생태 참고'};}
add([7],'twilight','배스는 종일 섭식할 수 있지만 이른 아침과 늦은 오후에 더 활발합니다.','https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/largemouth-bass/');
add([28],'night','뱀장어의 금강 추적 조사에서 야간 활동이 우세했고 일부 주간 활동도 관찰됐습니다.','https://pmc.ncbi.nlm.nih.gov/articles/PMC7766186/');
add([3],'night','메기의 야행성 활동과 일주기 리듬이 실험에서 확인됐습니다.','https://zdw.zoology.or.jp/Abstract/10.34425/zs000608');
add([1],'night','미꾸라지는 야행성 경향이 있지만 성장 단계와 환경에 따라 낮에도 활동합니다.','https://www.nature.com/articles/s41598-026-44631-0');
add([12],'day','놀래기류는 주로 낮에 활동하고 밤에는 모래나 틈에서 쉽니다.','https://animaldiversity.org/accounts/Labridae/');
add([21],'deep','앵무조개는 밤에 비교적 얕은 수심으로 올라와 먹이를 찾습니다.','https://www.calacademy.org/explore-science/chambered-nautilus');
add([22],'deep','실라캔스는 낮에 동굴에서 쉬고 밤에 먹이를 찾습니다.','https://www.vims.edu/research/facilities/fishcollection/_archive/highlights/coelacanth.php');
add([52],'deep','메가마우스는 낮에 깊이 머물고 밤에 표층 가까이 올라옵니다.','https://museum.wa.gov.au/megamouth/what-is-megamouth/');
add([43],'dayBias','황다랑어는 시각을 이용하는 포식자로 주간 섭식이 우세합니다.','https://doi.org/10.3389/fmars.2021.664593');
add([51],'night','라이언피쉬는 저광량·야간 사냥 경향이 있으나 낮의 섭식도 관찰됩니다.','https://oceanservice.noaa.gov/facts/lionfish-facts.html');
add([19],'mixed','우럭의 낮·밤 활동 차이는 서식 환경에 따라 달라 일률적으로 제한하지 않습니다.','https://pmc.ncbi.nlm.nih.gov/articles/PMC4556453/');
add([35],'mixed','갈치의 섭식 시간은 크기·서식 조건에 따라 다르며, 낮밤 차이가 없었던 조사도 있습니다.','https://doi.org/10.1111/j.1444-2906.2006.01159.x');
add([6],'dayBias','산천어의 하천 관찰에서 주간 섭식이 보고됐습니다. 야간 전용 설정을 제거했습니다.','https://ephemeroptera-galactica.com/pubs/pub_m/pubmiyasakah2001p1229.pdf');
add([0],'dayBias','피라미는 낮의 활동·섭식이 보고된 어종으로 주간 출현 비중을 높였습니다.','https://www.jstage.jst.go.jp/article/aquaculturesci1953/53/4/53_4_349/_pdf');
add([2],'twilight','쏘가리 성어의 섭식 정점은 저녁과 새벽으로 보고됩니다.','https://www.researchgate.net/publication/315553964_A_Review_of_Research_Progress_of_Aquaculture_Biology_in_Spotted_Mandarin_Fish_Siniperca_scherzeri');
add([10,13],'dayBias','금붕어와 쥐치의 주간 섭식 리듬이 보고됐습니다. 환경에 따른 변화는 남겨 둡니다.','https://ir.kagoshima-u.ac.jp/records/10819');
add([8,25],'mixed','연어와 까치복은 해당 실험에서 뚜렷한 일주기 섭식 리듬이 관찰되지 않아 시간 제한을 두지 않았습니다.','https://ir.kagoshima-u.ac.jp/records/10819');
add([27],'day','세일핀탕은 주행성으로 기록된 어종입니다. 기존 밤 전용 설정을 수정했습니다.','https://www.fishbase.se/summary/Zebrasoma-veliferum.html');
export function ecology(f){if(records[f.id])return {...records[f.id],weights:profiles[records[f.id].profile]};
 if(f.id>=59||[45,46,53,58].includes(f.id)){
 const parent=/메기/.test(f.name)?3:/장어|곰치/.test(f.name)?28:/송어|열목어|곤들매기/.test(f.name)?6:/쏠배감펭/.test(f.name)?51:null;
 const profile=parent!=null?records[parent].profile:f.time==='night'?'night':f.time==='day'?'day':'mixed';
 return {profile,weights:profiles[profile],kind:'창작 어종',note:parent!=null?`${FISH[parent].name}의 활동 성향을 참고한 창작 설정입니다.`:'실재하지 않는 어종의 게임 설정입니다.',url:parent!=null?records[parent].url:null};}
 return {profile:'mixed',weights:profiles.mixed,kind:'시간대 자료 미확정',note:'종별 근거가 확인되지 않아 임의의 낮·밤 제한을 두지 않습니다. 전 시간대 출현은 게임의 임시 설정입니다.',url:null};}
export const activityWeight=(f,s)=>ecology(f).weights[gameTime(s).period];
export function scheduleLabel(f){const e=ecology(f),max=Math.max(...e.weights);return e.profile==='mixed'?'시간 제한 없음':PERIODS.filter((p,i)=>e.weights[i]===max).map(p=>`${p.name} ${String(p.start).padStart(2,'0')}–${String(p.end).padStart(2,'0')}시`).join(' · ');}
export function weightedFish(pool,s,rng=Math.random){let roll=rng()*pool.reduce((n,f)=>n+activityWeight(f,s),0);for(const f of pool){roll-=activityWeight(f,s);if(roll<0)return f;}return pool.at(-1);}
