import {FISH} from './data.js';
import {travelFamily} from './fish-travel.js';
export function motionFamily(id){return travelFamily(FISH[id]||{id});}
export function fishMotion(id,time,direction=1,boss=false){
 const family=motionFamily(id),t=time*(1+(id%5)*.045)+id*.7,base=60+direction*4;
 let x=base,y=64,angle=0,stretch=1;
 if(family==='dart'){x+=Math.sin(t*2.6)*7;y+=Math.sin(t*4.1)*3;angle=Math.cos(t*2.6)*8;}
 if(family==='eel'){x+=Math.sin(t*1.5)*6;y+=Math.sin(t*2.9)*5;angle=Math.sin(t*2.9)*15;stretch=1+Math.sin(t*3.2)*.07;}
 if(family==='glide'){x+=Math.sin(t*.8)*10;y+=Math.sin(t*.65)*5;angle=Math.sin(t*.8)*7;stretch=1+Math.sin(t*2)*.025;}
 if(family==='crawl'){x+=Math.sin(t*1.2)*6;y=70+Math.abs(Math.sin(t*2))*2;angle=Math.sin(t*3)*4;}
 if(family==='float'){x+=Math.sin(t*.65)*5;y+=Math.sin(t*1.15)*7;angle=Math.sin(t*.7)*5;stretch=1+Math.sin(t*2.2)*.07;}
 if(family==='predator'){const dash=Math.sin(t*1.1);x+=Math.sign(dash)*Math.abs(dash)**3*(boss?12:9);y+=Math.sin(t*.9)*3;angle=Math.cos(t*1.1)*6;stretch=1+Math.abs(dash)*.03;}
 if(family==='cruise'){x+=Math.sin(t*1.3)*7;y+=Math.sin(t*1.7)*3;angle=Math.sin(t*1.1)*5;}
 return {family,x,y,angle,stretch};
}
export function createCombatFX({scene,layer,target,getState}){
 const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let last=0,visualX=60,lastMotionTime=null;
 function impact(kind='hit',text='탁!',forced=false){
  const now=performance.now();if(!forced&&now-last<220)return;last=now;
  const r=scene.getBoundingClientRect(),f=target.getBoundingClientRect(),x=f.left-r.left+f.width*.5,y=f.top-r.top+f.height*.5;
  const group=document.createElement('div');group.className='impact-group '+kind;group.style.left=x+'px';group.style.top=y+'px';
  const label=document.createElement('strong');label.className='damage-pop';label.textContent=text;group.append(label);
  const ring=document.createElement('i');ring.className='impact-ring';group.append(ring);
  if(!reduced())for(let i=0;i<(kind==='hit'?5:10);i++){const p=document.createElement('i');p.className='impact-spark';const a=i*Math.PI*2/(kind==='hit'?5:10);p.style.setProperty('--dx',Math.cos(a)*(kind==='hit'?29:58)+'px');p.style.setProperty('--dy',Math.sin(a)*(kind==='hit'?23:45)+'px');p.style.setProperty('--rot',i*31+'deg');group.append(p);}
  layer.append(group);while(layer.children.length>12)layer.firstElementChild.remove();setTimeout(()=>group.remove(),850);
  if(!reduced()){const force=kind==='critical'||kind==='strike'?4:kind==='shock'?3:1.2;scene.animate([{transform:'translate(0,0)'},{transform:'translate('+(-force)+'px,'+(force/2)+'px)'},{transform:'translate('+force+'px,'+(-force/2)+'px)'},{transform:'translate(0,0)'}],{duration:kind==='hit'?110:220});target.animate([{filter:'brightness(1)'},{filter:'brightness('+(kind==='hit'?1.6:2.2)+')'},{filter:'brightness(1)'}],{duration:170});}
  if(getState().haptics&&navigator.vibrate)navigator.vibrate(kind==='hit'?8:kind==='critical'?[20,25,35]:18);
 }
 function update(f,time){const m=fishMotion(f.fish.id,time,f.direction,f.fish.boss);const size=Math.min(f.fish.boss?175:145,scene.clientHeight*.24);target.style.width=size+'px';target.style.height=size+'px';f.edgePadding=Math.min(38,Math.max(8,target.offsetWidth*.5/scene.clientWidth*100+2));m.x=f.screenX??50;m.y=67+(m.y-64)*.25;target.style.left=m.x+'%';target.style.top=m.y+'%';target.style.transform='translate(-50%,-50%) rotate('+m.angle+'deg) scale('+m.stretch+','+(2-m.stretch)+')';target.dataset.motion=m.family;scene.classList.toggle('elastic-aura',f.effects.elastic>0);scene.classList.toggle('electric-aura',f.effects.shock>0);scene.classList.toggle('grit-aura',f.effects.grit>0);}
 function clear(){visualX=60;lastMotionTime=null;layer.replaceChildren();scene.classList.remove('elastic-aura','electric-aura','grit-aura');target.style.transform='';}
 return {impact,update,clear};
}
