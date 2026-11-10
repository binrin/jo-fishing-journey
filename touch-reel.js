// Water-only controls: touching winds, releasing every finger lets the line out.
export function createReelInput(){
 const water=new Map();let keyboard=0;
 return {
  waterDown(id,x,left,width){water.set(id,x<left+width/2?-1:1);},
  waterMove(id,x,left,width){if(water.has(id))water.set(id,x<left+width/2?-1:1);},
  up(id){water.delete(id);},
  key(dir){keyboard=dir;},
  clear(){water.clear();keyboard=0;},
  get input(){return [...water.values()].at(-1)||keyboard;},
  get releasing(){return this.input===0;}
 };
}
