var rank = JSON.parse(localStorage.getItem("ganadores"));
var jugador;
var intentos=0;
var click = 0;
var primerClick;
var segundoClick
var aciertos = 0
var jugadas = 0
var nivel = "ninguno"
$("#nivel1").on("click",function(){
     intentos=18
     nivel = "Fácil"
     jugador = $("#jugador").val();              
     if(jugador.length == 0){
        $("#noname").removeClass("none")//valida que el input tenga un valor, si no lo tiene muestra #noname 
        // 
        setTimeout(function (){/// este funcion ayuda a desaparecer luego de 4 segundos 
        $("#noname").addClass("none")   
        },3000)
    }else {
        $("#nombre").html("Hola "+jugador) 
        $("#intentos").html(" " + intentos+" ")/// aqui se pinto intentos en azul
        $("#level").html("Nivel Fácil")
        $(".tablero").removeClass("none")// .tablero es la caja que contiene a las cartas
        $("#entrada").addClass("none")
    }
})
$("#nivel2").on("click",function(){
    intentos=12
    nivel = "Intermedio"
    jugador = $("#jugador").val();              
    if(jugador.length == 0){
       $("#noname").removeClass("none")//valida que el input tenga un valor, si no lo tiene muestra #noname 
       // 
       setTimeout(function (){/// este funcion ayuda a desaparecer luego de 4 segundos 
       $("#noname").addClass("none")   
       },3000)
   }else {
       $("#nombre").html("Hola "+jugador) 
       $("#intentos").html(" " + intentos+" ")/// aqui se pinto intentos en azul
       $("#level").html("Nivel Intermedio")
       $(".tablero").removeClass("none")// .tablero es la caja que contiene a las cartas
       $("#entrada").addClass("none")
   }
})
$("#nivel3").on("click",function(){
    intentos=9
    nivel = "Experto"
    jugador = $("#jugador").val();              
    if(jugador.length == 0){
       $("#noname").removeClass("none")//valida que el input tenga un valor, si no lo tiene muestra #noname 
       // 
       setTimeout(function (){/// este funcion ayuda a desaparecer luego de 4 segundos 
       $("#noname").addClass("none")   
       },3000)
   }else {
       $("#nombre").html("Hola "+jugador) 
       $("#intentos").html(" " + intentos+" ")/// aqui se pinto intentos en azul
       $("#level").html("Nivel Experto")
       $(".tablero").removeClass("none")// .tablero es la caja que contiene a las cartas
       $("#entrada").addClass("none")
   }
})


/// una vez que hago click en las piña
$(".tapada").on ("click",function(){
    click = click + 1 
    console.log(click);
    
     if( click == 1){// se convierte en objeto a la imagen para poder comparar
        $(this).addClass("voltea")
        console.log('entro 1');
        var visible = $(this).attr('data-img')
        $(this).attr('src', visible)

        primerClick = {
          id: $(this).attr("id"),
          img:$(this).attr("data-img")
        }
        $("#"+primerClick.id).addClass("pointer") //para que no cuente de nuevo el click
                
      } else if (click == 2) { 
        $(this).addClass("voltea")
        console.log('entro 2');
        var visible = $(this).attr('data-img')
        $(this).attr('src', visible)

        segundoClick = {
            id: $(this).attr("id"),
            img:$(this).attr('data-img')  
          }
          jugadas = jugadas +1
          $("#"+segundoClick.id).addClass("pointer")
          $("#cuenta").html( " " + jugadas) // se pinta con el id del span
         // jugadas me cuenta el numero de intentos 
        /// si ambos id son distintos pero las imagenes son iguales es un acierto 
        if ( primerClick.id!=segundoClick.id && primerClick.img==segundoClick.img ) {
            aciertos = aciertos + 1
            console.log(aciertos)
            console.log ("iguales")
        /// si ya identifique que son iguales en ambos click ponlas gris
            setTimeout(function (){
                $("#" +primerClick.id).addClass("filter")
                $("#" +segundoClick.id).addClass("filter")
                click = 0
                },1000)

                if(aciertos==6){ 
                    console.log("ganaste!!!!")
                  $("#opa").removeClass("none")
                  $("#modal").removeClass("none")
                  /// aqui el opacity
                  $("#ganados").html("Ganaste 🎉! con "+jugadas+" intentos.")
                  // aqui debo traer el nombre de quien jugo y agregarla en la caja con id Nombre
                //   $("#name").html("Nombre "+jugador)
                //   $("#nivel").html("Nivel "+ nivel)
                //   $("#edad").html( "Intentos "+jugadas )
                
                  var jugadores={
                    nombre:jugador,
                    nivel:nivel,
                    intentos:jugadas,
                    }
                    // var rank;
                  // no entiendo q quiere decir esto

                    if(rank== null){
                        rank=[]  
                    }
                    console.log(rank)
                    rank.push(jugadores)
                    
                   

                    localStorage.setItem("ganadores",JSON.stringify(rank));
                    for(var i= 0; i<rank.length;i++){
                        $("#name").append(`<p>${rank[i].nombre}</p>`)
                        $("#nivel").append(`<p>${rank[i].nivel}</p>`)
                        $("#edad").append(`<p>${rank[i].intentos}</p>`)
                    }
                } 

            
                    
            } else{
                setTimeout(function (){
                    $("#" +primerClick.id).attr("src","img/tapada.jpg")
                    $("#" +segundoClick.id).attr("src","img/tapada.jpg")
                    $("#" +primerClick.id).removeClass("voltea") 
                    $("#" +segundoClick.id).removeClass("voltea") 
                    //// esto de arriba es para que me funcione de nuevo el flip
            // jugadas = jugadas + 1
                    click = 0
                    console.log("distintas")
                    $("#"+primerClick.id).removeClass("pointer")
                    $("#"+segundoClick.id).removeClass("pointer")
                      
                },1000)
                    
            } 
             
            if (jugadas == intentos && aciertos < 6 ){
                console.log ("perdiste!!!") 
                $("#opa").removeClass("none")
                $("#modal").removeClass("none")
                $("#ganados").html("😯Se agotaron los Intentos!")
                $("#name").html("Nombre "+jugador)
                $("#nivel").html("Nivel "+ nivel)
                $("#edad").html( "Intentos "+(jugadas))
                // si jugadas es igual a intentos + 1 y aun no he tenido los 6 aciertos
            }
    }   
})
    /// cambio de imagenes
    var arr=["img/alce.jpg","img/epelante.jpg","img/nena.jpg",
    "img/unichancho.jpg","img/zapas.jpg","img/peces.jpg",
    "img/alce.jpg","img/epelante.jpg","img/nena.jpg",
    "img/unichancho.jpg","img/zapas.jpg","img/peces.jpg"
   ] /// contiene los 6 pares de imagenes

   const muevelas =shuffle(arr)
   function shuffle(pepito){
       for( var i= pepito.length-1;i>0;i--){
           var j =Math.floor(Math.random()*(i+1));
           [pepito[i],pepito[j]]=[pepito[j],pepito[i]]
       }
       return pepito;
   }
var imgsLength = $('.rev').length// rev es una de las clases q contiene la imagen tapada

for (var i = 0; i < imgsLength; i++) {
$('.rev').eq(i).attr('data-img', arr[i]) 
}

$('.rev').on('click', function() {


})
/// para refrescar la pagina
$("#again").on("click",function(){
    location.reload()

})

//// mefalta hacer el random
/// el opacity del modal para q el tablero de fondo se vea mas opaco listo
/// el historial de jugadas para eso creo que debo convertir los datos nombre nivel e intentos en un objeto 
//luego en string y luego en objeto de nuevo para sacarlos 
  // para convertir imagen en ob
  var kilombo;
  kilombo=2
  if( jugadas== kilombo &&  primerClick.id!=segundoClick.id && primerClick.img==segundoClick.img){
    setTimeout(function (){
        $("#" +primerClick.id).addClass("filter")
        $("#" +segundoClick.id).addClass("filter")
        },1000)


        if(aciertos==6){ 
            console.log("ganaste!!!!")
          $("#opa").removeClass("none")
          $("#modal").removeClass("none")
          /// aqui el opacity
          $("#ganados").html("Ganaste 🎉! con "+jugadas+" intentos.")




  }}


 
  
