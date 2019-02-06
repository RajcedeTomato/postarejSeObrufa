
/* --- VYKRESLENÍ PSA ---  */
let brufik={
    toilet:5,
    eat:20,
    run:200,
    sleep:200,
    play: getRandomValue(),
    pet: getRandomValue()
}
let brufikOriginalValues={
    toilet:5,
    eat:20,
    run:200,
    sleep:200,
    play: brufik.play,
    pet: brufik.pet
};
var points=0;

function getRandomValue(){
    return Math.floor((Math.random()*500));

}

/* DEFAULTNÍ VYKRESLENÍ PLNÉ STUPNICE */
function drawScale(value){
let ukazatel=document.getElementById(value);
    for(let i=0;i<brufik[value];i++){
        let square=document.createElement("div");
        square.classList.add("square-scale");
        square.classList.add(value);
  /*      let text=document.createTextNode(".");
        square.appendChild(text);*/
        ukazatel.appendChild(square);

    }
}

/* --- OVLÁDÁNÍ HODNOT PSA --- */


/*ubírání stupnice */
function getLowScale(value){
    let ukazatel=document.getElementById(value);
   
    let square=document.getElementsByClassName(value)[0]; 
    let reasonOfending="";
    switch(value){
        case "toilet":
        reasonOfending="Bruf musel na záchod!";
        break;
        case "eat":
        reasonOfending="Bruf měl moc hlad!";
        break;
        case "run":
        reasonOfending="Bruf se chodil málo vyběhat!";
        break;
        case "sleep":
        reasonOfending="Bruf se málo vyspal!";
        break;
        case "play":
        reasonOfending="Bruf si málo hrál!";
        break;
        case "pet":
        reasonOfending="Bruf byl málo mazlen";
        break;
    }
    


    if(!square){
        points--;
        alert(reasonOfending+" Konec hry! \n Dosažený počet bodů: "+points);
        clearTimeout(my);
    }
    else {
        ukazatel.removeChild(square);
    }
}



/* doplnění stupnice na 100% */
function getFullScale(value){
    let ukazatel=document.getElementById(value);
   
  
    for(let i=brufik[value];i<brufikOriginalValues[value];i++){
        let square=document.createElement("div");
        square.classList.add("square-scale");
        square.classList.add(value);
      /*  let text=document.createTextNode("");
        square.appendChild(text);*/
        ukazatel.appendChild(square);

    }
    brufik[value]=brufikOriginalValues[value];
}


/* když se nechce mazlit */

function handlePetting(){
    if(brufik.pet>3){
        alert("Brufík se teď nechce mazlit!");
    }
    else {
        getFullScale("pet");
    }
}

/* náhodná Brufova sabotáž */

function biteSomething(){
   document.getElementById("zereinfo").innerHTML="Bruf něco žere!";
    let ukazatel=document.getElementById("sabotage");
    ukazatel.style.display="block";
   
}

/* Brufe nesmíš! */

function stopEatingThat(){
    let ukazatel=document.getElementById("sabotage");
    ukazatel.style.display="none";
   
}



/* --- CELÉ ŘÍZENÍ --- */

function run(){
    points++;
document.getElementById("score").innerHTML="Počet bodů: "+points;
    let features=[];
 
    features = Object.keys(brufik);
 
    features.map(feature => {
       
        brufik[feature]-=1;
       
        getLowScale(feature);
    })
    
    
}




drawScale("toilet");
drawScale("eat");

drawScale("play");

drawScale("run");
drawScale("sleep");
drawScale("pet");
//run();

var my=window.setInterval(run,1000);
let randomNumberForBiting=Math.floor(Math.random()*100000);
console.log(randomNumberForBiting);
var myVar=window.setInterval(biteSomething,randomNumberForBiting);

