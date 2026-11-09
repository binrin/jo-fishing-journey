// Original web-game expansion design; not extracted original game values.
export const REGION_LEVELS=[1,5,10,15,20,25,30,35,40,45,...Array.from({length:20},(_,i)=>50+Math.floor(i*45/19))];
export const BOAT_REACH=[0,1,2,3,4,5,6,7,8,9,10,11,12,14,15,16,18,19,20,22,23,24,26,27,29];
export function extendProgression(boats,tackle,homes,skills,baits,budgets,targets){
 const names=['유리바닥 탐사선','남풍 아웃리거','서리깨는 쇄빙선','쌍외륜 증기선','진홍 대어선','햇살 태양광선','바다거북 잠수정','달등불 누각선','만타 수중익선','황동 잠수종선','별관측 요트','수정 삼동선','분재 정원방주','천룡 선수 범선','백금 별빛방주'];
 const desc=['투명한 바닥으로 바닷속을 관찰하는 배','한쪽 보조 선체와 긴 돛을 가진 항해선','얼음을 가르는 두꺼운 철제 뱃머리','양쪽 외륜으로 움직이는 넓은 증기선','큰 고기잡이 장치를 갖춘 붉은 작업선','태양광 지붕과 두 선체를 가진 친환경 배','거북 등 모양의 연구용 잠수정','따스한 등불과 목조 누각을 얹은 배','날개 같은 수중익으로 물결 위를 달리는 배','황동 잠수종과 크레인이 달린 탐사선','천체 관측 돔이 있는 유선형 요트','세 개의 수정 선체가 물살을 나누는 배','분재 정원과 계단 갑판이 있는 거대한 방주','용 모양 선수와 청금빛 돛을 갖춘 범선','별빛 돛과 백금 선체를 갖춘 마지막 방주'];
 for(let r=10;r<30;r++){
  const value=Math.round(18000*1.16**(r-10));targets[r]=1100+(r-10)*65;
  budgets[r]=Math.round(targets[r]*value*.75*1.068);
  const total=Math.round(budgets[r]*(r===29?1:.65)),price=Math.round(total*.25),weights=[.07,.10,.14,.19,.25];
  const upgrades=weights.map(w=>Math.round(total*w));upgrades[4]+=total-price-upgrades.reduce((a,b)=>a+b,0);
  tackle.push({id:r,name:['유리물결','수련비늘','서리송곳','벚꽃물살','진홍암초','햇살모래','청록심해','달빛등불','폭풍날개','황동해구','별관측','자수정','만년빙하','분재바람','용비늘','백야산호','황금혜성','영원의물결','천해룡','아스트라'][r-10]+' 낚시 세트',level:REGION_LEVELS[r],price,total,upgrades});
 }
 for(let id=10;id<25;id++){
  const reach=BOAT_REACH[id],price=Math.round(budgets[Math.max(9,BOAT_REACH[id-1])]*.35);
  boats.push({id,name:names[id-10],description:desc[id-10],level:REGION_LEVELS[BOAT_REACH[id-1]+1],region:reach,price,resale:Math.round(price*.25),capacity:240+(id-10)*40});
 }
 ['산호빛 해변 저택','설원 통나무 별장','밀림 나무궁전','절벽 위 바다궁전','해저 관측 저택','별하늘 수족궁전'].forEach((name,i)=>homes.push({name,price:[18000000,50000000,120000000,260000000,500000000,900000000][i],capacity:[600,850,1200,1700,2400,3200][i],level:[52,60,68,76,86,96][i],description:['산호빛 창과 바다를 닮은 수조','눈 내리는 창가와 따뜻한 벽난로','나무 위 다리와 열대어 전시 수조','절벽 아래 바다를 내려다보는 대형 수조','바닷속 풍경과 이어지는 관측 수족관','환상의 물고기를 기리는 별빛 수족관'][i]}));
 const extra=[
 ['economy','흥정의 달인','passive',25,'단계마다 물고기 판매 기준가 +3%.'],
 ['lore','어류학','passive',30,'단계마다 포획 경험치 +5%.'],
 ['lure','입질 유도','passive',40,'단계마다 입질 대기시간 −4%.'],
 ['recovery','바다 체력','passive',50,'단계마다 최대 체력 +5.'],
 ['reserve','기운 순환','passive',60,'단계마다 당길 때 MP 회복 속도 +5%.'],
 ['surge','급류 당기기','active',45,'6초간 기본 당김 피해 +30/60/90%. MP 70% · 재사용 20초.'],
 ['cool','줄 풀기','active',55,'줄 긴장을 즉시 20/30/40 낮춰요. MP 50% · 재사용 16초.'],
 ['bleed','깊은 바늘','active',65,'6초간 물고기 체력 총 18/24/30% 감소. MP 80% · 재사용 22초.'],
 ['renewal','물결 호흡','active',75,'체력 20/30/40 회복, 줄 긴장 15 감소. MP 80% · 재사용 22초.'],
 ['execute','전설의 챔질','active',90,'체력 30% 미만 물고기에 20/30/40%, 그 외 8/12/16% 피해. MP 100% · 재사용 30초.']
 ];
 for(const [id,name,type,level,description] of extra)skills.push({id,name,type,level,description,max:3,costs:[2,4,6]});
 baits.push(
  {id:'shrimp',name:'통새우 미끼',factor:1.3,level:10,description:'일반 어종 중 대형이 가능한 물고기의 대형 확률 50%.'},
  {id:'glow',name:'야광 크릴',factor:1.7,level:25,description:'밤에 관상어 확률 8%, 30번째 보장. 낮에는 일반 미끼 효과.'},
  {id:'spinner',name:'은빛 스피너',factor:1.6,level:40,description:'입질 대기시간 25% 단축.'},
  {id:'squid',name:'대왕 오징어 미끼',factor:1.8,level:60,description:'전투 기본 당김 피해 15% 증가.'},
  {id:'pearl',name:'별빛 진주 미끼',factor:2.4,level:80,description:'관상어 확률 10%, 20번째 보장. 포획 경험치 20% 증가.'}
 );
}
