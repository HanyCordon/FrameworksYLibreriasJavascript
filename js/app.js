var tiempoAtras;
var min;
var seg;
var temporizador;
var verifica = false;


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


function CaidaDeDulces(){
  for (var i = 1; i <8; i++) {
    for (var j = 0; j < 7; j++) {
      var tipoDulce= Math.floor((Math.random() * 4) + 1);
      var elementoImg=document.createElement('img')
      $(".col-"+i)[0].append(elementoImg)
      $(elementoImg).addClass('elemento')
      $(elementoImg).attr('src',"image/"+tipoDulce+".png")
     }
  }
  agregarDulcesEvents();
  HacerJugada();
}

function agregarDulcesEvents() {
  $('img').draggable({
  containment: '.panel-tablero',
  droppable: 'img',
  revert: true,
  revertDuration: 500,
  grid: [100, 100],
  zIndex: 10,
  drag: constrainCandyMovement
  });
  $('img').droppable({
    //.draggable("destroy")
    drop: moverDulce
  });
 HacerJugada();
//enableCandyEvents();
}

function moverDulce(event, candyDrag)
{
  var candyDrag = $(candyDrag.draggable);
  var dragSrc = candyDrag.attr('src');
  var candyDrop = $(this);
  var dropSrc = candyDrop.attr('src');
  candyDrag.attr('src', dropSrc);
  candyDrop.attr('src', dragSrc);

  setTimeout(function () {
    HacerJugada();
    actualizarMovimientos();
    /*if ($('img.delete').length === 0) {
      candyDrag.attr('src', dragSrc);
      candyDrop.attr('src', dropSrc);
    } else {
      actualizarMovimientos();
    }*/
  }, 500);
}

function actualizarMovimientos()
{
  var actualValue = Number($('#movimientos-text').text());
  var result = actualValue += 1;
  $('#movimientos-text').text(result);
}
function actualizaPuntuacion(eliminados)
{
  var puntosActuales = Number($('#score-text').text());
  var nuevosPuntos = puntosActuales += eliminados;
  $('#score-text').text(nuevosPuntos);
}

function constrainCandyMovement(event, candyDrag) {
  candyDrag.position.top = Math.min(100, candyDrag.position.top);
  candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
  candyDrag.position.left = Math.min(100, candyDrag.position.left);
  candyDrag.position.right = Math.min(100, candyDrag.position.right);
  //imagenFrom =candyDrag.helper[0].src;
}
      

function HacerJugada()
{
  var eliminados = new Array();
  for (var x = 1; x <8; x++) {
    var veces=0;
    var dulceAnterior="";
    var imgMostradas = new Array();
    for (var y = 0; y < 7; y++) {
      var dulce= $(".col-"+x).children('img')[y].src;
      if (dulce==dulceAnterior ) {
        veces+=1;
        if (veces==1) {
          imgMostradas[1]=$(".col-"+x).children('img')[y-1];
        }
        imgMostradas[veces+1]=$(".col-"+x).children('img')[y];
      }
      else if (dulce!=dulceAnterior && veces<2){
        veces=0;
        imgMostradas = new Array();
      }
      var dulceAnterior = dulce;
    }

    if (veces>=2){
      /*Borrar los dulces*/
      for (var i = 1; i <= veces+1; i++) {
        /*imgMostradas[i].animate({
          width: "-=60", height: "-=20"},
          {
            duration : 1000,
            complete: function(){
              //imgMostradas[i].remove();
            }
          })*/
        imgMostradas[i].remove();
        eliminados += imgMostradas.length;
      };
      actualizaPuntuacion(imgMostradas.length);
    }; 
  }
  if (eliminados>1) {LlenarEspaciosVacios();};
  
}

function LlenarEspaciosVacios()
{
  for (var i = 1; i < 8; i++) {
    var hijos = 7- $(".col-"+i).children('img').length;
    for (var j = 0; j < hijos; j++) {
      var tipoDulce= Math.floor((Math.random() * 4) + 1);
      var elementoImg=document.createElement('img')
      $(".col-"+i).append(elementoImg)
      $(elementoImg).addClass('elemento')
      $(elementoImg).attr('src',"image/"+tipoDulce+".png")
    };
  };
  /*for (var i = colAlmacenadas.length - 1; i > 0; i--) {
    var hijos = colAlmacenadas[i].children('img');
    for (var j = 1; j < 7-hijos.length; j++) {
      var tipoDulce= Math.floor((Math.random() * 4) + 1);
      var elementoImg=document.createElement('img')
      colAlmacenadas[i].append(elementoImg)
      $(elementoImg).addClass('elemento')
      $(elementoImg).attr('src',"image/"+tipoDulce+".png")
    };
  };*/
  agregarDulcesEvents();
}

function ReiniciarJuego(verifica) {
  clearTimeout(temporizador);
  $(".btn-reinicio").text("Iniciar");
  if (verifica) {
    $(".panel-tablero").show("slow");
    $(".panel-score").animate(
      {
        width: "-=50"
      }, 1000
    );
    verifica=false;
  };
  
}


function FinalizarJuego() {
  clearTimeout(temporizador);
  $(".panel-tablero").hide("slow");
  $(".panel-score").animate(
    {
      width: "+=50"
    }, 1000
  );
  verifica=true;
}

$(".btn-reinicio").on("click", function(){
  var nombre =$(".btn-reinicio").text();
  if (nombre=="Iniciar") {
    $(".btn-reinicio").text("Reiniciar");
    clearTimeout(temporizador);
  }
  else {
    ReiniciarJuego(verifica);
  }
  min =0;
  seg =0;
  $(".elemento").remove('img');
  $('#score-text').text("0");
  $('#movimientos-text').text("0");
  updateReloj();
  CaidaDeDulces();
});
