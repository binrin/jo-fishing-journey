import {FIND_ITEMS,FIND_BAGS,findCapacity,findCount,buyFindBag,sellFinds,findSaleQuote} from './finds.js';

const number=new Intl.NumberFormat('ko-KR');
const fmt=value=>number.format(value);
const chance=value=>`${fmt(value*100)}%`;
const pageSize=6;
const bagIcon='<svg width="24" height="24" aria-hidden="true"><use href="assets/harbor-icons.svg#item-bag"></use></svg>';
const itemById=new Map(FIND_ITEMS.map(item=>[item.id,item]));
const tile=item=>`<span class="find-icon" aria-hidden="true">${item.icon}</span>`;

export function findResult(items,missed=0,full=false){
 const received=FIND_ITEMS.filter(item=>items?.[item.id]>0);
 if(!received.length&&!missed)return '';
 return `<section class="find-result"><strong>발견물</strong>${received.length?`<ul>${received.map(item=>`<li>${tile(item)} ${item.name} ×${fmt(items[item.id])}</li>`).join('')}</ul>`:''}${missed?`<p>가방이 가득 차 ${fmt(missed)}개를 담지 못했어요.</p>`:full?'<p>발견물 가방이 가득 찼어요.</p>':''}<button class="secondary" type="button" data-do="finds-open">발견물 가방 열기</button></section>`;
}

export function createFindsUI({button,body,getState,show,save,render,toast,canOpen,settle}){
 let page=0,shop=false,selection=null;
 const owned=s=>FIND_ITEMS.filter(item=>s.finds.items[item.id]>0);
 function open(view=shop){
  shop=view;
  const s=getState(),capacity=findCapacity(s),count=findCount(s),stock=owned(s);
  const pages=Math.max(1,Math.ceil(stock.length/pageSize));
  page=Math.min(page,pages-1);
  const next=FIND_BAGS[s.finds.tier+1];
  const bags=FIND_BAGS.map((bag,tier)=>`<li><b>${tier+1}단계</b><span>${fmt(bag.capacity)}칸</span><span>${tier===0?'기본':`${fmt(bag.price)} G`}</span>${tier===s.finds.tier?'<strong>사용 중</strong>':'<span></span>'}</li>`).join('');
  const items=stock.slice(page*pageSize,(page+1)*pageSize).map(item=>{
   const qty=s.finds.items[item.id];
   return `<li class="find-item">${tile(item)}<div><strong>${item.name}</strong><small>${item.rarityLabel} · ${fmt(item.value)} G / 개</small></div><b>×${fmt(qty)}</b>${shop?`<div class="find-sale-actions"><button type="button" data-do="finds-one" data-id="${item.id}">1개 판매</button>${qty>1?`<button type="button" data-do="finds-stack" data-id="${item.id}">${fmt(qty)}개 판매</button>`:''}</div>`:''}</li>`;
  }).join('');
  const kit=`<details class="find-details"><summary>발견 확률과 매입가</summary><p>낚시에 성공하면 빈 칸에 발견물 한 개를 넣어요. 발견물 한 개가 한 칸을 차지해요.</p><ul class="find-prices">${FIND_ITEMS.map(item=>`<li><span>${item.icon} ${item.name}</span><b>${chance(item.chance)}</b><span>${fmt(item.value)} G</span></li>`).join('')}</ul></details>`;
  const upgrade=next?`<div class="find-upgrade"><div><strong>다음 가방 · ${fmt(next.capacity)}칸</strong><small>${s.debt>0?'미끼 외상을 먼저 갚아 주세요.':s.coins<next.price?`금화 ${fmt(next.price-s.coins)} G 부족`:'발견물은 새 가방으로 옮겨져요.'}</small></div><button type="button" data-do="finds-buy" ${s.debt>0||s.coins<next.price?'disabled':''}>구매<br>${fmt(next.price)} G</button></div>`:'<p class="notice">200칸 가방을 사용 중이에요.</p>';
  const manage=shop?`<button class="secondary" type="button" data-do="finds-junk" ${stock.some(item=>item.rarity==='junk')?'':'disabled'}>잡동사니 선택</button>`:'';
  const pager=pages>1?`<nav class="find-pager" aria-label="발견물 목록 페이지"><button type="button" data-do="finds-prev" ${page?'':'disabled'} aria-label="이전 페이지">‹</button><span>${page+1} / ${pages}</span><button type="button" data-do="finds-next" ${page+1<pages?'':'disabled'} aria-label="다음 페이지">›</button></nav>`:'';
  show(shop?'발견물 상점':'발견물 가방',`<div class="find-heading">${bagIcon}<div><strong>${fmt(count)} / ${fmt(capacity)}칸</strong><span>${s.finds.tier+1}단계 가방${count>=capacity?' · 가득 참':''}</span></div></div><div class="find-tabs"><button type="button" data-do="finds-bag" aria-pressed="${!shop}">가방</button><button type="button" data-do="finds-shop" aria-pressed="${shop}">상점</button></div>${manage}${items?`<ul class="find-items">${items}</ul>${pager}`:'<p class="notice">아직 발견물이 없어요. 낚시에 성공하면 가방에 모여요.</p>'}${shop?upgrade:''}<details class="find-details"><summary>가방 10단계와 가격</summary><ul class="find-upgrades">${bags}</ul></details>${kit}`,'finds');
 }
 function confirmSale(entries){
  const s=getState();
  const count=entries.reduce((total,[,qty])=>total+qty,0);
  const gold=entries.reduce((total,[id,qty])=>total+findSaleQuote(s,id,qty),0);
  if(!count||!gold){open(true);return;}
  selection=entries;
  show('발견물을 판매할까요?',`<div class="find-quote"><ul>${entries.map(([id,qty])=>`<li><span>${itemById.get(id).name}</span><b>${fmt(qty)}개</b></li>`).join('')}</ul><p><span>합계 ${fmt(count)}개</span><strong>${fmt(gold)} G</strong></p></div><button class="primary" type="button" data-do="finds-confirm">판매 · ${fmt(gold)} G</button><button class="secondary" type="button" data-do="finds-shop">돌아가기</button>`,'finds-sale');
 }
 body.addEventListener('click',event=>{
  const action=event.target.closest('button[data-do^="finds-"]');
  if(!action||action.disabled)return;
  event.stopImmediatePropagation();
  const {do:cmd,id}=action.dataset;
  if(cmd==='finds-open'||cmd==='finds-bag'||cmd==='finds-shop'){
   if(cmd==='finds-open')page=0;
   selection=null;
   open(cmd==='finds-shop');
  }else if(cmd==='finds-prev'||cmd==='finds-next'){
   page=Math.max(0,page+(cmd==='finds-prev'?-1:1));
   open();
  }else if(cmd==='finds-buy'){
   settle();
   const s=getState();
   if(buyFindBag(s)){save();render();open();toast(`발견물 가방이 ${fmt(findCapacity(s))}칸으로 늘었어요.`);}
   else{open();toast('금화와 외상을 확인해 주세요.');}
  }else if(cmd==='finds-one'||cmd==='finds-stack'||cmd==='finds-junk'){
   const s=getState();
   const selected=cmd==='finds-junk'?owned(s).filter(item=>item.rarity==='junk').map(item=>[item.id,s.finds.items[item.id]]):[[id,cmd==='finds-stack'?s.finds.items[id]:1]];
   confirmSale(selected);
  }else if(cmd==='finds-confirm'&&selection){
   settle();
   const s=getState();
   const gold=selection.reduce((total,[key,qty])=>total+sellFinds(s,key,qty),0);
   selection=null;
   save();render();open(true);
   if(gold)toast(`발견물 판매 · +${fmt(gold)} G`);
  }
 });
 button.addEventListener('click',()=>{
  if(!canOpen()){toast('낚시를 마친 뒤 발견물 가방을 열 수 있어요.');return;}
  page=0;
  selection=null;
  open(false);
 });
 function update(){
  const s=getState(),count=findCount(s),capacity=findCapacity(s);
  button.querySelector('span').hidden=!count;
  button.setAttribute('aria-label',`발견물 가방 ${fmt(count)} / ${fmt(capacity)}칸`);
  button.classList.toggle('finds-full',count>=capacity);
 }
 return {update,full:()=>findCount(getState())>=findCapacity(getState())};
}
