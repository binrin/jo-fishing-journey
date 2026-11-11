// Fit the game to the real visible screen on every phone (iPhone mini/SE/Pro Max, Galaxy, Fold...).
// - Height: native 100dvh where supported (always current). Old iOS without dvh gets --app-h from
//   the visible viewport so Safari's toolbar never hides the bottom of the game.
// - data-fit on #game: size class from the usable height (safe areas removed) -> fishing-focus.css rows.
const game=document.getElementById('game');
const hasDVH=!!(window.CSS&&CSS.supports&&CSS.supports('height','100dvh'));
export function fitClass(usable){return usable>=760?'l':usable>=660?'m':usable>=560?'s':'xs';}
export function fit(){
 if(!game)return;
 if(!hasDVH){const vv=window.visualViewport,h=Math.round(vv&&vv.scale<=1.01?vv.height:window.innerHeight);if(h)document.documentElement.style.setProperty('--app-h',h+'px');}
 const cs=getComputedStyle(game),usable=game.clientHeight-(parseFloat(cs.paddingTop)||0)-(parseFloat(cs.paddingBottom)||0);
 if(usable>0){const cls=fitClass(usable);if(game.dataset.fit!==cls)game.dataset.fit=cls;game.dataset.usable=String(Math.round(usable));}
}
let queued=0;const schedule=()=>{clearTimeout(queued);queued=setTimeout(fit,60);};
fit();
if(window.ResizeObserver&&game)new ResizeObserver(schedule).observe(game);
window.addEventListener('resize',schedule);window.addEventListener('orientationchange',()=>setTimeout(fit,250));
window.visualViewport?.addEventListener('resize',schedule);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});
window.__fitScreen=fit;
