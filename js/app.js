var tiempoAtras;
var min;
var seg;
var temporizador;
//updateReloj();

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
  $(elemento).animate({
    color : "green"
  },1000, function(){
    $(this).animate(
      {
          color : "yellow"
      }, 1000
    )
  });
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
    $(".btn-reinicio").text("Iniciar");
    clearTimeout(temporizador);
  }
  min =0;
  seg =0;
  updateReloj();
});

CambiarColor(".main-titulo");
