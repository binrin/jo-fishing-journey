// Pointer ownership keeps two-finger release gestures safe.
export function createReelInput(){
 const water=new Map(),reel=new Set();let keyboard=0;
 return {
  waterDown(id,x,left,width){water.set(id,x<left+width/2?-1:1);},
  waterMove(id,x,left,width){if(water.has(id))water.set(id,x<left+width/2?-1:1);},
  reelDown(id){reel.add(id);},
  up(id){water.delete(id);reel.delete(id);},
  key(dir){keyboard=dir;},
  clear(){water.clear();reel.clear();keyboard=0;},
  get input(){return reel.size?0:[...water.values()].at(-1)||keyboard;},
  get releasing(){return reel.size>0;}
 };
}
