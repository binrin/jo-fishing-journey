import {SLOTS,ensureEquipment,equipmentName,itemPower,itemPrice,equipmentStats} from './equipment.js';
import {TACKLE,playerLevel,gearRequiredLevel} from './progression.js';
import {gearArt} from './art.js';
const n=x=>Math.round(x).toLocaleString('ko-KR');
export function equipmentIcon(slot,tier){const art=slot==='rod'?gearArt(tier):`<span class="catalog-art gear-part" style="background-image:url(assets/gear-${slot}.png);background-size:500% 600%;background-position:${tier%5*25}% ${Math.floor(tier/5)*20}%" role="img" aria-label="${equipmentName(slot,tier)}"></span>`;
 return `<span class="equipment-icon gear-frame">${art}<b class="tier-badge">${tier+1}</b></span>`;
}

// What each slot does, matching equipmentStats(): power = .85 × rod^.5 × reel^.3 × hook^.2,
// line eases tension growth, float lengthens the strike window.
export const SLOT_EFFECTS={rod:'물고기에게 주는 피해를 가장 크게 좌우해요 (당기는 힘 비중 50%).',reel:'감을 때 물고기 체력을 깎는 속도를 올려요 (당기는 힘 비중 30%).',hook:'바늘이 깊이 박혀 피해를 더해요 (당기는 힘 비중 20%).',line:'당기는 동안 줄 긴장이 덜 올라 끊어질 위험이 줄어요.',float:'찌가 잠긴 뒤 챔질할 수 있는 시간이 늘어나요.'};
export function itemEffect(s,slot,tier,rank=0){const r=itemPower(tier,rank)/1.8**s.region,w={rod:.5,reel:.3,hook:.2}[slot];
 if(w)return `피해 ×${(r**w).toFixed(2)}`;
 if(slot==='line')return `줄 긴장 증가 ×${Math.max(.55,Math.min(1.5,1/Math.max(.1,r)**.22)).toFixed(2)}`;
 return `챔질 여유 +${Math.min(1.5,.5*Math.sqrt(r)).toFixed(2)}초`;
}
const effectLine=(s,slot,tier,rank)=>`<small class="gear-effect">효과 · ${itemEffect(s,slot,tier,rank)} <span>(현재 낚시터 기준)</span></small>`;
const btn=(text,action,slot,tier,disabled=false)=>`<button class="secondary" data-do="equipment-${action}" data-id="${slot}:${tier}" ${disabled?'disabled':''}>${text}</button>`;
export function equipmentPanel(s,shopping=false){const e=ensureEquipment(s),level=playerLevel(s),stats=equipmentStats(s);
 return `<p>낚싯대 · 릴 · 찌 · 줄 · 바늘을 각각 장착해요. <b>5부위를 모두 장착해야 낚시할 수 있어요.</b></p><div class="notice">강화는 성공률 100%, 최대 +5 · 다음 등급 기본 성능은 이전 등급 +5보다 20% 높아요.<br>현재 당기는 힘 ×${stats.power.toFixed(2)} · 줄 긴장 ×${stats.tension.toFixed(2)} · 챔질 여유 +${stats.biteBonus.toFixed(2)}초<br>금화 ${n(s.coins)} G · 구매한 장비는 보관되며 직접 장착합니다. 다음 등급 구매는 이전 등급 +5부터 가능해요.</div><div class="equipment-slots">${SLOTS.map(slot=>{const x=e[slot.id];return `<div><b>${slot.name}</b>${x.equipped===null?'<span class="empty-equipment">미장착</span>':`${equipmentIcon(slot.id,x.equipped)}<small>${x.equipped+1}등급 +${x.owned[x.equipped]}</small>`}</div>`;}).join('')}</div>${SLOTS.map(slot=>{const x=e[slot.id],tiers=Object.keys(x.owned).map(Number).sort((a,b)=>b-a),next=Math.max(...tiers)+1;return `<details class="equipment-section" data-equipment-slot="${slot.id}" ${slot.id==='rod'?'open':''}><summary>${slot.name} · ${slot.stat} · ${tiers.length}개 보유</summary><p class="slot-effect">${SLOT_EFFECTS[slot.id]}</p>${tiers.map(t=>{const rank=x.owned[t];return `<article class="equipment-card">${equipmentIcon(slot.id,t)}<div><strong>${equipmentName(slot.id,t)} +${rank}</strong><small>Lv.${TACKLE[t].level} · 성능 ${itemPower(t,rank).toFixed(1)} · ${x.equipped===t?'장착 중':'보관 중'}</small>${effectLine(s,slot.id,t,rank)}</div><div class="row">${btn(x.equipped===t?'장착 해제':'장착',x.equipped===t?'unequip':'equip',slot.id,t)}${btn(rank===5?'최대 강화 +5':`+${rank+1} 강화 · ${n(itemPrice(slot.id,t,rank))} G`,'enhance',slot.id,t,rank>=5||level<gearRequiredLevel(t,rank+1))}</div><small>강화 필요 Lv.${gearRequiredLevel(t,Math.min(5,rank+1))}</small></article>`;}).join('')}${shopping&&TACKLE[next]?`<article class="equipment-card">${equipmentIcon(slot.id,next)}<div><strong>${equipmentName(slot.id,next)} +0</strong><small>Lv.${TACKLE[next].level} · 성능 ${itemPower(next).toFixed(1)}</small>${effectLine(s,slot.id,next,0)}</div>${btn(`구매 · ${n(itemPrice(slot.id,next))} G`,'buy',slot.id,next,level<TACKLE[next].level||x.owned[next-1]!==5)}</article>`:''}</details>`;}).join('')}${shopping?'':'<button class="primary" data-do="shop">새 장비 구매하러 가기</button>'}`;
}
