import React, { useState } from 'react';
import axios from 'axios';
import Bingo from './bingo';
import Register from './registerPlayers';



const Principal = () => {

    const [todos, setTodos] = useState([]);
    const [disguise, setDisguise] = useState(false);
    const [disguise2, setDisguise2] = useState(true);
    const [disguise3, setDisguise3] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    let [component, setComponent] = useState('');



    const login = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await axios.post('http://localhost:4001/login', body).catch((err) => {
                console.log(error)
            });
            //console.log(response.data._id);
            if (response.data !== "usuario y/o contraseña invalido") {
                buscarEstadoJuego(e, response.data._id,response.data.name);
                setDisguise(true);
                setDisguise3(false)


            } else {
                setError("usuario y/o contraseña invalido");
            }

        } catch (error) {
            console.log(error)
        }
    }


    const validarLogin = (e) => {
        e.preventDefault();
        if (username === null || username === "") {
            setError("Se requiere Usuario de juego (email)");
        } else if (password === null || password === "") {
            setError("Se requiere el password");
        } else {
            login(e);
        }

    }
    const buscarEstadoJuego = async (e, idjugador,namePlayer) => {
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:8080/buscarjuego')
            console.log("esperar")
            const rsp = await response.text();
            //console.log(rsp)

            if (rsp === "pendiente") {

                createPlayers(e, idjugador,namePlayer);

            } else if (rsp === "vacio") {

                createBingo(e, idjugador,namePlayer);
            }

        } catch (error) {
            console.log("error en el metodo buscarEstadoJuego" + error)
        }
    }

    const createBingo = async (e, id,namePlayer) => {
        e.preventDefault();

        try {
            const body = { id }
            const response = await fetch("http://localhost:8080/crearbingo", {
                method: "POST",
                headers: { "content-type": 'application/json' },
                body: JSON.stringify(body),
            })
            const jsonData = await response.json();
            setTodos(jsonData);
            loadCompnent(jsonData,namePlayer);

        } catch (err) {
            console.error(err.message);
        }

    }

    const createPlayers = async (e, id,namePlayer) => {
        e.preventDefault();

        try {
            const body = { id }
            const response = await fetch("http://localhost:8080/crearjugador", {
                method: "POST",
                headers: { "content-type": 'application/json' },
                body: JSON.stringify(body),
            })

            const jsonData = await response.json();
            setTodos(jsonData);
            alert("debe esperar inicio de juego");
            //loadMatrizNumberGamersAux(jsonData);
            loadCompnent(jsonData,namePlayer);
        } catch (err) {
            console.error(err.message);
        }

    }

    const loadCompnent = (todos,namePlayer) => {

        setComponent(<Bingo todoss={todos} nameplayer={namePlayer}/>);

    }

    return (
        <>

            <div className='container' style={{ background: " #e1e2ec " }}> <br />
                <div className='container-fluid' hidden={disguise}>
                    <div className='row' >
                        <div className='col-5' >
                            <div className='row' >
                                <form style={{ background: "#989cbb", borderRadius: "20px" }}>
                                    <h3>Log in</h3>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name='username' value={username} onChange={e => setUsername((e.target.value))} className="form-control" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" name='password' value={password} onChange={e => setPassword((e.target.value))} className="form-control" placeholder="Enter password" />
                                        <div>{error}</div>
                                    </div>

                                    <br />

                                    <button
                                        type="submit"
                                        className="btn btn-dark btn-lg btn-block"
                                        onClick={e => { validarLogin(e) }}>
                                        Ingresar
                                    </button>
                                    <p className="forgot-password text-right">
                                        <br />
                                        <button className="btn btn-primary" onClick={e => {
                                            e.preventDefault()
                                            setDisguise(true);
                                            setDisguise2(false);
                                        }}>

                                            Registrarse
                                        </button>
                                    </p>
                                </form>
                            </div><br />
                        </div>
                        <div className='col-7'>
                            <div className='row' >
                                <p style={{
                                    textAlign: "left",

                                }}>!Bienvenid@s al vingo virtual¡
                                    Para iniciar Juego debe registrarse con nombre de pila,un correo electronico y password.
                                    Despues de haber realizado el registro puede ingresar sus credenciales de acceso(correo y password).
                                    Al ingresar puede haber 3 opciones; 1: Usted al ser el primero en ingresar,creara un  juego y esperara
                                    5 minutos a que otros jugadores se conecten, pasado los 5 minutos dara inicio al juego (solo con usted o
                                    demas jugadores). 2:ingresar a un juego ya creado debe esperar el inicio del juego. 3: ingresar y un juego
                                    ya esta en proceso, para este caso no podra ser parte de ese juego,debe esperar inicio de otro juego.

                                    Al iniciar el juego, los numeros apareceran cada 15 segundos y usted los marcara de acuerdo a lo que tenga
                                    en sus fichas. Para ganar solo debe completar 1 una de las 5 columnas  B ,I, N,G,O al llenar luego presiona
                                    boton gané, el sistema validara las respuestas si es correcto ganara el premio y se termina el juego.

                                    NOTA: Con su usuario solo podra jugar una unica vez.

                                </p>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='container-fluid' hidden={disguise2}>
                    <div className='row'>
                        <Register />
                    </div>

                    <div className='row'>
                        <button className="btn btn-primary" onClick={e => {
                            e.preventDefault()
                            setDisguise(false);
                            setDisguise2(true);
                        }}>

                            Ir al Inicio
                        </button>
                    </div>
                    <br />
                </div>
                <div className='container-fluid' hidden={disguise3} style={{ width: '1024px', height: '400px' }}>
                    {component}
                </div><br />

            </div>
        </>
    );
}
export default Principal;