// Central open water shared by the 30 illustrated backgrounds; avoid banks and sky.
export const WATER_ZONE=Object.freeze({left:40,right:60,far:64,near:70});
export function castLanding(aim,power){
 const bounded=n=>Math.min(1,Math.max(0,Number.isFinite(n)?n:.5));
 return {x:(WATER_ZONE.left+(WATER_ZONE.right-WATER_ZONE.left)*bounded(aim))*10,y:(WATER_ZONE.near-(WATER_ZONE.near-WATER_ZONE.far)*bounded(power))*10};
}
