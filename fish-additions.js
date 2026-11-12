// v3.0 habitat cleanup + new real-world species.
// Each spot keeps species that live in its water type (fresh / coastal / reef / offshore / deep / mythic),
// and neighbouring spots of the same water share species. New species copy their stats from the other
// fish of their spots (hp/price/attack ratio), so they scale with every region automatically.
export const HABITAT=['fresh','fresh','coastal','coastal','reef','coastal','reef','offshore','offshore','deep',
 'fresh','fresh','coastal','reef','coastal','fresh','deep','offshore','coastal','fresh',
 'offshore','reef','deep','coastal','fresh','reef','offshore','deep','mythic','mythic'];
export const HABITAT_NAME={fresh:'민물',coastal:'연안·기수',reef:'산호초',offshore:'먼바다',deep:'심해',mythic:'신화의 바다'};
// [name, regions, sprite base id, hue shift deg, saturation, brightness, bait family, size ratio, time]
export const NEW_SPECIES=[
 ['붕어',[0,1],0,0,.5,.95,'worm',.9,'any'],
 ['동자개',[0,1],3,0,.5,1.05,'worm',1.0,'night'],
 ['잉어',[1],0,0,.5,.9,'worm',1.3,'any'],
 ['끄리',[10,11],6,190,.55,1.08,'lure',1.0,'day'],
 ['무지개송어',[11,15],8,-25,1.3,1.05,'lure',1.1,'any'],
 ['떡붕어',[19,24],0,10,.35,1.12,'worm',.9,'any'],
 ['망둥어',[2,3],4,-22,.75,1.1,'shrimp',.8,'day'],
 ['숭어',[2,3],18,0,.25,1.1,'shrimp',1.0,'any'],
 ['볼락',[3,4],19,-18,1.4,.95,'shrimp',.9,'night'],
 ['자리돔',[4,6],12,200,1.1,.75,'shrimp',.8,'day'],
 ['부시리',[5,7],32,40,1.15,1.05,'squid',1.2,'any'],
 ['전갱이',[5,6],18,60,.8,1.1,'shrimp',.85,'any'],
 ['참다랑어',[8],43,200,1.05,.75,'squid',1.35,'any'],
 ['홍어',[9],38,-30,1.2,.9,'glow',1.1,'night'],
 ['감성돔',[12,14],36,0,.15,.6,'shrimp',1.0,'any'],
 ['벵에돔',[13,21],36,80,.6,.55,'shrimp',1.0,'any'],
 ['은대구',[16,22],26,200,.35,.7,'glow',1.05,'night']
];
export const FIRST_NEW_ID=240;
const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
export function applyHabitatCleanup(FISH,REGIONS){
 // Bass is a freshwater fish: keep it in the lotus bend, not at the sea port.
 const bass=FISH[7];if(bass?.name==='배스')bass.regions=bass.regions.filter(r=>r!==2);
 // The old "jade waterfall valley" holds sea bream, tuna and sharks: it is a strait, not a waterfall.
 if(REGIONS[7]){REGIONS[7].name='비취빛 해협';REGIONS[7].display='비취빛 해협';REGIONS[7].region='비취빛 해협';}
 if(FISH.length>FIRST_NEW_ID)return;
 NEW_SPECIES.forEach(([name,regions,base,hue,sat,bright,family,ratio,time],i)=>{
  const peers=FISH.filter(f=>!f.boss&&!f.ornamental&&f.regions.some(r=>regions.includes(r)));
  const grade=g=>mean(peers.map(f=>f.hp[g]>0?f.hp[g]:Math.max(...f.hp)));
  const price=g=>mean(peers.map(f=>f.prices[g]>0?f.prices[g]:Math.max(...f.prices)));
  const atk=g=>mean(peers.map(f=>f.atk?.[g]||20));
  const id=FIRST_NEW_ID+i;
  FISH.push({id,name,regions:[...regions],bait:family,family,note:'v3.0 신규 어종',boss:false,ornamental:false,time,night:time==='night',day:time==='day',
   hp:[0,1,2].map(g=>Math.round(grade(g)*ratio)),prices:[0,1,2].map(g=>Math.round(price(g)*(.85+ratio*.15))),atk:[0,1,2].map(g=>Math.round(atk(g)*(.9+ratio*.1))),
   motion:family==='lure'||family==='squid'?'predator':ratio<.9?'dart':'cruise',motionPattern:'cruise',biome:HABITAT[regions[0]],variantOf:base,spriteFilter:{hue,sat,bright},added:true});
 });
}
