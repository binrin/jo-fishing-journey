// Full-screen result effects (haggle outcomes, upgrades). Each kind has its own look.
// The overlay goes inside the open <dialog> when there is one, so it is drawn above the top layer.
const KINDS={
 'haggle-great':{ms:2600,particles:34,chars:['🪙','✦','💰','✧'],spread:[200,320],rays:true,shake:6},
 'haggle-success':{ms:1900,particles:16,chars:['🪙','✦'],spread:[170,230],ring:true,shake:2},
 'haggle-fail':{ms:1700,particles:6,chars:['💧','·'],spread:[50,40],drop:true},
 forge:{ms:1800,particles:26,chars:['','','',''],spread:[190,260],spark:true,ring:true,shake:4},
 newgear:{ms:2000,particles:14,chars:['✨','✦','✧'],spread:[180,240],rays:true,sweep:true},
 home:{ms:2100,particles:30,chars:['','',''],spread:[180,60],confetti:true},
 skill:{ms:1900,particles:14,chars:['✦','✧','⋆'],spread:[160,220],rune:true},
 boat:{ms:2000,particles:20,chars:['','',''],spread:[190,160],bubble:true,wave:true}
};
export function celebrate(kind,{icon='✨',title='',sub=''}={}){
 const k=KINDS[kind]||KINDS.newgear,reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const host=document.querySelector('dialog[open]')||document.body;
 host.querySelectorAll('.celebrate').forEach(n=>n.remove());
 const o=document.createElement('div');o.className=`celebrate k-${kind}`;o.setAttribute('aria-live','polite');
 let html='<i class="cb-flash"></i>';
 if(k.rays)html+='<i class="cb-rays"></i>';
 if(k.ring)html+='<i class="cb-ring"></i><i class="cb-ring r2"></i>';
 if(k.rune)html+='<i class="cb-rune"></i>';
 if(k.wave)html+='<i class="cb-wave"></i>';
 if(!reduced)for(let i=0;i<k.particles;i++){
  const a=(k.confetti||k.drop)?Math.PI/2+(Math.random()-.5)*2.6:Math.random()*Math.PI*2,r=.6+Math.random()*.4;
  let dx=Math.cos(a)*k.spread[0]*r,dy=k.confetti?(160+Math.random()*220):k.drop?(60+Math.random()*80):k.bubble?-(80+Math.random()*180):k.spark?-Math.abs(Math.sin(a))*k.spread[1]*r-30:Math.sin(a)*k.spread[1]*r;
  if(k.confetti)dx=(Math.random()-.5)*2*k.spread[0];
  const ch=k.chars[i%k.chars.length],hue=k.confetti?Math.floor(Math.random()*360):0;
  html+=`<i class="cb-p" style="--dx:${dx.toFixed(0)}px;--dy:${dy.toFixed(0)}px;--rot:${Math.floor(Math.random()*720-360)}deg;--d:${(Math.random()*.25).toFixed(2)}s;--h:${hue};--s:${(.7+Math.random()*.7).toFixed(2)}">${ch}</i>`;
 }
 html+=`<div class="cb-card"><span class="cb-icon">${icon}</span><b class="cb-title">${title}</b>${sub?`<small class="cb-sub">${sub}</small>`:''}</div>`;
 o.innerHTML=html;host.append(o);
 if(k.shake&&!reduced){const t=host===document.body?document.getElementById('game'):host.querySelector('.modal-body');t?.animate?.([{transform:'translate(0,0)'},{transform:`translate(${-k.shake}px,${k.shake/2}px)`},{transform:`translate(${k.shake}px,${-k.shake/2}px)`},{transform:'translate(0,0)'}],{duration:260,iterations:kind==='haggle-great'?2:1});}
 setTimeout(()=>o.remove(),k.ms);
 return o;
}
