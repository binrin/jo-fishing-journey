import {activityWeight,ecology} from './ecology.js';
import {FISH} from './data.js';
export const castTargets=(rng=Math.random)=>({direction:.18+rng()*.64,power:.18+rng()*.64});
export function castResult(target,direction,power){const error=Math.max(Math.abs(target.direction-direction),Math.abs(target.power-power));return {perfect:error<=.09,quality:Math.max(.8,1.2-error*.6)};}
export const fishPeriod=f=>ecology(f).profile;
export const fishWeight=(f,grade,quality=1)=>Math.max(.01,Math.round((.15+(f.id%17)*.12+Math.min(...f.regions)*.18)*(f.boss?12:1)*([1.8,1,.55][grade])*quality**3*100)/100);
export const weightLabel=x=>`${x.weightKg.toFixed(2)} kg · ${x.pricePerKg.toLocaleString('ko-KR',{maximumFractionDigits:2})} G/kg`;
export function availableFish(region,s){return FISH.filter(f=>f.regions.includes(region)&&!f.boss&&activityWeight(f,s)>0);}
