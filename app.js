// Definir constantes y variables globales
const numeroMaximo = 10;
const maximoIntentos = 3;
let intentos = 0;
let numeroSecreto;
let listaNumerosSorteados = [];
let numeroDeJuego = 0;
const maxJuegos = 3;

// Función para asignar texto a elementos HTML
function asignarTextoElemento(elemento, texto) {
    document.querySelector(elemento).textContent = texto;
}

// Función para generar un número secreto único
function generarNumeroSecreto() {
    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));
    listaNumerosSorteados.push(numeroGenerado);
    console.log(`Número secreto generado: ${numeroGenerado}`);
    console.log(`Lista de números sorteados: ${listaNumerosSorteados}`);
    return numeroGenerado;
}

// Función para manejar el inicio de un nuevo juego
function iniciarJuego() {
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    document.getElementById('intentar').removeAttribute('disabled');
    console.log(`Nuevo juego iniciado. Número secreto: ${numeroSecreto}`);
}

// Función para verificar el intento del usuario
function verificarIntento() {
    let valorUsuario = document.getElementById('valorUsuario').value.trim();

    // Verificar si el valor ingresado es válido
    if (isNaN(valorUsuario) || valorUsuario < 1 || valorUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Por favor, ingresa un número entre 1 y ${numeroMaximo}`);
        return;
    }

    let numeroDeUsuario = parseInt(valorUsuario);
    intentos++;

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Acertaste en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`);
        document.getElementById('intentar').setAttribute('disabled', 'disabled');
        document.getElementById('reiniciar').removeAttribute('disabled');
        console.log(`Usuario acertó el número secreto (${numeroSecreto}) en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}.`);
        finalizarJuego(); // Finalizar el juego después de mostrar el mensaje
    } else {
        if (intentos === maximoIntentos) {
            asignarTextoElemento('p', `¡Has agotado todos los intentos! El número secreto era ${numeroSecreto}.`);
            finalizarJuego();
        } else if (numeroDeUsuario < numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es mayor.');
        } else {
            asignarTextoElemento('p', 'El número secreto es menor.');
        }
        limpiarEntrada(); // Limpiar la entrada del usuario después de cada intento
        console.log(`Intento ${intentos}: Número ingresado por el usuario: ${numeroDeUsuario}`);
    }
}


// Función para finalizar el juego
function finalizarJuego() {
    if (numeroDeJuego <= maxJuegos) {
        numeroDeJuego++;
        document.getElementById('intentar').setAttribute('disabled', 'disabled');
        document.getElementById('reiniciar').removeAttribute('disabled');
        asignarTextoElemento('h1', `Juego ${numeroDeJuego} Finalizado!`);
        
    } else {
        asignarTextoElemento('h1', 'Todos los juegos han finalizado.');
        document.getElementById('intentar').setAttribute('disabled', 'disabled');
        document.getElementById('reiniciar').setAttribute('disabled', 'disabled');
    }
    console.log(`Fin del juego ${numeroDeJuego}`);
}

// Función para limpiar la caja de entrada del usuario
function limpiarEntrada() {
    document.getElementById('valorUsuario').value = '';
}

// Función para reiniciar el juego
function reiniciarJuego() {
    limpiarEntrada();
    iniciarJuego();
    document.getElementById('reiniciar').setAttribute('disabled', 'disabled');
    console.log('Juego reiniciado.');
}

// Event listeners
document.getElementById('intentar').addEventListener('click', verificarIntento);
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);

// Iniciar el primer juego
iniciarJuego();
