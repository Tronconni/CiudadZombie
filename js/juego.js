/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */

var Juego = {
  // Aca se configura el tamanio del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador gano
  ganador: false,

  obstaculosCarretera: [
    /*Aca se van a agregar los obstaculos visibles. Tenemos una valla horizontal
    de ejemplo, pero podras agregar muchos mas. */
    new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 760, 450, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 50, 630, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 550, 300, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 500, 120, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 230, 400, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 400, 456, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 320, 430, 30, 30, 1),
    //new Obstaculo('imagenes/valla_vertical.png', 90, 30, 30, 30, 1),

    new Obstaculo('imagenes/bache.png', 190, 430, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 190, 450, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 500, 400, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 800, 430, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 400, 80, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 550, 120, 30, 30, 1),

    new Obstaculo('imagenes/auto_verde_derecha.png', 80, 390, 30, 15, 1),
    new Obstaculo('imagenes/auto_verde_abajo.png', 770, 90, 15, 30, 1),
    new Obstaculo('imagenes/auto_verde_abajo.png', 470, 240, 15, 30, 1)

  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
   Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
   que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 2),
    new Obstaculo('', 69, 507, 690, 52, 2),
    new Obstaculo('', 587, 147, 173, 360, 2),
    new Obstaculo('', 346, 147, 241, 52, 2),
    new Obstaculo('', 196, 267, 263, 112, 2),
    new Obstaculo('', 196, 23, 83, 244, 2),
    new Obstaculo('', 279, 23, 664, 56, 2),
    new Obstaculo('', 887, 79, 56, 480, 2)
  ],
  // Los enemigos se agregaran en este arreglo.
  enemigos: [
    new ZombieCaminante('imagenes/zombie4.png', 100, 60, 15, 15, 1, {
      desdeX: 70,
      hastaX: 180,
      desdeY: 30,
      hastaY: 100
    }),
    new ZombieCaminante('imagenes/zombie3.png', 300, 300, 15, 15, 2, {
      desdeX: 100,
      hastaX: 500,
      desdeY: 270,
      hastaY: 350
    }),
    new ZombieCaminante('imagenes/zombie3.png', 450, 450, 15, 15, 2, {
      desdeX: 350,
      hastaX: 550,
      desdeY: 390,
      hastaY: 490
    }),
    new ZombieCaminante('imagenes/zombie1.png', 600, 270, 15, 15, 1, {
      desdeX: 280,
      hastaX: 600,
      desdeY: 170,
      hastaY: 270
    }),
    new ZombieCaminante('imagenes/zombie2.png', 700, 430, 15, 15, 2, {
      desdeX: 700,
      hastaX: 800,
      desdeY: 360,
      hastaY: 560
    }),
    new ZombieCaminante('imagenes/zombie1.png', 750, 100, 15, 15, 3, {
      desdeX: 710,
      hastaX: 870,
      desdeY: 65,
      hastaY: 150
    }),
    new ZombieCaminante('imagenes/zombie4.png', 850, 370, 15, 15, 1, {
      desdeX: 830,
      hastaX: 885,
      desdeY: 350,
      hastaY: 520
    }),
    new ZombieConductor('imagenes/tren_vertical.png', 644, 30, 30, 70, 5, {
      desdeX: 644,
      hastaX: 644,
      desdeY: 30,
      hastaY: 480
    },'v'),
    new ZombieConductor('imagenes/tren_vertical.png', 674, 480, 30, 70, 20, {
      desdeX: 674,
      hastaX: 674,
      desdeY: 30,
      hastaY: 480
    },'v'),
    new ZombieConductor('imagenes/tren_horizontal.png', 20, 326, 70, 30, 5, {
      desdeX: 25,
      hastaX: 870,
      desdeY: 326,
      hastaY: 326
    },'h'),
  ]

}

/* Se cargan los recursos de las imagenes, para tener un facil acceso
a ellos. No hace falta comprender esta parte. Pero si queres agregar tus propies
imagenes tendras que poner su ruta en la lista para que pueda ser precargada como
todas las demas. */
Juego.iniciarRecursos = function () {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png'
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function () {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function () {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* El bucle principal del juego se llamara continuamente para actualizar
  los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
  ataques, colisiones, etc*/
  this.buclePrincipal();
};

Juego.buclePrincipal = function () {

  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();
  // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function () {
  this.calcularAtaques();
  this.moverEnemigos();
}
// Captura las teclas y si coincide con alguna de las flechas tiene que
// hacer que el jugador principal se mueva
Juego.capturarMovimiento = function (tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;
  // El movimiento esta determinado por la velocidad del jugador
  if (tecla == 'izq') {
    movX = -velocidad;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
  }
  if (tecla == 'der') {
    movX = velocidad;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
  }
  // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento

  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    /* Aca tiene que estar la logica para mover al jugador invocando alguno
    de sus metodos  */
    this.jugador.mover(tecla, movX + this.jugador.x, movY + this.jugador.y);
    /* COMPLETAR */
  } else if ((this.jugador.sprite == 'imagenes/auto_rojo_derecha.png') && (tecla == 'arriba' || tecla == 'abajo')) {

    if (this.chequearColisiones(movX + this.jugador.x - this.jugador.ancho, movY + this.jugador.y)) {
      this.jugador.mover(tecla, movX + this.jugador.x, movY + this.jugador.y);
    }
  } else if ((this.jugador.sprite == 'imagenes/auto_rojo_abajo.png') && (tecla == 'izq' || tecla == 'der')) {
    if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y - this.jugador.alto)) {
      this.jugador.mover(tecla, movX + this.jugador.x, movY + this.jugador.y);
    }
  }
};

Juego.dibujar = function () {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();


  /* Aca hay que agregar la logica para poder dibujar al jugador principal
  utilizando al dibujante y los metodos que nos brinda.
  "Dibujante dibuja al jugador" */
  Dibujante.dibujarEntidad(Jugador)
  //Llegada
  Dibujante.dibujarRectangulo('blue', 760, 543, 126, 20);
  
  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function (obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });

  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function (enemigo) {
    /* Completar */
    Dibujante.dibujarEntidad(enemigo);
  });

  // El dibujante dibuja las vidas del jugador
  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('grey', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('blue', x, 0, tamanio, 8);
  }
};



/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos
un recorrido por los enemigos para dibujarlos en pantalla ahora habra que hacer
una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function () {
  this.enemigos.forEach(function (enemigo) {
      enemigo.mover();
  })
  /* COMPLETAR */
};

/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.
Para chequear las colisiones estudiar el metodo posicionValida. Alli
se ven las colisiones con los obstaculos. En este caso sera con los zombies. */
Juego.calcularAtaques = function () {
  this.enemigos.forEach(function (enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      /* Si el enemigo colisiona debe empezar su ataque
      COMPLETAR */
      enemigo.comenzarAtaque(this.jugador);
    } else {
      /* Sino, debe dejar de atacar
      COMPLETAR */
      enemigo.dejarDeAtacar(this.jugador);
    }
  }, this);
};



/* Aca se chequea si el jugador se peude mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function (x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function (obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {

      /*COMPLETAR, obstaculo debe chocar al jugador*/
      //this.jugador.vidas-=obstaculo.potencia;
      //obstaculo.potencia=0;
      obstaculo.chocar(this.jugador);

      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function (elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function () {
  // Si se termino el juego hay que mostrar el mensaje de game over de fondo
  if (this.terminoJuego()) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }

  // Si se gano el juego hay que mostrar el mensaje de ganoJuego de fondo
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function () {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function () {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', function (e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});