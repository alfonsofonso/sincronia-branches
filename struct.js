//struct
let arrMotiveLong=[];
let arrMotiveLong2=[];

function veloLoop(a){
  if(lastSynth==sinte2){
    var or=quantization.indexOf(subdivision2);
    if(or>0 && a<0){
      subdivision2=quantization[or-1];
    }else if(or<quantization.length-1 && a>0){
      subdivision2=quantization[or+1];
    }
    record2(arrMotive2)
    log("veloloop2= "+subdivision2+ " "+or)
  }else {
    var ord=quantization.indexOf(subdivision);
    if(ord>0&&a<0){
      subdivision=quantization[ord-1]
    }else if(ord<quantization.length-1&&a>0){
      subdivision=quantization[ord+1];
    }
    record(arrMotive)
    log("veloloop= "+subdivision+ " "+ord)
  }
}

function duraNotaLoop(a){
  if(lastSynth==sinte2){
    var ord=quantization.indexOf(longNoteRec2);
    if(a<0&&ord>0){
      longNoteRec2=quantization[ord-1];
    }else if(a>0&&ord<quantization.length-1){
      longNoteRec2=quantization[ord+1];
    }
    log("noteLength2= "+longNoteRec2)

  }else{
    var ord=quantization.indexOf(longNoteRec);
    if(a<0&&ord>0){
      longNoteRec=quantization[ord-1];
    }else if(a>0&&ord<quantization.length-1){
      longNoteRec=quantization[ord+1];
    }
    log("noteLength= "+longNoteRec)
  }
}

function subeybaja(a){
  let arrTemp=[];
  if(lastSynth==sinte2){
    arrTemp=dameAlturas(arrMotive2);
    if(a>0){
      var nota=arrTemp.shift();//coje la nota mas grave
      var n=arrMotive2.indexOf(nota);
      arrMotive2[n]=cambiaOctava(nota,1);
    }else if(a<0){
      var nota=arrTemp.splice(arrTemp.length-1).toString();/// coge la mas aguda
      var n=arrMotive2.indexOf(nota);
      nota=cambiaOctava(nota.toString(),-1);
      arrMotive2[n]=nota;
    }
    record2(arrMotive2)
    restructArrMotiveLong2();
  }else{// sinte 1
    arrTemp=dameAlturas(arrMotive);
    if(a>0){
      var nota=arrTemp.shift();//coje la nota mas grave
      var n=arrMotive.indexOf(nota);
      arrMotive[n]=cambiaOctava(nota,1);
    }else if(a<0){
      var nota=arrTemp.splice(arrTemp.length-1).toString();/// coge la mas aguda
      var n=arrMotive.indexOf(nota);
      nota=cambiaOctava(nota.toString(),-1);
      arrMotive[n]=nota;
    }
    record(arrMotive);
    restructArrMotiveLong()
  }
}

function lengthMotive(a){
  if(lastSynth==sinte2){
    if(a<0){
      arrMotive2.pop();
    }else if(a>0&&arrMotive2.length<arrMotiveLong2.length){
        arrMotive2.push(arrMotiveLong2[arrMotive2.length]);
    }
    log("arrMotive2.length="+arrMotive2.length)
    record2(arrMotive2)
  }
  else{//sinth 1
    if(a<0){
      arrMotive.pop();
    }else if(a>0&&arrMotive.length<arrMotiveLong.length){
      arrMotive.push(arrMotiveLong[arrMotive.length]);
    }
    log("arrMotive.length="+arrMotive.length)
    record(arrMotive)
  }
}

function tuneUp(a){
  if(lastSynth==sinte2){
    if(a<0){
      for(var i=0;i<arrMotive2.length;i++){
        arrMotive2[i]=semitoneTrans(arrMotive2[i],false)
      }
    }else{
      for(var i=0;i<arrMotive2.length;i++){
        arrMotive2[i]=semitoneTrans(arrMotive2[i],true)
      }
    }
    record2(arrMotive2);
    restructArrMotiveLong2();
  }else {
    if(a<0){
      for(var i=0;i<arrMotive.length;i++){
        arrMotive[i]=semitoneTrans(arrMotive[i],false)
      }
    }else{
      for(var i=0;i<arrMotive.length;i++){
        arrMotive[i]=semitoneTrans(arrMotive[i],true)
      }
    }
    record(arrMotive);
    restructArrMotiveLong()
  }
}


//helpers
function dameAlturas(ar){// devuelve un array con las notas ordenadas
  var alturas=ar.slice();
  alturas.sort(ordenaNotas);
  alturas.sort(ordenaOctavas);
  return alturas
}
function ordenaOctavas(a,b){
      if(a[a.length-1]<b[b.length-1]){return -1}
      else if(a[a.length-1]>b[b.length-1]){return 1}
      else{return 0}
}
function ordenaNotas(a,b){
  a=a.substring(0,a.length-1);
  b=b.substring(0,b.length-1);
  if (notasLetras.indexOf(a)<notasLetras.indexOf(b)){
    return -1
  }else if(notasLetras.indexOf(a)>notasLetras.indexOf(b)){
    return 1
  }else{
    return 0
  }
}

function cambiaOctava(n,parriba){//cambia la octava de n segun parriba
  var no=n.slice(0,n.length-1);
  var octava=parseInt(n[n.length-1]);
  octava+=parriba;
  if (octava<1){octava=1}else if(octava>8){octava=8}
  no=no+octava;
  return no;
}
function semitoneTrans(n,parriba){
  let no=n.slice(0,n.length-1);
  let octava=parseInt(n[n.length-1]);
  let index=notasLetras.indexOf(no);
  if(parriba){
    if(index==notasLetras.length-1){
      no=notasLetras[0];
      octava++;
    }else{
      no=notasLetras[index+1];
    }
  }else{
    if(index==0){
      no=notasLetras[notasLetras.length-1];
      octava--;
    }else{
      no=notasLetras[index-1];
    }
  }
  return no+octava;
}

function restructArrMotiveLong(){
  let o=parseInt(arrMotive[0][arrMotive[0].length-1]);//first octave in motive
  arrMotiveLong=[];//arrMotive.slice();

  for(let i=0;i<(8-o);i++){// repeat octaves till 8
    for(let j=0;j<arrMotive.length;j++){   //repeat for each motive note
        let n=cambiaOctava(arrMotive[j],i)
        arrMotiveLong.push(n);
    }
  }
  log("arrMotive.length: "+arrMotive.length);
}
function restructArrMotiveLong2(){
  let o=parseInt(arrMotive2[0][arrMotive2[0].length-1]);
  arrMotiveLong2=[];

  log("arrMotive2.length: "+arrMotive2.length)
  for(let i=0;i<(8-o);i++){// repite las octavas que queden
    for(let j=0;j<arrMotive2.length;j++){   //repite por cada nota del motvo
        let n=cambiaOctava(arrMotive2[j],i)
        arrMotiveLong2.push(n);
    }
  }
}
