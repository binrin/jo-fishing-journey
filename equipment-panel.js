import {SLOTS,ensureEquipment,equipmentName,itemPower,itemPrice,equipmentStats,EQUIPMENT_SUCCESS} from './equipment.js';
import {TACKLE,playerLevel,gearRequiredLevel} from './progression.js';
import {gearArt} from './art.js';
import {repPrice} from './systems.js';
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
function equipmentCard(s,slot,x,tier,level){
 const rank=x.owned[tier];
 const equipped=x.equipped===tier;
 const owned=rank!==undefined;
 return `<article class="equipment-card">${equipmentIcon(slot.id,tier)}<div><strong>${equipmentName(slot.id,tier)} +${rank??0}</strong><small>Lv.${TACKLE[tier].level} · 성능 ${itemPower(tier,rank??0).toFixed(1)} · ${equipped?'장착 중':owned?'보관 중':'미보유'}</small>${effectLine(s,slot.id,tier,rank??0)}</div>${owned?`<div class="row">${btn(equipped?'장착 해제':'장착',equipped?'unequip':'equip',slot.id,tier)}${btn(rank===5?'최대 강화 +5':`+${rank+1} 강화 · ${n(repPrice(s,itemPrice(slot.id,tier,rank)))} G`,'enhance',slot.id,tier,rank>=5||level<gearRequiredLevel(tier,rank+1))}</div>${rank<5?`<small>성공 ${EQUIPMENT_SUCCESS[rank]}% · 필요 Lv.${gearRequiredLevel(tier,rank+1)}</small>`:''}`:`${btn(`구매 · ${n(repPrice(s,itemPrice(slot.id,tier)))} G`,'buy',slot.id,tier,level<TACKLE[tier].level||tier>0&&x.owned[tier-1]!==5)}${tier>0&&x.owned[tier-1]!==5?'<small>이전 등급 +5 필요</small>':''}`}</article>`;
}
export function equipmentPanel(s,all=false){
 const e=ensureEquipment(s),level=playerLevel(s),stats=equipmentStats(s);
 const contents=SLOTS.map(slot=>{
  const x=e[slot.id],top=x.equipped??Math.max(...Object.keys(x.owned).map(Number));
  const tiers=all?TACKLE.map(t=>t.id):[top,top+1].filter(t=>TACKLE[t]);
  return `<details class="equipment-section" data-equipment-slot="${slot.id}" ${slot.id==='rod'?'open':''}><summary>${slot.name} · ${slot.stat}${x.equipped===null?' · 미장착':''}</summary><p class="slot-effect">${SLOT_EFFECTS[slot.id]}</p>${tiers.map(t=>equipmentCard(s,slot,x,t,level)).join('')}</details>`;
 }).join('');
 return `<p>낚싯대 · 릴 · 찌 · 줄 · 바늘 5부위를 장착해야 낚시할 수 있어요. 강화에 실패하면 금화가 차감되고 현재 강화 단계는 유지돼요.</p><div class="notice">현재 당기는 힘 ×${stats.power.toFixed(2)} · 줄 긴장 ×${stats.tension.toFixed(2)} · 챔질 여유 +${stats.biteBonus.toFixed(2)}초<br>금화 ${n(s.coins)} G · 이전 등급을 +5로 강화하면 다음 등급을 구매할 수 있어요.</div><div class="equipment-slots">${SLOTS.map(slot=>{const x=e[slot.id];return `<div><b>${slot.name}</b>${x.equipped===null?'<span class="empty-equipment">미장착</span>':`${equipmentIcon(slot.id,x.equipped)}<small>${x.equipped+1}등급 +${x.owned[x.equipped]}</small>`}</div>`;}).join('')}</div><button class="secondary" data-do="${all?'equipment':'equipment-all'}">${all?'내 장비로 돌아가기':'전체 장비 목록 보기'}</button>${contents}`;
}
