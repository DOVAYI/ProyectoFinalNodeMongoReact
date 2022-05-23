import React, { useState, useEffect } from 'react';


const Bingo = ({ todoss }) => {
    const [counter, setCounter] = useState(0);
    const [numberGenerate, setNumberGenerate] = useState(0);
    const [namePlayers, setNamePlayers] = useState([]);
    const [columnLetter,setColumnLetter]= useState('');
    let arrayAux = [];
    let newArrayDataPlayers = [];
    let arrayBidimensional = new Array(5);
    let intervalTime1;
    let intervalTime2;
    let intervalTime3;
    let arrayNumbersNoRepeat = [];


    const loadMatrizNumberGamersAux = (datas) => {

    }



    const loadMatrizNumberGamers = (number) => {

        for (var p = 0; p < 5; p++) {
            arrayBidimensional[p] = new Array(5);
            arrayBidimensional[p] = [0, 0, 0, 0, 0];

        }

        for (let k = 0; k < todoss.length; k++) {
            console.log(todoss[k].b);
        }
    }



    const cambiarEstado = (e, id) => {
        e.preventDefault();
        let seleccionar = document.getElementById(id).disabled = true;
        loadMatrizNumberGamers(id);
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


    useEffect(() => {
        const statusPlay = async () => {
            const response = await fetch('http://localhost:8080/buscarjuego2')
            const rsp = await response.text();

            console.log(rsp)
            if (rsp === "iniciado") {
                numbersBingo();

            }
        }
        intervalTime1 = setInterval(() => {
            statusPlay();
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


        }, 15000);

    }
    const showNumber = (numbers) => {
        const lengthData = numbers.length;
        if (arrayNumbersNoRepeat.length === 0) {
            arrayNumbersNoRepeat.push(numbers[lengthData - 1].numeros);
            setNumberGenerate(numbers[lengthData - 1].numeros);
            showNumbersBingo(numbers[lengthData - 1].numeros);
        } else {
            if (arrayNumbersNoRepeat.indexOf(numbers[lengthData - 1].numeros) === -1) {
                arrayNumbersNoRepeat.push(numbers[lengthData - 1].numeros);
                setNumberGenerate(numbers[lengthData - 1].numeros);
                showNumbersBingo(numbers[lengthData - 1].numeros);
            }
        }


    }

    const showNumbersBingo = (bingonum) => {
        setColumnLetter('');
        if(bingonum>0 && bingonum<16){
            setColumnLetter('B');

        }else if(bingonum>15 && bingonum<31){
            setColumnLetter('I');

        }else if(bingonum>30 && bingonum<46){
            setColumnLetter('N');

        }else if(bingonum>45 && bingonum<61){
            setColumnLetter('G');

        }else if(bingonum>60 && bingonum<76){
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

    return (
        <>
            <div className='row'>
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
                                todoss.map(todo => (

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
                        <div className="col-4" ><br />
                            <input type='submit' value='Ganar' style={{ width: '100px', height: '50px' }} /><br />
                            <label>Letra</label>
                            <input type='text' value={columnLetter} style={{textAlign:'center'}} readOnly />
                            <label>Numero generado</label>
                            <input type='text' value={numberGenerate} style={{textAlign:'center'}} readOnly />
                        </div>


                    </div>
                </div>
            </div>
            <div className='row'>
                <h3 style={{ color: 'blue', textAlign: 'center' }}>Numeros Bingo</h3>
            </div>
            <div className='row'>
                <div id='numberb' className='col-10'>

                </div>
            </div>
        </>
    )
}
export default Bingo;