import React, { useState, useEffect } from 'react';
import ConfirmWinner from '../winner/confirwin';
import winner from '../img/WINNER.jpg';
import lose from '../img/LOSE.jpg';


const Bingo = (todoss) => {

    const [counter, setCounter] = useState(0);
    const [numberGenerate, setNumberGenerate] = useState(0);
    const [namePlayers, setNamePlayers] = useState([]);
    const [columnLetter, setColumnLetter] = useState('');
    const [arrayAux2, setArrayAux2] = useState([]);
    const [disguise, setDisguise] = useState(false);
    const [disguise2, setDisguise2] = useState(true);
    const [tittle, setTittle] = useState('');
    const [color, setColor] = useState('');
    const [component, setComponent] = useState('');
    const [playerWinner, setPlayerWinner] = useState('');

    let arrayAux = [];
    let newArrayDataPlayers = [];
    let intervalTime1;
    let intervalTime2;
    let arrayNumbersNoRepeat = [];




    const cambiarEstado = (e, id) => {
        e.preventDefault();
        let seleccionar = document.getElementById(id).disabled = true;

    }

    const playersOnLine = async () => {
        const response = await fetch('http://localhost:8080/players')
        const rsp = await response.json();
        noRepeatNamePlayers(rsp);

    }

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

    const searchwinner = async () => {
        const response = await fetch('http://localhost:8080/buscardatosjuego')
        const rsp = await response.json();
        setPlayerWinner(rsp.ganador);
        clearInterval(intervalTime2);
    }
    useEffect(() => {

        intervalTime1 = setInterval(() => {
            statusPlay(0);
            playersOnLine();
        }, 10000);

    }, [counter])


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

    const updateStatusBingoFinal = async (name) => {
        const body = { name }
        const response = await fetch(`http://localhost:8080/finalizarjuego`, {
            method: 'post',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)

        })

    }

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