//quotes: visual 2
var citas="- Somewhere, something incredible is waiting to be known. - If you want to make an apple pie from scratch, you must first create the universe. - Imagination will often carry us to worlds that never were. But without it we go nowhere. - For small creatures such as we the vastness is bearable only through love. - For me, it is far better to grasp the Universe as it really is than to persist in delusion, however satisfying and reassuring. - Absence of evidence is not evidence of absence. - We’re made of star stuff. We are a way for the cosmos to know itself. - We are like butterflies who flutter for a day and think it is forever. - Science is not only compatible with spirituality; it is a profound source of spirituality. - Every one of us is, in the cosmic perspective, precious. If a human disagrees with you, let him live. In a hundred billion galaxies, you will not find another. _ Carl Sagan dixit. " +
"Any sufficiently advanced technology is indistinguishable from magic. - The only way to discover the limits of the possible is to go beyond them into the impossible. - It has yet to be proven that intelligence has any survival value. - Politicians should read science fiction, not westerns and detective stories. - It may be that our role on this planet is not to worship God - but to create him. - The greatest tragedy in mankind's entire history may be the hijacking of morality by religion. - There is hopeful symbolism in the fact that flags do not wave in a vacuum. - Human judges can show mercy. But against the laws of nature, there is no appeal. - How inappropriate to call this planet Earth when it is clearly Ocean. - Sometimes I think we're alone in the universe, and sometimes I think we're not. In either case the idea is quite staggering. _ Arthur C. Clarke dixit. "
+ "Any planet is 'Earth' to those that live on it. - Intelligence is an accident of evolution, and not necessarily an advantage. - Life is pleasant. Death is peaceful. It's the transition that's troublesome. - Creationists make it sound as though a 'theory' is something you dreamt up after being drunk all night. - I do not fear computers. I fear the lack of them. - Violence is the last refuge of the incompetent - Never let your sense of morals get in the way of doing what's right. - “Tell me why the stars do shine, Tell me why the ivy twines, Tell me what makes skies so blue, And I'll tell you why I love you. Nuclear fusion makes stars to shine, Tropisms make the ivy twine, Raleigh scattering make skies so blue, Testicular hormones are why I love you. ” - There are no nations! There is only humanity. And if we don't come to understand that right soon, there will be no nations, because there will be no humanity. - The easiest way to solve a problem is to deny it exists"
+ "- It seems to me, Golan, that the advance of civilization is nothing but an exercise in the limiting of privacy. - Science fiction writers foresee the inevitable, and although problems and catastrophes may be inevitable, solutions are not. - If a conclusion is not poetically balanced, it cannot be scientifically true. - She's qualified all right. She understands robots like a sister—comes from hating human beings so much, I think - Changelessness is decay - Of course there are worlds. Millions of them! Every star you see has worlds, and most of those you don't see. - It is the invariable lesson to humanity that distance in time, and in space as well, lends focus. - The colonization of space is the only possible salvation of Earth."
+ " - “The stars, like dust, encircle me In living mists of light; And all of space I seem to see In one vast burst of sight” - Through hyper-space, that unimaginable region that was neither space nor time, matter nor energy, something nor nothing, one could traverse the length of the Galaxy in the interval between two neighboring instants of time. _ Isaac Asimov dixit. ";


var pantalla=document.getElementById("pantalla");
var contadorPalabras=0;
var quoteBomb=false;
var quoteHH=false;
var quoteSnare=false;
var quoteNote=false;
var quoteRec1=false;
var quoteRec2=false;

function ponPalabra(a){
  pantalla.value=citas[contadorPalabras];
  contadorPalabras++;
  if(contadorPalabras>=citas.length){contadorPalabras=0}
}

function creaPalabras(){
  citas=citas.split(" ")
}
