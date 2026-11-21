import {courseCenter} from './race.js';

const clamp=(n,min,max)=>Math.max(min,Math.min(n,max));
const fraction=n=>n-Math.floor(n);
const noise=n=>fraction(Math.sin(n*127.1+311.7)*43758.5453);
const tau=Math.PI*2;

function sprite(src){
 const image=new Image();
 image.src=src;
 return image;
}

function polygon(ctx,points,fill){
 ctx.beginPath();
 points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
 ctx.closePath();
 ctx.fillStyle=fill;
 ctx.fill();
}

function ellipse(ctx,x,y,rx,ry,fill){
 ctx.beginPath();
 ctx.ellipse(x,y,rx,ry,0,0,tau);
 ctx.fillStyle=fill;
 ctx.fill();
}

function stroke(ctx,points,color,width){
 ctx.beginPath();
 points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
 ctx.strokeStyle=color;
 ctx.lineWidth=width;
 ctx.stroke();
}

function drawBuoy(ctx,x,y,size,color,t,variant){
 const bob=Math.sin(t*2.8+x*.04)*size*.14;
 const py=y+bob;
 ellipse(ctx,x,y+size*.26,size*1.65,size*.31,'#aedce443');
 ellipse(ctx,x,y+size*.12,size*.9,size*.22,'#092f4380');
 polygon(ctx,[[x-size*.76,py],[x-size*.6,py-size*.96],[x+size*.55,py-size*.96],[x+size*.74,py]],color);
 ellipse(ctx,x,py-size*.94,size*.58,size*.25,'#fff8de');
 ellipse(ctx,x,py,size*.76,size*.25,color);
 ctx.fillStyle='#fff7cb';
 ctx.fillRect(x-size*.65,py-size*.56,size*1.28,size*.22);
 if(variant==='edge')return;
 stroke(ctx,[[x,py-size*.95],[x,py-size*2.15]],'#dcffed',Math.max(1,size*.13));
 polygon(ctx,[[x,py-size*2.15],[x+size*1.18,py-size*1.94],[x,py-size*1.60]],variant==='finish'?'#fff6bd':color);
}

function drawRock(ctx,x,y,width,seed){
 const height=width*(.33+noise(seed)*.18);
 ellipse(ctx,x,y+height*.42,width*1.25,height*.34,'#bde1da68');
 ellipse(ctx,x,y+height*.27,width,height*.32,'#10384b94');
 polygon(ctx,[[x-width,y],[x-width*.61,y-height*.95],[x+width*.06,y-height],[x+width*.54,y-height*.70],[x+width,y],[x+width*.44,y+height*.39],[x-width*.53,y+height*.31]],'#637b80');
 polygon(ctx,[[x-width*.61,y-height*.95],[x+width*.06,y-height],[x+width*.54,y-height*.70],[x+width*.09,y-height*.39],[x-width*.42,y-height*.38]],'#9caea2');
 polygon(ctx,[[x+width*.09,y-height*.39],[x+width*.54,y-height*.70],[x+width,y],[x+width*.44,y+height*.39]],'#3e596b');
}

function drawFallbackBoat(ctx,size,color){
 ellipse(ctx,0,size*.35,size*.38,size*.19,'#183848ab');
 polygon(ctx,[[0,-size*.65],[-size*.34,-size*.20],[-size*.42,size*.35],[-size*.27,size*.53],[size*.27,size*.53],[size*.42,size*.35],[size*.34,-size*.20]],'#213b48');
 polygon(ctx,[[0,-size*.61],[-size*.31,-size*.17],[-size*.37,size*.28],[size*.37,size*.28],[size*.31,-size*.17]],color);
 polygon(ctx,[[-size*.37,size*.28],[size*.37,size*.28],[size*.25,size*.48],[-size*.25,size*.48]],'#eeeccf');
 polygon(ctx,[[-size*.23,size*.20],[-size*.19,-size*.20],[size*.19,-size*.20],[size*.23,size*.20]],'#e8ecde');
 polygon(ctx,[[-size*.18,-size*.17],[size*.18,-size*.17],[size*.20,-size*.03],[-size*.20,-size*.03]],'#2e6474');
 ctx.fillStyle='#213745';
 ctx.fillRect(-size*.095,size*.27,size*.19,size*.26);
}

function drawWake(ctx,x,y,size,t,powered,seed){
 const length=size*(powered?2.3:1.48);
 for(const side of [-1,1]){
  ctx.beginPath();
  ctx.moveTo(x+side*size*.18,y+size*.2);
  ctx.quadraticCurveTo(x+side*size*.34,y+length*.59,x+side*size*.9,y+length);
  ctx.lineTo(x+side*size*.68,y+length*.89);
  ctx.quadraticCurveTo(x+side*size*.28,y+length*.52,x+side*size*.12,y+size*.23);
  const foam=ctx.createLinearGradient(x,y+size*.2,x,y+length);
  foam.addColorStop(0,powered?'#e9fffaff':'#e7fcfae8');
  foam.addColorStop(.57,powered?'#77f4ffbc':'#baf7f49a');
  foam.addColorStop(1,'#81e7f500');
  ctx.fillStyle=foam;
  ctx.fill();
  for(let i=0;i<8;i++){
   const d=fraction(t*(powered?1.55:1.1)+i/8+seed*.13);
   const spread=.13+d*d*.84+noise(seed*8+i)*.1;
   ctx.globalAlpha=(1-d)*.54;
   ellipse(ctx,x+side*size*spread,y+size*.25+length*d,size*(.025+.06*d),Math.max(.4,size*.026),'#e8fffa');
   ctx.globalAlpha=1;
  }
 }
}

export function createRaceScene(canvas,r){
 const ctx=canvas.getContext('2d');
 const horizonImage=sprite('assets/race-horizon.webp');
 const boats=Array.from({length:3},(_,i)=>sprite('assets/race-stern-'+i+'.webp'));
 const {course,player}=r;
 let cameraX=player.x,heading=0,water,width=0,height=0,dpr=0;

 return function draw(dt){
  const w=canvas.clientWidth,h=canvas.clientHeight;
  if(!w||!h)return;
  const pixelRatio=Math.min(2,window.devicePixelRatio||1);
  const horizon=h*(w>h*1.3?.29:.33);
  const base=h*(w>h*1.3?.69:.72);
  if(w!==width||h!==height||pixelRatio!==dpr){
   width=w;height=h;dpr=pixelRatio;
   canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
   ctx.setTransform(dpr,0,0,dpr,0,0);
   water=ctx.createLinearGradient(0,horizon,0,h);
   water.addColorStop(0,'#77bac1');
   water.addColorStop(.2,'#287f97');
   water.addColorStop(.68,'#13728e');
   water.addColorStop(1,'#06485f');
  }
  const settle=1-Math.exp(-Math.min(dt,.05)*4.2);
  const aim=(courseCenter(course,player.at+92)-courseCenter(course,player.at))/92;
  cameraX+=(player.x-cameraX)*settle;
  heading+=(aim*.48+player.side*.0009-heading)*settle;
  const unit=clamp(Math.min(w/(course.width*1.47),h/150),1.32,3.7),lens=94;
  const near=player.at-lens*(1-(base-horizon)/(h-horizon))+.1;
  const far=player.at+1170;
  const project=(x,at)=>{
   const distance=at-player.at;
   const depth=lens/Math.max(1,lens+distance);
   const center=w*.5+(x-cameraX-heading*distance)*unit*depth;
   return [center,horizon+(base-horizon)*depth,depth];
  };

  ctx.fillStyle='#a9d9db';
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle=water;
  ctx.fillRect(0,horizon,w,h-horizon);
  if(horizonImage.naturalWidth){
   const widthAtHorizon=Math.max(w+60,(horizon/.335)*horizonImage.naturalWidth/horizonImage.naturalHeight);
   const pictureLeft=(w-widthAtHorizon)/2-heading*27;
   const sourceHorizon=Math.round(horizonImage.naturalHeight*.335);
   ctx.drawImage(horizonImage,0,0,horizonImage.naturalWidth,sourceHorizon,pictureLeft,0,widthAtHorizon,horizon);
   ctx.drawImage(horizonImage,0,sourceHorizon,horizonImage.naturalWidth,horizonImage.naturalHeight-sourceHorizon,pictureLeft,horizon,widthAtHorizon,h-horizon);
   const blend=ctx.createLinearGradient(0,horizon,0,h);
   blend.addColorStop(0,'#13738e00');
   blend.addColorStop(.56,'#11678128');
   blend.addColorStop(1,'#03445c9e');
   ctx.fillStyle=blend;
   ctx.fillRect(0,horizon,w,h-horizon);
  }else{
   polygon(ctx,[[0,horizon],[0,horizon-20],[w*.16,horizon-47],[w*.29,horizon-32],[w*.39,horizon],[w*.66,horizon],[w*.81,horizon-33],[w,horizon-20],[w,horizon]],'#6b9e9a');
  }

  // World-space ripples drift past the camera at the boat's speed.
  ctx.lineCap='round';
  for(let row=Math.ceil(near/18);row<=far/18;row++){
   const at=row*18;
   for(let i=0;i<18;i++){
    const seed=row*19+i,x=(i-8.5)*118+(noise(seed)-.5)*120;
    const [px,py,k]=project(x,at+noise(seed+100)*15);
    const half=(10+noise(seed+291)*28)*unit*k;
    if(px+half<0||px-half>w)continue;
    const shimmer=Math.sin(r.time*1.9+seed)*.035;
    ctx.globalAlpha=clamp(.12+k*.15+shimmer,.05,.36);
    ctx.beginPath();
    ctx.moveTo(px-half,py);
    ctx.quadraticCurveTo(px-half*.18,py-3*k,px+half,py+.7*k);
    ctx.strokeStyle=i%4===0?'#052e48':'#bfe6e0';
    ctx.lineWidth=clamp(k*1.32,.55,2.6);
    ctx.stroke();
   }
  }
  ctx.globalAlpha=1;

  // Sparse foam follows the recommended line while floating markers bound the channel.
  for(let at=Math.ceil(near/28)*28;at<Math.min(far,course.length);at+=28){
   const mid=courseCenter(course,at);
   const a=project(mid,at),b=project(courseCenter(course,at+10),at+10);
   stroke(ctx,[a,b],'#fbfae68a',clamp(a[2]*1.65,.45,2.35));
  }

  for(const area of course.braking){
   if(area.end<near||area.start>far)continue;
   for(let at=Math.max(area.start,near);at<area.end;at+=11){
    const a=courseCenter(course,at),b=courseCenter(course,at+4.5),lane=course.width*.42;
    polygon(ctx,[project(a-lane,at),project(a+lane,at),project(b+lane,at+4.5),project(b-lane,at+4.5)],'#ff896b62');
   }
  }

  const objects=[];
  for(let at=Math.max(0,Math.ceil(near/39)*39);at<Math.min(far,course.length);at+=39){
   const mid=courseCenter(course,at);
   for(const side of [-1,1]){
    const x=mid+side*course.width*.5;
    objects.push({at,x,kind:'edge',color:side<0?'#ee7450':'#e4ad4d'});
   }
  }
  for(const gate of course.gates){
   if(gate.at<near||gate.at>far||r.gates.has(gate))continue;
   for(const side of [-1,1])objects.push({at:gate.at,x:gate.x+side*gate.radius,kind:'gate',color:'#47e099'});
   const [x,y,k]=project(gate.x,gate.at);
   const [lx]=project(gate.x-gate.radius,gate.at),[rx]=project(gate.x+gate.radius,gate.at);
   const glow=ctx.createLinearGradient(lx,y,rx,y);
   glow.addColorStop(0,'#9dfac5b0');glow.addColorStop(.5,'#adf9b830');glow.addColorStop(1,'#9dfac5b0');
   polygon(ctx,[[lx,y],[rx,y],[rx-2*k,y+8*k],[lx+2*k,y+8*k]],glow);
   const size=8*k;
   stroke(ctx,[[x-size,y+size*.57],[x,y-size*.4],[x+size,y+size*.57]],'#e1ffe0',Math.max(.7,2*k));
  }
  for(const rock of course.hazards){
   if(rock.at>=near&&rock.at<=far)objects.push({...rock,kind:'rock'});
  }

  if(course.length>=near&&course.length<=far){
   const at=course.length,mid=courseCenter(course,at),left=mid-course.width*.52,cell=course.width*1.04/14;
   for(let row=0;row<2;row++){
    for(let col=0;col<14;col++){
     const x=left+col*cell,from=at+row*6;
     polygon(ctx,[project(x,from),project(x+cell,from),project(x+cell,from+6),project(x,from+6)],(row+col)%2?'#173641d9':'#fff4dceb');
    }
   }
   objects.push({at,x:left,kind:'finish',color:'#e7ad50'},{at,x:mid+course.width*.52,kind:'finish',color:'#e7ad50'});
  }

  r.teams.forEach((team,i)=>{
   if(team.at>=near&&team.at<=far)objects.push({at:team.at,x:team.x,team,i,kind:'boat'});
  });
  objects.push({at:player.at,x:player.x,team:player,i:r.boatSprite,kind:'boat'});
  objects.sort((a,b)=>b.at-a.at);

  for(const {at,x,kind,color,radius,team,i} of objects){
   const [px,py,k]=project(x,at);
   if(px<-200||px>w+200)continue;
   if(kind==='rock'){
    drawRock(ctx,px,py,radius*k*unit,at);
    continue;
   }
   if(kind!=='boat'){
    drawBuoy(ctx,px,py,Math.max(1.15,unit*k*(kind==='edge'?3:4.8)),color,r.time,kind);
    continue;
   }
   const self=team===player;
   const size=Math.min(unit*33,h*.094)*k*(self?1:.60);
   const bob=Math.sin(r.time*4+i)*size*.023;
   if(self)ellipse(ctx,px,py+size*.28,size*.5,size*.17,'#fff4be91');
   if(r.time>0&&(!self||player.speed>7))drawWake(ctx,px,py,size,r.time,self&&player.boosting,i);
   ctx.save();
   ctx.translate(px,py+bob);
   ctx.rotate(self?clamp(player.side*.0022,-.37,.37):0);
   const boat=boats[i%3];
   if(boat?.naturalWidth){
    const width=size*1.33,height=width*boat.naturalHeight/boat.naturalWidth;
    ellipse(ctx,0,size*.21,size*.39,size*.16,'#052e476a');
    ctx.drawImage(boat,-width/2,-height*.64,width,height);
   }else drawFallbackBoat(ctx,size,team.color);
   if(self){
    const y=-size*.79;
    polygon(ctx,[[-6,y-5],[6,y-5],[0,y+2]],'#fff5bb');
   }
   ctx.restore();
  }
 };
}
