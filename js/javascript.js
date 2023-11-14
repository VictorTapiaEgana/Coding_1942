var HERO = document.getElementById('hero')
var ENEMIGOS = document.getElementById('enemies')
const VELOCIDAD_DESPLAZAMIENTO  = 30;
var DESPLAZAMIENTO_ENEMIGOS = 30;
const VELOCIDAD_RENDERIZADO = 100;

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
            
            //COMPROBARA COLICION EN LA POCICION ACTAL

            ///////////////////////////////////////////        

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


     for(var x = 0; x < Disparos.length; x++){
        if( Disparos[x].vertical >= 0 ){
            Disparos[x].vertical += - 10; 
            balazo += `<div id='${Disparos[x].id}' class='bullet' style='top:${Disparos[x].vertical}px; left:${Disparos[x].horizontal}px;'></div>` 
        }
        else{
        console.log('sfsf')
        }
     }

     

    bala.innerHTML = balazo;   
}

//Mover Avion 
function MoverAvion(e){    
//   console.log(e.keyCode)
    switch (e.keyCode) {
        case 38: //Arriba
            Hero.vertical -= VELOCIDAD_DESPLAZAMIENTO;                   
            break;
        case 40://abajo
            Hero.vertical += VELOCIDAD_DESPLAZAMIENTO;                   
             break;
        case 37://izquierda
            Hero.horizontal -= VELOCIDAD_DESPLAZAMIENTO;
            break;
        case 39://Derecha
            Hero.horizontal += VELOCIDAD_DESPLAZAMIENTO;
            break;
        case 32: //disparo
            Disparo ()
            break;
    }
}

function gameLoop(){    
    //actualizar la posicion del avion
    DisplayHero()
    MoverEmenigos()    
    AnimarDisparo( )
  
}

addEventListener("DOMContentLoaded", () => {
    //inicializar Enemigos
    IniciarEnemigos()
    //inicializar el loop
    setInterval(gameLoop,VELOCIDAD_RENDERIZADO)    
    //detectar las teclas
    document.addEventListener('keydown',MoverAvion)
});