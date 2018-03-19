//planets
var meteors=false;//display meteors log
var speed=true;
var starLoc=false;
var velSpacial=12000;
var percVel=300;
var noteVel=1000;
var radioCircle=2;
var radioCircleFinal=24;
var gris=255;

ponEstrella=function(a){// es un circulo-planta-cuadrado-nave
  var vel;
  var ang= Math.random()*360;
  var radius=radio+margen;
  var equis=(radius/(2 + Math.random()*20) )* Math.cos(ang) + amp/2;
  var igriega=(radius/(2 + Math.random()*20) ) * Math.abs(Math.sin(ang)) + alt/2;

  if(a=="b"||a=="c"||a=="s"){//}||a=="z"){//
    ponNave(a);return }
  else{
    vel=velSpacial;
    if (a!="r") {creaDestello(equis,igriega)}
    if (quoteNote){ponPalabra(a)}
  }

  var c = new createjs.Shape();
  c.graphics.beginFill("rgb("+gris+","+gris+","+gris+")").drawCircle(2, 2, radioCircle);
  c.x = equis
  c.y = igriega;
  stage.addChild(c);

  var tamanyo=Math.random()*radioCircleFinal;
  createjs.Tween.get(c)
    .to({ x:radius * Math.cos(ang)+amp/2,y:radius*Math.sin(ang)+alt/2,
      scaleX:tamanyo, scaleY:tamanyo},vel, createjs.Ease.getPowIn(2))
    .call(handleComplete, [c]);
}

ponNave=function(a){ // rectangulos y cuadrados

  var square = new createjs.Shape();
  ang= Math.random()*360;
  var dest=0;
  if(a=="b"){//bombo
    if(instVols[0]<-50||speed==false){return}
    dest=alt;
    square.graphics.beginFill("green").drawRect(-1500, 0, 3000,2)// x y width height
    if (quoteBomb){ponPalabra(a)}
  }else if(a=="c"){//charles

    if(instVols[1]<-50){return}
    dest=-24;
    square.graphics.beginFill("grey").drawRect(-5, -5, 10,10);
    square.rotation=45;
    if (quoteHH){ponPalabra(a)}
  }else if(a=="s"){//if(a=="s"){ caja
    if(instVols[2]<-50){return}
    dest=alt+24;
    square.graphics.beginFill("white").drawRect(-6, -6, 12,12)
    if (quoteSnare){ponPalabra(a)}

  }else{
    log("else ship");
    dest=alt
    square.graphics.beginFill("grey").drawRect(-1400, -1, 2800,2)
  }
  square.x = amp/2;
  square.y = alt/2;
  stage.addChild(square);

  var tamanyo=Math.random()*24;
  if(meteors){log(tamanyo)}
  createjs.Tween.get(square)
    .to({ y:dest,x:Math.random()*3000-1500,
      scaleX:tamanyo, scaleY:tamanyo},percVel, createjs.Ease.getPowIn(4))
    .call(handleComplete, [square]);
}// bombo,charles y caja



creaDestello=function(x,y){
  if(!starLoc){return}
  var destello=new createjs.Shape();
  destello.graphics.beginFill("white").drawRect(-2000,1,4000,1);
  destello.graphics.beginFill("white").drawRect(1,-1000,1,2000);
  destello.x=x;destello.y=y;
  stage.addChild(destello);
  createjs.Tween.get(destello).to({visible:false }, 100).call(handleComplete, [destello]);
}

function velSpaceControl(a){
  velSpacial+=a*100;
  if(velSpacial<0){velSpacial=0;
  }else if(velSpacial>120000){velSpacial=120000}
  log("velSp: "+velSpacial);
}

function cercaniaPlanetas(a){
  if(a>0&&radioCircle<50){
    radioCircle++;
  }else if (a<0&&radioCircle>0){
    radioCircle--;
  }
  log("radioPlantet:" +radioCircle)
}//radio planets
function cercaniaPlanetasFinal(a){
  if(a>0&&radioCircleFinal<500){
    radioCircleFinal++;
  }else if (a<0&&radioCircleFinal>0){
    radioCircleFinal--;
  }
  log("radioNearPlantet:" +radioCircleFinal)
}

function luzPlanetas(a){
  if(a>0&&gris<256){
    gris++;
  }else if (a<0&&gris>1){
    gris--;
  }
  log("#" +gris)
}
