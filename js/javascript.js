var HERO = document.getElementById('hero')
var ENEMIGOS = document.getElementById('enemies')
const VELOCIDAD_DESPLAZAMIENTO  = 30;
var DESPLAZAMIENTO_ENEMIGOS = 30;
const VELOCIDAD_RENDERIZADO = 90;
var PUNTAJE= document.getElementById('score');

PUNTAJE.innerText = 0;

var Hero = {
    vertical : 500,
    horizontal : 510
}
//Genera una clase entre 1 y 3 y la posicion de inicio de manera aleatoria
var Enenigos =[{ id: 1, clase:`enemy${Math.floor(Math.random() * 3) + 1 }`, posVertical:10, posHorizonta: Math.floor(Math.random() * 850) + 100 },
               { id: 2, clase:`enemy${Math.floor(Math.random() * 3) + 1 }`, posVertical:10, posHorizonta: Math.floor(Math.random() * 850) + 100 },
               { id: 3, clase:`enemy${Math.floor(Math.random() * 3) + 1 }`, posVertical:10, posHorizonta: Math.floor(Math.random() * 850) + 100 },
               { id: 4, clase:`enemy${Math.floor(Math.random() * 3) + 1 }`, posVertical:10, posHorizonta: Math.floor(Math.random() * 850) + 100 },
               { id: 5, clase:`enemy${Math.floor(Math.random() * 3) + 1 }`, posVertical:10, posHorizonta: Math.floor(Math.random() * 850) + 100 },
               { id: 6, clase:`enemy${Math.floor(Math.random() * 3) + 1 }`, posVertical:10, posHorizonta: Math.floor(Math.random() * 850) + 100 },
               { id: 7, clase:`enemy${Math.floor(Math.random() * 3) + 1 }`, posVertical:10, posHorizonta: Math.floor(Math.random() * 850) + 100 },
              ];

function IniciarEnemigos (){
    var llenarEnemigos = '';

   for (var x =0 ; x < Enenigos.length ; x++){
        llenarEnemigos = llenarEnemigos + `<div id='${Enenigos[x].id}' class='${Enenigos[x].clase}' style='top:${Enenigos[x].posVertical}px; left:${Enenigos[x].posHorizonta}px;'></div>` 
    }

    ENEMIGOS.innerHTML = llenarEnemigos;
}

function MoverEmenigos (){   
    for (var x =0 ; x < Enenigos.length; x++){            

        //generar un avance entre 20 y 60 aleatorio        
          DESPLAZAMIENTO_ENEMIGOS = Math.floor(Math.random() * 40 ) + 20;


         if (Enenigos[x].posVertical < 500){
            Enenigos[x].posVertical += DESPLAZAMIENTO_ENEMIGOS;   

         }else{
            ///empezar desde Cero y volver a generar los enemigo de manera aleatoria
            //remueve la clase actual
            var enem = document.getElementById(Enenigos[x].id).classList.remove(Enenigos[x].clase)
            //genera una nueva clase de enemigo
            var nuevClase = `enemy${Math.floor(Math.random() * 3) + 1 }`
            // establece la nueca clase
            Enenigos[x].clase = nuevClase
            //  console.table(Enenigos)
            // //reposiciona al enemigo
            Enenigos[x].posVertical = 0; 
            Enenigos[x].posHorizonta = Math.floor(Math.random() * 850) + 100 ;
            // //Re-Renderizar los enemigos
            var enem = document.getElementById(Enenigos[x].id).classList.add(`${Enenigos[x].clase}`)
         }
    } 

    RenderizarEnemigos()
}



function RenderizarEnemigos (){
    for (var x =0 ; x < Enenigos.length ; x++){
        var enem = document.getElementById(`${Enenigos[x].id}`)
        enem.style.top = Enenigos[x].posVertical;
        enem.style.left= Enenigos[x].posHorizonta;        
    }
}

function DisplayHero (){
    HERO.style.left = Hero.horizontal;
    HERO.style.top = Hero.vertical;
}
var Disparos = [];

function Disparo (){

    Disparos.push({vertical : Hero.vertical - 5  , 
                   horizontal: Hero.horizontal + 5
                 })  
}

function AnimarDisparo (){    
    var bala = document.getElementById('bullets')
    var balazo =''
    var PosExplosionHor = 0;        
    var PosExplosionVer = 0;        

     for(var x = 0; x < Disparos.length; x++){
        if( Disparos[x].vertical >= 0 ){
            Disparos[x].vertical += - 10; 
            balazo += `<div id='${Disparos[x].id}' class='bullet' style='top:${Disparos[x].vertical}px; left:${Disparos[x].horizontal}px;'></div>`     
        
                for( var j = 0 ; j < Enenigos.length; j++){
                    if (Disparos[x].vertical >= Enenigos[j].posVertical &&
                        Disparos[x].vertical < Enenigos[j].posVertical +  35 && 
                        Disparos[x].horizontal >= Enenigos[j].posHorizonta &&
                        Disparos[x].horizontal < Enenigos[j].posHorizonta + 35) { 
                        
                        // sumar puntaje
                        PUNTAJE.innerText = Number(PUNTAJE.innerText)+  10;
                        
                        //Repocicionar al enemigo
                        PosExplosionHor = Enenigos[j].posHorizonta;
                        PosExplosionVer = Enenigos[j].posVertical;
                        Enenigos[j].posVertical = -200;    
                        Enenigos[j].posHorizonta = Math.floor(Math.random() * 850) + 100;    
                        
                        //generar la explosion y Sonido                                                  
                         explosion.style .left = PosExplosionHor;
                         explosion.style.top  = PosExplosionVer;
                         explosion.style.backgroundPosition =  '-110px -30px';
                         SonidoExplosion()

                   }
                }            


        }

     }

     

    bala.innerHTML = balazo;   
}

function SonidoExplosion (){
    const audioElement = new Audio("./assets/boomy-shot-fx.wav");
    audioElement.play();
}

//Mover Avion 
function MoverAvion(e){    

    switch (e.keyCode) {
        case 38: //Arriba
        if((Hero.vertical - VELOCIDAD_DESPLAZAMIENTO) > 0){                    
            Hero.vertical -= VELOCIDAD_DESPLAZAMIENTO;   
        }                
            break;
        case 40://abajo
        if((Hero.vertical + VELOCIDAD_DESPLAZAMIENTO) < 550){
            Hero.vertical += VELOCIDAD_DESPLAZAMIENTO;       
        }            
             break;
        case 37://izquierda
        if((Hero.horizontal - VELOCIDAD_DESPLAZAMIENTO) > -15){
            Hero.horizontal -= VELOCIDAD_DESPLAZAMIENTO;
        }
            break;
        case 39://Derecha
        if((Hero.horizontal + VELOCIDAD_DESPLAZAMIENTO) < 1000){
            Hero.horizontal += VELOCIDAD_DESPLAZAMIENTO;
        }
            break;
        case 32: //disparo
            Disparo ()
            break;
    }

    revisarChoque()

}

function revisarChoque() {
    
    for (let i = 0; i < Enenigos.length; i++) {
        //ancho enemigos 35x35
        //ancho avion 28x28
        if (Hero.vertical < (Enenigos[i].posVertical + 35) &&
           (Hero.vertical + 28) > Enenigos[i].posVertical &&
           Hero.horizontal < (Enenigos[i].posHorizonta + 35) &&
           (Hero.horizontal + 28) > Enenigos[i].posHorizonta ){

            PUNTAJE.innerText = Number(PUNTAJE.innerText) -  500;
        }
    }
}


function gameLoop(){    
    //actualizar la posicion del avion
    DisplayHero()
    //mover enemigos
    MoverEmenigos() 
    //animar disparos   
    AnimarDisparo()  
}

addEventListener("DOMContentLoaded", () => {
    //inicializar Enemigos
    IniciarEnemigos()
    //inicializar el loop
    setInterval(gameLoop,VELOCIDAD_RENDERIZADO)    
    //detectar las teclas
    document.addEventListener('keydown',MoverAvion)
});