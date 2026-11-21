import {SAVE_KEY, STARTER, validateSave} from './engine.js';

const LEGACY_KEY='joseonsaeng-fishing-v1';
const RESET_KEY=SAVE_KEY+'-initialized';

function obsoleteSaves(storage){
 const obsolete=[];
 for(let i=0;i<storage.length;i++){
  const key=storage.key(i);
  if(key===LEGACY_KEY||key?.startsWith(LEGACY_KEY+'-backup-'))obsolete.push(key);
 }
 return obsolete;
}

export function discardLegacySaves(storage){
 for(const key of obsoleteSaves(storage))storage.removeItem(key);
}

export function loadCurrentSave(storage){
 const saved=storage.getItem(SAVE_KEY);
 let state=STARTER(), loadError=false;
 if(saved!==null){
  try{state=validateSave(JSON.parse(saved));}
  catch{loadError=true;storage.setItem(SAVE_KEY+'-backup-'+Date.now(),saved);}
 }else if(obsoleteSaves(storage).length&&!storage.getItem(RESET_KEY)){
  state.resetNotice=true;
  for(const item of Object.values(state.rewardBoosts))item.count=1;
 }
 const raw=saved??JSON.stringify(state);
 if(saved===null)storage.setItem(SAVE_KEY,raw);
 storage.setItem(RESET_KEY,'1');
 if(!state.resetNotice)discardLegacySaves(storage);
 return {state,raw,loadError};
}

export function keepRewardHistory(current,incoming){
 for(const id of Object.keys(current.rewardBoosts)){
  const before=current.rewardBoosts[id],after=incoming.rewardBoosts[id];
  const from=Math.min(before.from||Infinity,after.from||Infinity);
  incoming.rewardBoosts[id]=Number.isFinite(from)?{count:0,from}:{count:Math.max(before.count,after.count),from:0};
 }
 incoming.resetNotice=current.resetNotice;
 return incoming;
}
