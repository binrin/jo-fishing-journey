// "내 수족관": the fish kept at home swim around a glass tank.
import {FISH} from './data.js';
import {fishStyle} from './art.js';
const MAX_SHOWN=36;
export function tankFish(homeFish){
 // Ornamental fish first, then the biggest catches; one sprite per stored fish up to MAX_SHOWN.
 return [...homeFish].sort((a,b)=>(FISH[b.id].ornamental-FISH[a.id].ornamental)||(a.grade-b.grade)||(b.weightKg||0)-(a.weightKg||0)).slice(0,MAX_SHOWN);
}
export function tankHTML(homeFish){
 const shown=tankFish(homeFish);
 return `<div class="fish-tank" aria-label="내 수족관 어항"><div class="tank-light"></div>${Array.from({length:7},(_,i)=>`<i class="tank-plant p${i}"></i>`).join('')}<div class="tank-sand"></div>${Array.from({length:10},(_,i)=>`<i class="tank-bubble" style="left:${8+i*9}%;animation-delay:${(i*0.7)%5}s;animation-duration:${4+i%4}s"></i>`).join('')}${shown.map((x,i)=>`<button class="tank-fish ${FISH[x.id].ornamental?'ornamental':''}" data-do="fish-detail" data-id="${x.id}" data-i="${i}" aria-label="${FISH[x.id].name}"><span class="sprite" style="${fishStyle(x.id)}"></span></button>`).join('')}${shown.length?'':'<p class="tank-empty">아직 어항이 비어 있어요.<br>배의 물고기를 집에 보관하면 여기서 헤엄쳐요.</p>'}</div>`;
}
// Simple wandering: each fish swims toward a random point, turns to face its direction, and bobs.
export function startTank(root,homeFish){
 const tank=root.querySelector('.fish-tank');if(!tank)return;
 const shown=tankFish(homeFish),els=[...tank.querySelectorAll('.tank-fish')];
 const W=()=>tank.clientWidth,H=()=>tank.clientHeight;
 const fish=els.map((el,i)=>{const x=shown[i],size=x.grade===0?62:x.grade===1?50:40;el.style.width=el.style.height=size+'px';
  return {el,size,x:Math.random(),y:.12+Math.random()*.6,tx:Math.random(),ty:.12+Math.random()*.6,speed:.04+Math.random()*.05,face:1,phase:Math.random()*6};});
 let last=performance.now();
 const step=now=>{if(!tank.isConnected)return;const dt=Math.min(.05,(now-last)/1000);last=now;
  for(const f of fish){const dx=f.tx-f.x,dy=f.ty-f.y,d=Math.hypot(dx,dy);
   if(d<.02){f.tx=Math.random();f.ty=.1+Math.random()*.62;f.speed=.03+Math.random()*.06;}
   else{f.x+=dx/d*f.speed*dt;f.y+=dy/d*f.speed*dt*.6;}
   if(Math.abs(dx)>.01)f.face=dx>0?1:-1;f.phase+=dt*2;
   const px=f.x*(W()-f.size),py=f.y*(H()-f.size)+Math.sin(f.phase)*3;
   f.el.style.transform=`translate(${px}px,${py}px)`;f.el.firstElementChild.style.transform=`scaleX(${f.face})`;}
  requestAnimationFrame(step);};
 requestAnimationFrame(step);
}
