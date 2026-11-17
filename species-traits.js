// Real-world traits per species: typical catch weight (kg) and market value (thousand won per kg).
// Fight time grows with body size and sale price follows real value (weight x price per kg).
// Both are normalised inside each fishing spot so a spot's average stays where the balance put it.
import {FISH} from './data.js';

// Known species: [typical kg, value per kg]
const KNOWN={
 '피라미':[.03,5],'미꾸라지':[.02,20],'쏘가리':[.6,70],'메기':[1.5,15],'꺽지':[.15,20],'쉬리':[.02,10],'산천어':[.3,30],'배스':[.8,3],
 '연어':[4,15],'가물치':[3,15],'금붕어':[.05,10],'피라루크':[100,10],'놀래기':[.3,15],'쥐치':[.4,25],'멸치':[.015,8],'꽃게':[.3,40],
 '아네모네':[.01,10],'꽁치':[.15,8],'고등어':[.4,8],'우럭':[.8,25],'문어':[2,30],'앵무조개':[1,20],'실라캔스':[80,10],'황볼락':[.4,30],
 '도루묵':[.15,15],'까치복':[.8,40],'명태':[1.5,8],'세일핀탕':[.1,10],'뱀장어':[.8,60],'오징어':[.4,15],'광어':[1.5,30],'삼치':[2,15],
 '방어':[6,25],'트리거':[.5,10],'오어피쉬':[150,5],'갈치':[1,40],'참돔':[2,45],'대하':[.08,50],'가오리':[6,10],'해마':[.01,10],
 '만타가오리':[1000,3],'농어':[3,30],'아귀':[4,15],'황다랑어':[30,25],'별상어':[5,5],'꼬꼬마비룡어':[.05,10],'오색비룡어':[20,20],
 '돌고래':[120,4],'청새치':[100,15],'범고래':[3000,2],'백상아리':[1000,3],'라이언피쉬':[.5,10],'메가마우스':[1000,3],'삼발이':[.1,10],
 '개복치':[300,4],'바이퍼피쉬':[.05,40],'블랙데빌':[.05,40],'발광해파리':[.2,5],'삼족어':[50,30],
 '붕어':[.4,15],'동자개':[.3,25],'잉어':[3,8],'끄리':[.5,5],'무지개송어':[1,20],'떡붕어':[.5,8],'망둥어':[.1,10],'숭어':[1.5,10],
 '볼락':[.2,40],'자리돔':[.1,20],'부시리':[8,25],'전갱이':[.3,12],'참다랑어':[200,60],'홍어':[6,30],'감성돔':[1,50],'벵에돔':[1,50],'은대구':[3,40]
};
// Invented species: matched by the first keyword found in the name. [typical kg, value per kg]
const RULES=[
 [/고래|거인/,[2000,2]],[/상어/,[300,3]],[/돛새치|창어|장창어|새치/,[100,15]],[/다랑어|참치/,[80,50]],[/가오리/,[20,10]],
 [/철갑어|갑주|투구|방패/,[40,60]],[/룡|용/,[50,35]],[/거북|군주|문지기|왕(?!관)/,[30,30]],
 [/장어|곰치|갈치/,[2,45]],[/대구/,[3,35]],[/농어/,[3,30]],[/잉어|메기|수염/,[3,10]],[/숭어/,[1.5,10]],
 [/돔/,[1.5,45]],[/송어|연어|곤들매기|열목어|산천어/,[1,25]],[/복어|복치/,[1,40]],[/쥐치/,[.5,25]],[/쏠배감펭|볼락|우럭/,[.5,30]],
 [/오징어|꼴뚜기/,[.5,20]],[/게|집게/,[.4,40]],[/고등어|전갱이|청어|준치|날치|꽁치|회유어/,[.4,10]],
 [/붕어|황어|누치|은어|백어/,[.4,12]],[/망둑|망둥/,[.1,10]],[/송사리|빙어|모치|미꾸리|납자루|동자|동사리|촉수/,[.03,15]],
 [/부채어|리본|나비|꽃잎|비단|공작/,[.3,20]],[/쌍꼬리|긴꼬리|긴지느러미|지느러미|꼬리/,[1.2,25]],[/큰입|긴턱|주둥이/,[2,20]],
];
const PRESTIGE=/진주|황금|금빛|금비늘|금사|은하|수정|옥|보석|자수정|오팔/;
export function speciesTraits(f){
 if(KNOWN[f.name])return {kg:KNOWN[f.name][0],won:KNOWN[f.name][1]};
 let t=[1,20];for(const [re,v] of RULES)if(re.test(f.name)){t=v;break;}
 return {kg:t[0],won:t[1]*(PRESTIGE.test(f.name)?1.3:1)};
}
// Typical length (cm) from weight with the usual fish rule W(g) = 0.01 * L^3.
export const typicalLength=f=>Math.cbrt(speciesTraits(f).kg*1000/.01);

const cache=new Map();let gGeo=0;
const globalGeo=()=>{if(gGeo)return gGeo;const all=FISH.filter(x=>!x.boss&&!x.ornamental);return gGeo=Math.exp(all.reduce((a,x)=>a+Math.log(speciesTraits(x).kg),0)/all.length);};
export const spotSizeFactor=regionId=>spot(regionId).big;
function spot(regionId){
 if(cache.has(regionId))return cache.get(regionId);
 const pool=FISH.filter(x=>x.regions.includes(regionId)&&!x.boss&&!x.ornamental);
 const kg=pool.map(x=>speciesTraits(x).kg),geo=Math.exp(kg.reduce((a,v)=>a+Math.log(v),0)/(kg.length||1));
 const rawFight=x=>Math.min(2.6,Math.max(.35,(speciesTraits(x).kg/geo)**.3));
 const worth=x=>{const t=speciesTraits(x);return t.kg*t.won;};
 const geoW=Math.exp(pool.reduce((a,x)=>a+Math.log(worth(x)),0)/(pool.length||1));
 const rawPrice=x=>Math.min(3.2,Math.max(.3,(worth(x)/geoW)**.3));
 const meanF=pool.reduce((a,x)=>a+rawFight(x),0)/(pool.length||1),meanP=pool.reduce((a,x)=>a+rawPrice(x),0)/(pool.length||1);
 // Spots full of big fish fight a little longer overall (tuna sea > anchovy bay), within limits.
 const big=Math.min(1.4,Math.max(.85,(geo/globalGeo())**.08));
 const v={fight:x=>rawFight(x)/meanF*big,price:x=>rawPrice(x)/meanP,big};cache.set(regionId,v);return v;
}
// Multiplier on the spot's base fight time (spot average = 1). Anchovy short, tuna long.
export const speciesFightFactor=(f,regionId)=>spot(regionId).fight(f);
// Multiplier on the spot's base fish value (spot average = 1). Real high-value fish sell high.
export const speciesPriceFactor=(f,regionId)=>spot(regionId).price(f);
