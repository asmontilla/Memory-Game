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
        $("#noname").removeClass("none")
        // 
        setTimeout(function (){
        $("#noname").addClass("none")   
        },3000)
    }else {
        $("#nombre").html("Hola "+jugador) 
        $("#intentos").html(" " + intentos+" ")
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
       setTimeout(function (){
       $("#noname").addClass("none")   
       },3000)
   }else {
       $("#nombre").html("Hola "+jugador) 
       $("#intentos").html(" " + intentos+" ")
       $("#level").html("Nivel Intermedio")
       $(".tablero").removeClass("none")
       $("#entrada").addClass("none")
   }
})
$("#nivel3").on("click",function(){
    intentos=9
    nivel = "Experto"
    jugador = $("#jugador").val();              
    if(jugador.length == 0){
       $("#noname").removeClass("none")
       // 
       setTimeout(function (){
       $("#noname").addClass("none")   
       },3000)
   }else {
       $("#nombre").html("Hola "+jugador) 
       $("#intentos").html(" " + intentos+" ")
       $("#level").html("Nivel Experto")
       $(".tablero").removeClass("none")
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
          $("#cuenta").html( " " + jugadas) 
         // jugadas cuenta el numero de intentos 
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

                if(aciertos == 6){ 
                    console.log("ganaste!!!!")
                  $("#opa").removeClass("none")
                  $("#modal").removeClass("none")
                  $("#ganados").html("Ganaste 🎉! con "+jugadas+" intentos.")
                document.getElementById("audio").play();
               
                
                  var jugadores={
                    nombre:jugador,
                    nivel:nivel,
                    intentos:jugadas,
                    }
                  
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
                    // en caso de que al destapar sean distintas
            } else{
                setTimeout(function (){
                    $("#" +primerClick.id).attr("src","img/tapada.jpg")
                    $("#" +segundoClick.id).attr("src","img/tapada.jpg")
                    $("#" +primerClick.id).removeClass("voltea") 
                    $("#" +segundoClick.id).removeClass("voltea") 
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
                document.getElementById("looser").play();
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

/// para refrescar la pagina
$("#again").on("click",function(){
    location.reload()

})




 
  
