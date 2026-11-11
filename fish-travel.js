export function travelFamily(fish){
 if(fish.motion)return fish.motion;
 const id=fish.id;
 if([4,5,0,1,6,14,17,18,24,29,37,53].includes(id))return 'dart';
 if([28,34,35,55,56].includes(id))return 'eel';
 if([38,40,54].includes(id))return 'glide';
 if([15,20,16].includes(id))return 'crawl';
 if([39,57].includes(id))return 'float';
 if([11,22,41,42,43,44,46,47,48,49,50,52,58].includes(id))return 'predator';
 return 'cruise';
}
export function advanceFishTravel(f,dt){
 const edge=Math.min(38,Math.max(8,f.edgePadding||20));
 const speed=({dart:28,eel:20,glide:16,crawl:12,float:11,predator:30,cruise:20}[travelFamily(f.fish)]||20)*(f.effects.slow>0?.45:1)*(f.burst>0?1.5:1);
 f.screenX=Math.max(edge,Math.min(100-edge,(f.screenX??50)+f.direction*speed*dt));
 if(f.screenX>=100-edge&&f.direction>0||f.screenX<=edge&&f.direction<0){f.direction*=-1;f.nextTurn=Math.max(1.2,f.nextTurn);}
 return f.screenX;
}

// Legendary phases retain distance progress instead of jumping back offshore.
export function fishApproach(f){const total=f.legendary?3:1;const progress=Math.max(0,Math.min(1,((f.legendary?f.phase-1:0)+(1-Math.max(0,f.hp)/100))/total));return {progress,y:62+progress*17,scale:.46+progress*.64};}
