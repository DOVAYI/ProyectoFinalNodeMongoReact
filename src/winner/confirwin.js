
/**
 * esta funcion permite confirmar si el jugador al presionar 
 * el boton ganar, asi sea.
 * 
 */
const ConfirmWinner = (todoss, arrayAux2) => {
    
    let arrayNumbers = arrayAux2;
    let responseWinner = false;


    const searchWinForRow = () => {

        let i = 0;
        if (arrayNumbers.length > 0 || arrayNumbers != null) {

            while (i < todoss.length) {

                if (arrayNumbers.indexOf(todoss[i].b) !== -1) {
                    if (arrayNumbers.indexOf(todoss[i].i) !== -1) {
                        if (arrayNumbers.indexOf(todoss[i].n) !== -1) {
                            if (arrayNumbers.indexOf(todoss[i].g) !== -1) {
                                if (arrayNumbers.indexOf(todoss[i].o) !== -1) {

                                    responseWinner = true;


                                    i = todoss.length - 1;

                                }
                            }
                        }
                    }
                }
                i++;
            }
            if (responseWinner === false) {
                searchWinForColB();
            }

        }



    }



    const searchWinForColB = () => {
        console.log("entro al B")
        let i = 0;
        let contador = 0;
        while (i < 5) {
            if (arrayNumbers.indexOf(todoss[i].b) !== -1) {
                contador++;
                console.log(contador)
            }

            i++;
        }

        if (contador === 5) {

            responseWinner = true;

        } else {

            searchWinForColI();

        }



    }





    const searchWinForColI = () => {

        let i = 0;
        let contador = 0;
        while (i < 5) {
            if (arrayNumbers.indexOf(todoss[i].i) !== -1) {
                contador++;
            }

            i++;
        }

        if (contador === 5) {
            responseWinner = true;

        } else {
            if (responseWinner === false) {
                searchWinForColN();
            }
        }



    }

    const searchWinForColN = () => {

        let i = 0;
        let contador = 0;
        while (i < 5) {
            if (arrayNumbers.indexOf(todoss[i].n) !== -1) {
                contador++;
            }

            i++;
        }

        if (contador === 5) {
            responseWinner = true;

        } else {
            if (responseWinner === false) {
                searchWinForColG();
            }
        }

    }
    const searchWinForColG = () => {

        let i = 0;
        let contador = 0;
        while (i < 5) {
            if (arrayNumbers.indexOf(todoss[i].b) !== -1) {
                contador++;
            }

            i++;
        }

        if (contador === 5) {
            responseWinner = true;

        } else {
            if (responseWinner === false) {
                searchWinForColO();
            }
        }

    }

    const searchWinForColO = () => {
        let res = false;
        let i = 0;
        let contador = 0;
        while (i < 5) {
            if (arrayNumbers.indexOf(todoss[i].o) !== -1) {
                contador++;
            }

            i++;
        }

        if (contador === 5) {
            responseWinner = true;

        } else {
            if (responseWinner === false) {
                searchWinFor4Corners();
            }
        }

    }
    const searchWinFor4Corners = () => {

        if (arrayNumbers.indexOf(todoss[0].b) !== -1) {
            if (arrayNumbers.indexOf(todoss[0].o) !== -1) {
                if (arrayNumbers.indexOf(todoss[4].b) !== -1) {
                    if (arrayNumbers.indexOf(todoss[4].o) !== -1) {
                        responseWinner = true;


                    }

                }

            }

        }
        if (responseWinner === false) {
            searchWinForDiagonal1();
        }

    }

    const searchWinForDiagonal1 = () => {

        if (arrayNumbers.indexOf(todoss[0].b) !== -1) {
            if (arrayNumbers.indexOf(todoss[1].i) !== -1) {
                if (arrayNumbers.indexOf(todoss[2].n) !== -1) {
                    if (arrayNumbers.indexOf(todoss[3].g) !== -1) {
                        if (arrayNumbers.indexOf(todoss[4].o) !== -1) {
                            responseWinner = true;

                        }

                    }

                }

            }
        }

        if (responseWinner === false) {
            searchWinForDiagonal2();
        }
    }

    const searchWinForDiagonal2 = () => {
        if (arrayNumbers.indexOf(todoss[4].b) !== -1) {
            if (arrayNumbers.indexOf(todoss[3].i) !== -1) {
                if (arrayNumbers.indexOf(todoss[2].n) !== -1) {
                    if (arrayNumbers.indexOf(todoss[1].g) !== -1) {
                        if (arrayNumbers.indexOf(todoss[0].o) !== -1) {
                            responseWinner = true;

                        }

                    }

                }

            }
        }


    }
    searchWinForRow();

    return responseWinner;

}
export default ConfirmWinner;
