var reinasColocadas = 0;
var reinasPorColocar = 8;
var tablero = [];
var imagen = './img/reina1.png';

document.addEventListener("DOMContentLoaded", function () {
    inicializarTablero();
});

function inicializarTablero() {
    // Itera sobre las filas y celdas
    for (var i = 0; i < 8; i++) {
        tablero[i] = [];
        for (var j = 0; j < 8; j++) {
            tablero[i][j] = { queens: 0 }; // Inicializamos el contador en 0
        }
    }
}

// Función para cambiar la imagen de la reina según la selección del menú desplegable
function cambiarImagenReina(selectElement) {
    imagen = selectElement.value;
    // Cambiar la imagen de todas las celdas que contienen reinas
    var celdas = document.querySelectorAll('#tabla td[style*="background-image"]');
    celdas.forEach(function(celda) {
        if (celda.style.backgroundImage !== "none") { // Verificar si la celda tiene una imagen de reina
            celda.style.backgroundImage = "url(" + imagen +")";
            celda.style.backgroundSize = "cover";
            celda.style.backgroundColor = '#ff0000';

        }
    });
}


function colocarReina(celda) {
    var temptable = document.getElementById("tabla");
    var renglon = celda.parentElement.rowIndex;
    var columna = celda.cellIndex;

    if (window.getComputedStyle(celda).backgroundImage == "none") {
        // Poner imagen
        celda.style = "background-image: url(" + imagen +"); background-size: cover;";
        // Contar
        reinasColocadas++;
        reinasPorColocar = 8 - reinasColocadas;

        // Bloqueamos renglon y columna
        for (let index = 0; index < 8; index++) {
            tablero[renglon][index].queens++;
            if (tablero[renglon][index].queens === 1) {
                temptable.rows[renglon].cells[index].onclick = null;
                temptable.rows[renglon].cells[index].style.backgroundColor = "#ff0000";
            }

            tablero[index][columna].queens++;
            if (tablero[index][columna].queens === 1) {
                temptable.rows[index].cells[columna].onclick = null;
                temptable.rows[index].cells[columna].style.backgroundColor = "#ff0000";
            }
        }

        // Bloqueamos diagonales
        bloquearDiagonales(renglon, columna, temptable);
    } else {
        // Quitar imagen
        celda.style = "background-image: none";
        // Contar
        reinasColocadas--;
        reinasPorColocar = 8 - reinasColocadas;

        // Habilitamos renglon y columna
        for (let index = 0; index < 8; index++) {
            tablero[renglon][index].queens--;
            if (tablero[renglon][index].queens === 0) {
                temptable.rows[renglon].cells[index].onclick = function () {
                    colocarReina(this);
                };
                temptable.rows[renglon].cells[index].style.backgroundColor = "";
            }

            tablero[index][columna].queens--;
            if (tablero[index][columna].queens === 0) {
                temptable.rows[index].cells[columna].onclick = function () {
                    colocarReina(this);
                };
                temptable.rows[index].cells[columna].style.backgroundColor = "";
            }
        }

        // Habilitamos diagonales
        habilitarDiagonales(renglon, columna, temptable);
    }
    //Desplegar cuenta
    document.getElementById("reinasColocadas").innerHTML = "Reinas por colocar: " + reinasColocadas;
    document.getElementById("reinasPorColocar").innerHTML = "Reinas por colocar: " + reinasPorColocar;

    // Habilitar solo la celda actual
    temptable.rows[renglon].cells[columna].onclick = function () {
        colocarReina(this);
    };
}

function bloquearDiagonales(renglon, columna, temptable) {
    let r, c;

    // Diagonal superior izquierda
    r = renglon;
    c = columna;
    while (c >= 0 && r >= 0) {
        tablero[r][c].queens++;
        if (tablero[r][c].queens === 1) {
            temptable.rows[r].cells[c].style.backgroundColor = "#ff0000";
            temptable.rows[r].cells[c].onclick = null;
        }
        r--;
        c--;
    }

    // Diagonal inferior izquierda
    r = renglon;
    c = columna;
    while (c >= 0 && r < 8) {
        tablero[r][c].queens++;
        if (tablero[r][c].queens === 1) {
            temptable.rows[r].cells[c].style.backgroundColor = "#ff0000";
            temptable.rows[r].cells[c].onclick = null;
        }
        r++;
        c--;
    }

    // Diagonal inferior derecha
    r = renglon;
    c = columna;
    while (c < 8 && r < 8) {
        tablero[r][c].queens++;
        if (tablero[r][c].queens === 1) {
            temptable.rows[r].cells[c].style.backgroundColor = "#ff0000";
            temptable.rows[r].cells[c].onclick = null;
        }
        r++;
        c++;
    }

    // Diagonal superior derecha
    r = renglon;
    c = columna;
    while (c < 8 && r >= 0) {
        tablero[r][c].queens++;
        if (tablero[r][c].queens === 1) {
            temptable.rows[r].cells[c].style.backgroundColor = "#ff0000";
            temptable.rows[r].cells[c].onclick = null;
        }
        r--;
        c++;
    }
}

function habilitarDiagonales(renglon, columna, temptable) {
    let r, c;

    // Diagonal superior izquierda
    r = renglon;
    c = columna;
    while (c >= 0 && r >= 0) {
        tablero[r][c].queens--;
        if (tablero[r][c].queens === 0) {
            temptable.rows[r].cells[c].style.backgroundColor = "";
            temptable.rows[r].cells[c].onclick = function () {
                colocarReina(this);
            };
        }
        r--;
        c--;
    }

    // Diagonal inferior izquierda
    r = renglon;
    c = columna;
    while (c >= 0 && r < 8) {
        tablero[r][c].queens--;
        if (tablero[r][c].queens === 0) {
            temptable.rows[r].cells[c].style.backgroundColor = "";
            temptable.rows[r].cells[c].onclick = function () {
                colocarReina(this);
            };
        }
        r++;
        c--;
    }

    // Diagonal inferior derecha
    r = renglon;
    c = columna;
    while (c < 8 && r < 8) {
        tablero[r][c].queens--;
        if (tablero[r][c].queens === 0) {
            temptable.rows[r].cells[c].style.backgroundColor = "";
            temptable.rows[r].cells[c].onclick = function () {
                colocarReina(this);
            };
        }
        r++;
        c++;
    }

    // Diagonal superior derecha
    r = renglon;
    c = columna;
    while (c < 8 && r >= 0) {
        tablero[r][c].queens--;
        if (tablero[r][c].queens === 0) {
            temptable.rows[r].cells[c].style.backgroundColor = "";
            temptable.rows[r].cells[c].onclick = function () {
                colocarReina(this);
            };
        }
        r--;
        c++;
    }
}