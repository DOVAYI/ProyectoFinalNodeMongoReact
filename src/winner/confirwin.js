

const ConfirmWinner = (todoss, arrayAux2) => {
    let arrayNumbers = arrayAux2;
    console.log(arrayAux2)
    console.log(arrayNumbers)
    console.log(arrayAux2.length);
    
    let responseWinner = false;


    const searchWinForRow = () => {

        let i = 0;
        if (arrayNumbers.length > 0 || arrayNumbers != null) {

            while (i < todoss.length) {

                if (arrayNumbers.indexOf(todoss[i].b) !== -1) {

                    console.log("prueba 1" + todoss[i].b)
                    if (arrayNumbers.indexOf(todoss[i].i) !== -1) {
                        console.log("prueba 2" + todoss[i].i)
                        if (arrayNumbers.indexOf(todoss[i].n) !== -1) {
                            console.log("prueba 3" + todoss[i].n)
                            if (arrayNumbers.indexOf(todoss[i].g) !== -1) {
                                console.log("prueba 4" + todoss[i].g)
                                if (arrayNumbers.indexOf(todoss[i].o) !== -1) {
                                    console.log("prueba 5" + todoss[i].o)
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
/**
     * 
     * let arrayNumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,
     61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];
     */

/*
   let valueResponse = searchWinForRow();
   if (!(valueResponse)) {
       valueResponse = searchWinForColB();
       if (!(valueResponse)) {
           valueResponse = searchWinForColI();
           if (!(valueResponse)) {
               valueResponse = searchWinForColN();
               if (!(valueResponse)) {
                   valueResponse = searchWinForColG();
                   if (!(valueResponse)) {
                       valueResponse = searchWinForColO();
                       if (!(valueResponse)) {
                           valueResponse = searchWinFor4Corners();
                           if (!(valueResponse)) {
                               valueResponse = searchWinForDiagonal1();
                               if (!(valueResponse)) {
                                   valueResponse = searchWinForDiagonal2();


                               }
                           }
                       }

                   }
               }

           }
       }

   }
   */