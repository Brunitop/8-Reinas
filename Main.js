class Main {
    static main() {
        // Crear un arreglo bidimensional de 8x8
        let arregloBidimensional = new Array(8);
        for (let i = 0; i < 8; i++) {
            arregloBidimensional[i] = new Array(8);
        }

        // Inicializar la matriz con algunos valores (este es solo un ejemplo)
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                arregloBidimensional[i][j] = i + j;
            }
        }

        // Imprimir la matriz en la consola
        console.log("Arreglo Bidimensional de 8x8:");
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                process.stdout.write(arregloBidimensional[i][j] + "\t");
            }
            console.log();
        }
    }
}

// Llamar al método main
Main.main();
