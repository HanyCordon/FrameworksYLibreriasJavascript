var tiempoAtras;
var min;
var seg;
var temporizador;


function updateReloj() {
var number = document.getElementById('timer');
var hora = 0;
var minutos = 1-min;
var segundos = 59-seg;

if (min==2) {
  tiempoAtras= "0";
  tiempoAtras+= ":00";
  tiempoAtras+= ":00";
  FinalizarJuego();
}
else {
  tiempoAtras= (hora < 10) ? hora :hora;
  tiempoAtras+= ((minutos < 10) ? ":0" : ":") +(minutos) ;
  tiempoAtras+= ((segundos < 10) ? ":0" : ":") +  (segundos);
  temporizador = setTimeout("updateReloj()",1000);
}
if (seg==59) {
  min+=1;
  seg=0;
}
else {
  seg += 1;
}
number.innerHTML = tiempoAtras;
}

function CambiarColor(elemento){
  var color = $(elemento).css("color");
  if (color=="rgb(255, 255, 0)") {
    $(elemento).css("color","green");
  }
  else {
    $(elemento).css("color","yellow");
  }
  setTimeout(CambiarColor(".main-titulo"),1000) ;
}

/*function CaidaDeDulces(){
  for (var i = 0; i < 7; i++) {
    $(".col-1").append("<div></div>");
    $(".col-1").child[i].append("<img></img>");
    $("img").attr("src",function(){
      var numero = Math.floor((Math.random() * 4) + 1);
      var ruta = "image/"+numero+".png";
      return ruta;
    });
  }*/

function CaidaDeDulces(){
  for (var i = 1; i <8; i++) {
    for (var j = 0; j < 7; j++) {
      var tipoDulce= Math.floor((Math.random() * 4) + 1);
      var aux=document.createElement('img')
      $(".col-"+i)[0].append(aux)
      $(aux).addClass('elemento')
      $(aux).draggable({
      start: function(event,ui){
      drag(event,ui)},
      revert:"invalid",
      helper:"clone"})
      $(aux).droppable({
      drop: function(event,ui){
      drop(event,ui)}
      });
      $(aux).attr('src',"image/"+tipoDulce+".png")
    }
  }
}

function ReiniciarJuego() {
  clearTimeout(temporizador);
  $(".btn-reinicio").text("Iniciar");
  $(".panel-tablero").show("slow");
  $(".panel-score").animate(
    {
      width: "-=50"
    }, 1000
  );
}


function FinalizarJuego() {
  clearTimeout(temporizador);
  $(".panel-tablero").hide("slow");
  $(".panel-score").animate(
    {
      width: "-=50"
    }, 1000
  );
}

$(".btn-reinicio").on("click", function(){
  var nombre =$(".btn-reinicio").text();
  if (nombre=="Iniciar") {
    $(".btn-reinicio").text("Reiniciar");
    clearTimeout(temporizador);
  }
  else {
    ReiniciarJuego();
  }
  min =0;
  seg =0;
  updateReloj();
  CaidaDeDulces();
});

//CambiarColor(".main-titulo");
