// Painted-style skill badges matching the game's sprites: thick brown outline,
// jewel gradient, cream highlight. Active skills are round, passives are tiles.
const O='#4a2e1a';
const G={
 // passive
 strength:['#f08a4b','<path d="M24 58h52M30 44v28M70 44v28" stroke-width="13"/><path d="M24 58h52" stroke="#fff3d6" stroke-width="5"/><rect x="18" y="40" width="14" height="36" rx="5" fill="#ffd36e"/><rect x="68" y="40" width="14" height="36" rx="5" fill="#ffd36e"/>'],
 vitality:['#ef5f7a','<path d="M50 80C22 62 18 44 28 34c8-8 18-6 22 4 4-10 14-12 22-4 10 10 6 28-22 46z" fill="#ff8fa3"/><path d="M33 42c2-4 6-6 9-5" stroke="#fff6e6" stroke-width="5" fill="none"/>'],
 knot:['#3aa58f','<path d="M22 64c10-30 36-30 40-12s-20 22-20 6 26-26 36-4" fill="none" stroke-width="12"/><path d="M22 64c10-30 36-30 40-12s-20 22-20 6 26-26 36-4" fill="none" stroke="#f6e3b0" stroke-width="5"/>'],
 focus:['#5876d8','<circle cx="50" cy="52" r="27" fill="#fff3d6"/><circle cx="50" cy="52" r="17" fill="#ff6b5b"/><circle cx="50" cy="52" r="7" fill="#fff3d6"/><path d="M72 30l-18 18" stroke-width="7"/><path d="M70 22l10 10-6 2z" fill="#ffd36e"/>'],
 economy:['#d9a326','<ellipse cx="50" cy="66" rx="24" ry="9" fill="#ffd36e"/><path d="M26 58v8M74 58v8" stroke-width="5"/><ellipse cx="50" cy="56" rx="24" ry="9" fill="#ffe08a"/><ellipse cx="50" cy="42" rx="20" ry="16" fill="#ffd36e"/><text x="50" y="49" text-anchor="middle" font-size="20" font-weight="900" fill="#8a5a12" stroke="none">G</text>'],
 lore:['#8a63c9','<path d="M18 30q16-6 32 4v44q-16-10-32-4z" fill="#fff3d6"/><path d="M82 30q-16-6-32 4v44q16-10 32-4z" fill="#f6e3b0"/><path d="M58 54c6-6 14-6 18 0-4 6-12 6-18 0zm0 0l-5-5v10z" fill="#58b7c9" stroke-width="3"/>'],
 lure:['#2f9fbf','<path d="M50 14v18" stroke-width="6"/><path d="M50 14v10" stroke="#ff5e4e" stroke-width="3"/><ellipse cx="50" cy="48" rx="12" ry="17" fill="#ff7b5c"/><path d="M38 50h24" stroke-width="4"/><path d="M50 65v10" stroke-width="5"/><path d="M22 78q14-8 28 0t28 0" fill="none" stroke="#e8fbff" stroke-width="5"/>'],
 recovery:['#2b8fb3','<path d="M50 70C30 57 27 44 34 37c6-6 13-4 16 3 3-7 10-9 16-3 7 7 4 20-16 33z" fill="#ff8fa3"/><path d="M16 78q9-8 17 0t17 0 17 0 17 0" fill="none" stroke="#e8fbff" stroke-width="6"/>'],
 reserve:['#3c9e6c','<path d="M28 50a22 22 0 0 1 38-15" fill="none" stroke-width="10"/><path d="M72 50a22 22 0 0 1-38 15" fill="none" stroke-width="10"/><path d="M62 24l10 12-15 3z M38 76l-10-12 15-3z" fill="#bdf7c9"/><circle cx="50" cy="50" r="7" fill="#bdf7c9"/>'],
 // active
 strike:['#e8642c','<path d="M50 12l7 18 19-5-11 15 15 12-19 2 2 19-13-14-13 14 2-19-19-2 15-12-11-15 19 5z" fill="#ffd36e"/><path d="M50 36v20q0 12-10 12t-10-10" fill="none" stroke-width="7"/><path d="M50 36v20q0 12-10 12t-10-10" fill="none" stroke="#f3f6ff" stroke-width="3"/>'],
 elastic:['#24a7a0','<path d="M30 22h40M30 78h40" stroke-width="7"/><path d="M50 22l-16 9 32 9-32 9 32 9-32 9 16 11" fill="none" stroke-width="10" stroke-linejoin="round"/><path d="M50 22l-16 9 32 9-32 9 32 9-32 9 16 11" fill="none" stroke="#bff8f0" stroke-width="4" stroke-linejoin="round"/>'],
 shock:['#e9b31e','<path d="M58 10L26 56h20l-8 34 36-48H52z" fill="#fff07a"/><path d="M50 22l-12 20" stroke="#fffde0" stroke-width="4"/>'],
 heal:['#3fb06a','<path d="M40 20h20v20h20v20H60v20H40V60H20V40h20z" fill="#effff2"/><path d="M44 26v12" stroke="#bdf7c9" stroke-width="4"/>'],
 slow:['#8a6fd1','<path d="M30 16h40M30 84h40" stroke-width="7"/><path d="M33 18c0 22 34 22 34 32s-34 10-34 32h34c0-22-34-22-34-32s34-10 34-32z" fill="#efe3ff"/><path d="M40 76q10-8 20 0z" fill="#ffd36e"/>'],
 grit:['#4a7bd0','<path d="M50 14l30 10v24c0 18-13 30-30 38-17-8-30-20-30-38V24z" fill="#cfe0ff"/><path d="M50 26l18 6v16c0 11-8 19-18 24z" fill="#ffd36e"/>'],
 surge:['#1f8ed6','<path d="M14 66q10-22 26-10t20-16 26 4" fill="none" stroke-width="12"/><path d="M14 66q10-22 26-10t20-16 26 4" fill="none" stroke="#e8fbff" stroke-width="5"/><path d="M72 30l16 14-20 6z" fill="#e8fbff"/>'],
 cool:['#4fb3e6','<path d="M50 16v68M21 33l58 34M21 67l58-34" stroke-width="10"/><path d="M50 16v68M21 33l58 34M21 67l58-34" stroke="#f0fbff" stroke-width="4"/><circle cx="50" cy="50" r="8" fill="#f0fbff"/>'],
 bleed:['#c8334d','<path d="M44 14v40q0 18-14 18t-12-14" fill="none" stroke-width="10"/><path d="M44 14v40q0 18-14 18t-12-14" fill="none" stroke="#f3f6ff" stroke-width="4"/><path d="M68 40c6 9 9 14 9 18a9 9 0 0 1-18 0c0-4 3-9 9-18z" fill="#ff6b7d"/>'],
 renewal:['#26a3a8','<circle cx="34" cy="34" r="8" fill="#e8fbff"/><circle cx="56" cy="24" r="6" fill="#e8fbff"/><circle cx="68" cy="42" r="9" fill="#e8fbff"/><path d="M14 66q9-10 18 0t18 0 18 0 18 0" fill="none" stroke-width="11"/><path d="M14 66q9-10 18 0t18 0 18 0 18 0" fill="none" stroke="#bff8f0" stroke-width="5"/>'],
 execute:['#c99418','<path d="M22 70l-4-38 18 14 14-24 14 24 18-14-4 38z" fill="#ffd36e"/><path d="M22 70h56v10H22z" fill="#f5b83d"/><circle cx="50" cy="56" r="7" fill="#e8384f"/><circle cx="18" cy="32" r="4" fill="#fff3d6"/><circle cx="82" cy="32" r="4" fill="#fff3d6"/><circle cx="50" cy="22" r="4" fill="#fff3d6"/>']
};
const dark=(h,f=.62)=>'#'+[1,3,5].map(i=>Math.round(parseInt(h.slice(i,i+2),16)*f).toString(16).padStart(2,'0')).join('');
const PASSIVE=new Set(['strength','vitality','knot','focus','economy','lore','lure','recovery','reserve']);
let seq=0;
export function skillIcon(id,cls=''){
 const [c,glyph]=G[id]||['#9a8a70','<circle cx="50" cy="50" r="12" fill="#fff3d6"/>'],g='sk-'+id+'-'+(++seq);
 const shape=PASSIVE.has(id)?`<rect x="5" y="5" width="90" height="90" rx="24" fill="url(#${g})" stroke="${O}" stroke-width="6"/><rect x="13" y="13" width="74" height="74" rx="18" fill="none" stroke="#fff6dd" stroke-opacity=".55" stroke-width="3"/>`:`<circle cx="50" cy="50" r="45" fill="url(#${g})" stroke="${O}" stroke-width="6"/><circle cx="50" cy="50" r="37" fill="none" stroke="#fff6dd" stroke-opacity=".55" stroke-width="3"/>`;
 return `<svg class="skill-icon ${cls}" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="${g}" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#fff6dd"/><stop offset=".28" stop-color="${c}"/><stop offset="1" stop-color="${dark(c)}"/></radialGradient></defs>${shape}<g stroke="${O}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${glyph}</g><ellipse cx="34" cy="22" rx="14" ry="6" fill="#fff" opacity=".45" transform="rotate(-25 34 22)"/></svg>`;
}
