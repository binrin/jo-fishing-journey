import {TACKLE,playerLevel,gearRequiredLevel} from './progression.js';
export const SLOTS=[{id:'rod',name:'낚싯대',share:.35,stat:'당기는 힘'},{id:'reel',name:'릴',share:.22,stat:'감기 효율'},{id:'float',name:'찌',share:.16,stat:'챔질 여유'},{id:'line',name:'줄',share:.17,stat:'긴장 억제'},{id:'hook',name:'바늘',share:.10,stat:'관통력'}];
export const equipmentName=(slot,tier)=>TACKLE[tier].name.replace(/ 세트$/,'')+' '+SLOTS.find(x=>x.id===slot).name;
export const itemPower=(tier,rank=0)=>1.8**tier*(1+rank*.1);
export const itemPrice=(slot,tier,rank=null)=>Math.round((rank===null?TACKLE[tier].price:TACKLE[tier].upgrades[rank])*SLOTS.find(x=>x.id===slot).share);
export function ensureEquipment(s){
 if(!s.equipment)s.equipment=Object.fromEntries(SLOTS.map(x=>[x.id,{equipped:s.tackle,owned:{[s.tackle]:s.tackleUpgrade}}]));
 return s.equipment;
}
export function restoreEquipment(s,raw){
 if(raw==null){ensureEquipment(s);return;}
 const result={};
 for(const slot of SLOTS){const x=raw[slot.id];if(!x||!x.owned||typeof x.owned!=='object'||Array.isArray(x.owned))throw Error('장비 보관함이 손상되었습니다.');const owned={};
  for(const [key,n]of Object.entries(x.owned)){const tier=Number(key);if(!Number.isInteger(tier)||String(tier)!==key||!TACKLE[tier]||!Number.isInteger(n)||n<0||n>5)throw Error('장비 강화 정보가 손상되었습니다.');owned[tier]=n;}
  if(!Object.keys(owned).length||x.equipped!==null&&(!Number.isInteger(x.equipped)||owned[x.equipped]===undefined))throw Error('장착 정보가 손상되었습니다.');result[slot.id]={owned,equipped:x.equipped};
 }s.equipment=result;syncEquipment(s);
}
export function syncEquipment(s){const all=SLOTS.map(x=>ensureEquipment(s)[x.id]);if(all.some(x=>x.equipped===null)){s.tackle=0;s.tackleUpgrade=0;return;}s.tackle=Math.min(...all.map(x=>x.equipped));s.tackleUpgrade=Math.min(...all.map(x=>x.equipped>s.tackle?5:x.owned[x.equipped]));}
export const fullyEquipped=s=>SLOTS.every(x=>ensureEquipment(s)[x.id].equipped!==null);
export function equipmentStats(s){const e=s.equipment||ensureEquipment({...s});const relative=id=>{const x=e[id];return x.equipped===null?0:itemPower(x.equipped,x.owned[x.equipped])/1.8**s.region;};
 const rod=relative('rod'),reel=relative('reel'),hook=relative('hook'),line=relative('line'),float=relative('float');
 return {power:SLOTS.every(x=>e[x.id].equipped!==null)?Math.max(.12,.85*rod**.5*reel**.3*hook**.2):0,tension:Math.max(.55,Math.min(1.5,1/Math.max(.1,line)**.22)),biteBonus:e.float.equipped===null?0:Math.min(1.5,.5*Math.sqrt(float))};
}
export function changeEquipment(s,action,slot,tier){
 if(!SLOTS.some(x=>x.id===slot)||!Number.isInteger(tier)||!TACKLE[tier])return false;
 const x=ensureEquipment(s)[slot],rank=x.owned[tier],level=playerLevel(s);
 if(action==='equip'){if(rank===undefined||level<TACKLE[tier].level)return false;x.equipped=tier;}
 else if(action==='unequip'){if(x.equipped!==tier)return false;x.equipped=null;}
 else if(action==='buy'||action==='enhance'){
  if(action==='buy'&&(rank!==undefined||tier>0&&x.owned[tier-1]!==5||level<TACKLE[tier].level))return false;
  if(action==='enhance'&&(rank===undefined||rank>=5||level<gearRequiredLevel(tier,rank+1)))return false;
  const price=itemPrice(slot,tier,action==='buy'?null:rank);if(s.debt>0||s.coins<price)return false;s.coins-=price;s.stats.spent+=price;x.owned[tier]=action==='buy'?0:rank+1;
 }else return false;
 syncEquipment(s);return true;
}
export function rodEffect(s){const x=ensureEquipment(s).rod,t=x.equipped??0;return {tier:t,hue:(35+t*137.508)%360,motif:t%5,rank:x.equipped===null?0:x.owned[t]};}
