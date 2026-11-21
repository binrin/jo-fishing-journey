import {credit,spend} from './engine.js';

const rarityLabels={junk:'잡동사니',common:'일반',uncommon:'고급',rare:'희귀',treasure:'보물'};
const weights=10000;
export const FIND_ITEMS=Object.freeze([
 ['seaweed','엉킨 물풀','junk',3000,1,'🌿'],
 ['tin','녹슨 깡통','junk',2300,1,'🥫'],
 ['bottle','떠내려온 병','junk',1700,2,'🫙'],
 ['shell','조개껍데기','common',1300,6,'🐚'],
 ['glass','바다 유리','common',700,12,'🔹'],
 ['button','황동 단추','uncommon',500,30,'🟠'],
 ['oldCoin','옛 동전','uncommon',300,70,'🪙'],
 ['amber','호박 원석','rare',150,240,'🟡'],
 ['pearl','진주','rare',45,850,'⚪'],
 ['sapphire','물빛 사파이어','treasure',5,5500,'💎'],
].map(([id,name,rarity,weight,value,icon])=>Object.freeze({id,name,rarity,rarityLabel:rarityLabels[rarity],weight,chance:weight/weights,value,icon})));
const itemsById=new Map(FIND_ITEMS.map(item=>[item.id,item]));

export const FIND_BAGS=Object.freeze([
 [10,0],[20,10000],[35,50000],[50,180000],[70,500000],
 [90,1200000],[115,2800000],[140,5500000],[170,10500000],[200,20000000,'명품가방'],
].map(([capacity,price,name])=>Object.freeze(name?{capacity,price,name}:{capacity,price})));

export const emptyFinds=()=>({tier:0,items:{}});
export const findCapacity=s=>FIND_BAGS[s.finds.tier].capacity;
export const findCount=s=>Object.values(s.finds.items).reduce((sum,count)=>sum+count,0);

export function restoreFindCounts(raw,limit=Number.MAX_SAFE_INTEGER){
 const counts={};
 let remaining=limit;
 for(const {id} of FIND_ITEMS){
  const count=raw?.[id];
  if(!Number.isSafeInteger(count)||count<=0)continue;
  if(remaining<=0)break;
  counts[id]=Math.min(count,remaining);
  remaining-=counts[id];
 }
 return counts;
}

export function restoreFinds(raw){
 const tier=Number.isInteger(raw?.tier)&&FIND_BAGS[raw.tier]?raw.tier:0;
 return {tier,items:restoreFindCounts(raw?.items,FIND_BAGS[tier].capacity)};
}

export function awardFind(s,rng=Math.random){
 if(findCount(s)>=findCapacity(s))return null;
 let roll=rng()*weights;
 for(const item of FIND_ITEMS){
  roll-=item.weight;
  if(roll<0){
   s.finds.items[item.id]=(s.finds.items[item.id]||0)+1;
   return item;
  }
 }
 return null;
}

export function buyFindBag(s){
 const next=FIND_BAGS[s.finds.tier+1];
 if(!next||!spend(s,next.price))return false;
 s.finds.tier++;
 return true;
}

export function findSaleQuote(s,id,quantity){
 const item=itemsById.get(id);
 return item&&Number.isSafeInteger(quantity)&&quantity>0&&quantity<=s.finds.items[id]?item.value*quantity:0;
}

export function sellFinds(s,id,quantity){
 const gold=findSaleQuote(s,id,quantity);
 if(!gold)return 0;
 s.finds.items[id]-=quantity;
 if(!s.finds.items[id])delete s.finds.items[id];
 credit(s,gold);
 return gold;
}

export function sellAllFinds(s,rarity=null){
 let gold=0,count=0;
 for(const item of FIND_ITEMS){
  if(rarity!==null&&item.rarity!==rarity)continue;
  const quantity=s.finds.items[item.id]||0;
  if(!quantity)continue;
  count+=quantity;
  gold+=sellFinds(s,item.id,quantity);
 }
 return {gold,count};
}
