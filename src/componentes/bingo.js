/**
 * importar funcionalidad React
 * NOTA:actualmente no es necesario esta importacion
 * pero se considera buena practica
 * * la funcion useState permite inicialzar una variable valga la redundancia en 
 * un estado incial
 * useEffect es una funcion que reacciona a un evento particular y recibe parametros opcionales
 * para que ejecuta un fragmento de codigo
 */
import React, { useState, useEffect } from 'react';
/**
 * importamos Funcion que permite verificar si hubo ganador
 */
import ConfirmWinner from '../winner/confirwin';
/**
 * esta función permite llamar una imagen que se muestra cuando gana un jugador.
 */
import winner from '../img/WINNER.jpg';
/**
 * esta función permite llamar una imagen que se muestra cuando pierde un jugador.
 */
import lose from '../img/LOSE.jpg';

/**
 * esta Funcion hijo contiene toda logica del bingo
 * @param {*} todoss contine los numeros aleatorios y nombre jugador
 * @returns una vista con todo los datos del bingo
 */
const Bingo = (todoss) => {

    /**
     * esta variable permite el control de useEffect que "entre" 1 sola vez 
     * estado inicial 0
     */
    const [counter, setCounter] = useState(0);
    /**
     * Esta variable permite almacenar el  numero aleatorio traido desde la bd mysql
     */
    const [numberGenerate, setNumberGenerate] = useState(0);
    /**
     * Este array de nombre de jugadores en linea
     */
    const [namePlayers, setNamePlayers] = useState([]);
    /**
     * Esta variable almacena la letra que corresponde segun el numero
     * 
     */
    const [columnLetter, setColumnLetter] = useState('');
    /**
     * esta variable almacena lista de numeros aleatorios 
     */
    const [arrayAux2, setArrayAux2] = useState([]);
    /**
     * esta variable permite mostrar u ocultar vista donde se esta jugando
     */
    const [disguise, setDisguise] = useState(false);
    /**
     * esta variable permite mostrar u ocultar vista del ganador
     */
    const [disguise2, setDisguise2] = useState(true);
    /**
     * almacena el titulo de la vista que muestra la victoria 
     * o derrota del jugador
     */
    const [tittle, setTittle] = useState('');
    /**
     * permite cambiar el color del titulo
     */
    const [color, setColor] = useState('');
    /**
     * esta variable permite mostrar imagen para el usurio por si es
     * perdedor o ganador(imagenes diferentes)
     */
    const [component, setComponent] = useState('');
    /**
     * permite mostrar al ganador del juego
     */
    const [playerWinner, setPlayerWinner] = useState('');
    /**
     * permite almacenar los id de los jugadores
     */
    let arrayAux = [];
    /**
     * informacion de jugadores
     */
    let newArrayDataPlayers = [];
    /**
     * permite controlar la función setInterval
     */
    let intervalTime1;
    /**
     * permite controlar la función setInterval
     */
    let intervalTime2;
    /**
     * Array almacena numeros traidos de la bd generados aleatorios
     * no repetir numeros
     */
    let arrayNumbersNoRepeat = [];



    /**
     * Esta función permite deshabilitar un boton al presionarlo
     * @param {*} e 
     * @param {*} id recibe el id del boton para deshabilarlo al presionar
     */
    const cambiarEstado = (e, id) => {
        e.preventDefault();
        let seleccionar = document.getElementById(id).disabled = true;

    }

    /**
     * esta funcion trae los jugadores vinculados a un juego
     */
    const playersOnLine = async () => {
        const response = await fetch('http://localhost:8080/players')
        const rsp = await response.json();
        noRepeatNamePlayers(rsp);

    }
    /**
     * esta funcion permite controlar, no repetir
     * los usuarios en la vista
     */
    const noRepeatNamePlayers = (rsps) => {
        rsps.map(rsp => {
            if (arrayAux.indexOf(rsp._id) === -1) {
                arrayAux.push(rsp._id);
                newArrayDataPlayers.push(rsp);
            }

        });
        setNamePlayers([]);
        setNamePlayers(newArrayDataPlayers);
    }

    /**
     * esta función busca estado del juego 
     * @param {*} optional 
     */
    const statusPlay = async (optional) => {

        const response = await fetch('http://localhost:8080/buscarjuego2')
        const rsp = await response.text();

        console.log(rsp)
        if (rsp === "iniciado" && optional === 0) {
            numbersBingo();

        } else if (rsp === "finalizado" && optional === 1) {
            searchwinner();
        }
    }
    /**
     * esta Función permite buscar los datos del gandor del juego
     */
    const searchwinner = async () => {
        const response = await fetch('http://localhost:8080/buscardatosjuego')
        const rsp = await response.json();
        setPlayerWinner(rsp.ganador);
        clearInterval(intervalTime2);
    }
    /**
     * este metodo permite la entrada a la función al renderizar este componente
     */
    useEffect(() => {

        intervalTime1 = setInterval(() => {
            statusPlay(0);
            playersOnLine();
        }, 10000);

    }, [counter])

    /**
     * Esta función consulta los numeros generados
     */
    const numbersBingo = () => {

        clearInterval(intervalTime1);

        const generateNumberBingo = async () => {

            const response = await fetch('http://localhost:8080/numerosbingo')
                .catch((err) => console.log(err))
            const jsonData = await response.json();


            showNumber(jsonData);
            playersOnLine();
        }

        intervalTime2 = setInterval(() => {

            generateNumberBingo();
            statusPlay(1);


        }, 15000);

    }
    /**
     * este Funcion Permite controlar que nose repitan los numeros
     */
    const showNumber = (numbers) => {
        const lengthData = numbers.length;
        if (arrayNumbersNoRepeat.length === 0) {
            arrayNumbersNoRepeat.push(numbers[lengthData - 1].numeros);
            setArrayAux2([]);
            setArrayAux2(arrayNumbersNoRepeat);
            setNumberGenerate(numbers[lengthData - 1].numeros);
            showNumbersBingo(numbers[lengthData - 1].numeros);
        } else {
            if (arrayNumbersNoRepeat.indexOf(numbers[lengthData - 1].numeros) === -1) {
                arrayNumbersNoRepeat.push(numbers[lengthData - 1].numeros);
                setArrayAux2([]);
                setArrayAux2(arrayNumbersNoRepeat);
                setNumberGenerate(numbers[lengthData - 1].numeros);
                showNumbersBingo(numbers[lengthData - 1].numeros);
            }
        }


    }
    /**
     * esta función permite mostrar una letra segun el numero
     */
    const showNumbersBingo = (bingonum) => {
        setColumnLetter('');
        if (bingonum > 0 && bingonum < 16) {
            setColumnLetter('B');

        } else if (bingonum > 15 && bingonum < 31) {
            setColumnLetter('I');

        } else if (bingonum > 30 && bingonum < 46) {
            setColumnLetter('N');

        } else if (bingonum > 45 && bingonum < 61) {
            setColumnLetter('G');

        } else if (bingonum > 60 && bingonum < 76) {
            setColumnLetter('O');

        }
        const newLabel = document.createElement('label');
        //agrego la clase deseada
        newLabel.className += "col-md-3 control-label text-white";
        newLabel.style += "font-size:20px";
        newLabel.textContent = bingonum;
        //agregando el label
        const contenedor = document.getElementById('numberb');
        contenedor.appendChild(newLabel);
    }
    /**
     * Esta función permite actualizar a finalizado el juego 
     * @param {*} name recibe el nombre del jugador ganador
     */
    const updateStatusBingoFinal = async (name) => {
        const body = { name }
        const response = await fetch(`http://localhost:8080/finalizarjuego`, {
            method: 'post',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)

        })

    }

    /**
     * codigo html y css
     */
    return (
        <>
            <div className='row' hidden={disguise}>
                <div className="col-4" style={{ background: 'blue' }}>
                    <table className="table" id="tabla">
                        <thead>
                            <tr>
                                <th scope="col">B</th>
                                <th scope="col">I</th>
                                <th scope="col">N</th>
                                <th scope="col">G</th>
                                <th scope="col">O</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todoss.todoss.map(todo => (

                                    <tr key={todo.idnj}>
                                        <td><input id={todo.b} onClick={(e) => { cambiarEstado(e, todo.b) }} type='submit' value={todo.b} style={{ width: '50px', height: '50px' }} /></td>
                                        <td><input id={todo.i} onClick={(e) => { cambiarEstado(e, todo.i) }} type='submit' value={todo.i} style={{ width: '50px', height: '50px' }} /></td>
                                        <td><input id={todo.n} onClick={(e) => { cambiarEstado(e, todo.n) }} type='submit' value={todo.n} style={{ width: '50px', height: '50px' }} /></td>
                                        <td><input id={todo.g} onClick={(e) => { cambiarEstado(e, todo.g) }} type='submit' value={todo.g} style={{ width: '50px', height: '50px' }} /></td>
                                        <td><input id={todo.o} onClick={(e) => { cambiarEstado(e, todo.o) }} type='submit' value={todo.o} style={{ width: '50px', height: '50px' }} /></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div><br />
                <div className="col-7" style={{ background: 'blue' }}>
                    <div className='row'>
                        <div className="col-7" >
                            <div className='row'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Jugadores en Linea</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            namePlayers.map(namePlayer => (
                                                <tr key={namePlayer._id}>
                                                    <td style={{ color: 'white' }}>{namePlayer.name}</td>
                                                </tr>
                                            )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <div className='row'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Ganador</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            <tr>
                                                <td style={{ color: 'white' }}>{playerWinner}</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-4" ><br />
                            <input type='submit' onClick={(e) => {
                                e.preventDefault();
                                const baprue = ConfirmWinner(todoss.todoss, arrayAux2);
                                if (baprue) {
                                    setDisguise(true);
                                    setDisguise2(false);
                                    setComponent(winner);
                                    setColor('red');
                                    setTittle('¡FELICITACIONES HAS GANADO¡');
                                    updateStatusBingoFinal(todoss.nameplayer);
                                } else {

                                    setDisguise(true);
                                    setDisguise2(false);
                                    setComponent(lose);
                                    setColor('black');
                                    setTittle('¡Ohh¡ perdistes');
                                }




                            }} value='Ganar' style={{ width: '100px', height: '50px' }} /><br />
                            <label>Letra</label>
                            <input type='text' value={columnLetter} style={{ textAlign: 'center' }} readOnly />
                            <label>Numero generado</label>
                            <input type='text' value={numberGenerate} style={{ textAlign: 'center' }} readOnly />
                        </div>
                    </div>
                </div>
            </div>
            <div className='row' hidden={disguise}>
                <h3 style={{ color: 'blue', textAlign: 'center' }}>Numeros Bingo</h3>
            </div>
            <div className='row' hidden={disguise}>
                <div id='numberb' className='col-10'>

                </div>
            </div>
            <div className='row' hidden={disguise2}>
                <h1 style={{ textAlign: 'center', color: { color } }}>{tittle}</h1>
                <img src={component} alt='' width='300px' height='225px'></img>
            </div>
        </>
    )
}
export default Bingo;