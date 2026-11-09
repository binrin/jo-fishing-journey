import {FISH} from './data.js';
export function fishStyle(id){const f=FISH[id],sheet=f?.spriteSheet||'fish.png',i=f?.spriteIndex??id;
 return f?.legendary?'background-image:url(assets/legend-transparent.png);background-size:contain;background-position:center;background-repeat:no-repeat':`background-image:url(assets/${sheet});background-size:800% 800%;background-position:${i%8/7*100}% ${Math.floor(i/8)/7*100}%`;
}
export const sprite=(id,cls='')=>`<span class="sprite ${cls}" style="${fishStyle(id)}"></span>`;
export const waterStyle=id=>id<10?`background-image:url(assets/waters.png);background-size:200% 500%;background-position:${id%2*100}% ${Math.floor(id/2)*25}%`:`background-image:url(assets/waters-extra.png);background-size:400% 500%;background-position:${(id-10)%4/3*100}% ${Math.floor((id-10)/4)*25}%`;
export const gearArt=id=>`<span class="catalog-art" style="background-image:url(assets/equipment.png);background-size:500% 600%;background-position:${id%5*25}% ${Math.floor(id/5)*20}%" role="img" aria-label="낚싯대와 릴 세트"></span>`;
export const baitArt=id=>`<span class="bait-art" style="background-image:url(assets/baits.png);background-size:400% 200%;background-position:${id%4/3*100}% ${Math.floor(id/4)*100}%"></span>`;
