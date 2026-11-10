export function tensionWarning(tension,previous='safe'){
 if(tension>=90||previous==='critical'&&tension>=86)return 'critical';
 if(tension>=75||previous!=='safe'&&tension>=70)return 'warning';
 return 'safe';
}
export function createReelFeedback({sound,vibrate,cancelVibration=()=>{}}){
 let mode='idle',severity='safe',lastPulse=-Infinity,lastAlarm=-Infinity,wasActive=false;
 return {
  update({active,winding,releasing,tension,now,muted,haptics}){
   if(!active){this.stop();return 'safe';}
   wasActive=true;
   const nextMode=releasing?'release':winding?'wind':'idle',nextSeverity=tensionWarning(tension,severity);
   if(nextMode!==mode){lastPulse=-Infinity;mode=nextMode;}
   if(nextSeverity!==severity){if(nextSeverity!=='safe')lastAlarm=-Infinity;severity=nextSeverity;}
   if(severity==='critical'&&now-lastAlarm>=1000){
    if(!muted)sound('line-danger');if(haptics)vibrate([24,50,40]);lastAlarm=now;lastPulse=now;
   }else if(mode!=='idle'&&now-lastPulse>=(mode==='wind'?180:280)){
    if(!muted)sound(mode==='wind'?'reel-wind':'reel-release');
    if(haptics)vibrate(mode==='wind'?7:[4,24,4]);lastPulse=now;
   }
   return severity;
  },
  stop(){if(wasActive)cancelVibration();wasActive=false;mode='idle';severity='safe';lastPulse=lastAlarm=-Infinity;}
 };
}
