//rayos
var rayos=[];
var numRayos=0;

ponRayo=function(r){
  if(r=="z"){return}
  var  newDiv = document.createElement("div");
  newDiv.style.position="absolute";
  newDiv.style.backgroundColor="rgba(256,256,256,.8)";//getRandomColor();
  newDiv.style.width="3000px";
  newDiv.style.height="10px";
  //newDiv.style.zIndex="-1"
  newDiv.style.filter="blur(5px)";
  //  newDiv.style.animationDuration=girovelo*1000+"ms";
  //newDiv.style.animationDuration=Math.round(10000)+"ms";
  newDiv.style.top=Math.random()*90+"%";
  newDiv.style.left=Math.random()*500-1300+"px";
  document.body.appendChild(newDiv);
  rayos.push(newDiv);
  if(numRayos==rayos.length-1){
  numRayos++;}
}
controlaRayos=function(r){
  if (r<0&&numRayos>0){
      document.body.removeChild(rayos[numRayos-1]);
      numRayos--;
      log("quito rayo")
  }else if(r>0&&rayos.length>numRayos) {
      document.body.appendChild(rayos[numRayos]);
      numRayos++;
          log("pongoo rayo")
  }
}
