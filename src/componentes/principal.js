/**
 * este componente contiene toda logica de frontend y ademas tiene 2 componentes hijos 
 * (bingo.js y registerPlayers.js)
 * la funcion useState permite inicialzar una variable valga la redundancia en 
 * un estado incial
 */
import React, { useState } from 'react';
/**
 * importa funcionalidad de axios
 * se utiliza axios y fetch por motivos educativos
 */
import axios from 'axios';
/**
 * importa el componente funcional Bingo (componente hijo)
 */
import Bingo from './bingo';
/**
 * importa el componente funcional Register (componente hijo)
 */
import Register from './registerPlayers';



const Principal = () => {
    /**
     * Esta variable almacena todos los datos,listas de numeros de 
     * jugador
     */
    const [todos, setTodos] = useState([]);
    /**
     * Esta variable permite mostrar u ocultar la vista principal login 
     */
    const [disguise, setDisguise] = useState(false);
    /**
     * Esta variable permite mostrar u ocultar la vista de registro de usuarios
     */
    const [disguise2, setDisguise2] = useState(true);
    /**
     * Esta variable permite mostrar u ocultar la vista principal del juego 
     */
    const [disguise3, setDisguise3] = useState(true);
    /**
     * almacena el usuario del juego en este caso el correo electronico con 
     * el cual se registro
     */
    const [username, setUsername] = useState('');
    /**
     * almacena la contraseña digitada por le usuario
     */
    const [password, setPassword] = useState('');
    /**
     * almacena información sobre algun error a logearse,
     */
    const [error, setError] = useState('');
    /**
     * permtite mostrar el componente funcional Bingo
     */
    let [component, setComponent] = useState('');


    /**
     * esta función permite logearse
     * @param {*} e recibe un evento y se utiliza
     * preventDefault para evitar recargar la pagina
     */
    const login = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await axios.post('http://localhost:4001/login', body).catch((err) => {
                console.log(error)
            });

            if (response.data !== "usuario y/o contraseña invalido") {
                buscarEstadoJuego(e, response.data._id, response.data.name);
                setDisguise(true);
                setDisguise3(false)


            } else {
                setError("usuario y/o contraseña invalido");
            }

        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Función que permite validar que el usuario ingrese las credenciales
     * (usuario y contraseña)
     */
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

    /**
     * Esta función permite buscar en la base de datos Mysql estado de juego.
     * 
     * @param {*} e evento para evitar recargar pagina
     * @param {*} idjugador recibe este parametro para posteriomente enviarlo a otro metodo
     * @param {*} namePlayer recibe este parametro para posteriomente enviarlo a otro metodo
     */
    const buscarEstadoJuego = async (e, idjugador, namePlayer) => {
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:8080/buscarjuego')
            console.log("esperar")
            const rsp = await response.text();
            if (rsp === "pendiente") {

                createPlayers(e, idjugador, namePlayer);

            } else if (rsp === "vacio") {

                createBingo(e, idjugador, namePlayer);
            }

        } catch (error) {
            console.log("error en el metodo buscarEstadoJuego" + error)
        }
    }

    /**
     * Esta función permite crear juego en caso que no halla ningun juego disponible.
     * 
     * @param {*} e evento para evitar recargar pagina
     * @param {*} idjugador identificador del jugador en la base de datos
     * @param {*} namePlayer este lo envia componente hijo,en caso de ganar lo guarda como ganador
     */
    const createBingo = async (e, id, namePlayer) => {
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
            loadCompnent(jsonData, namePlayer);

        } catch (err) {
            console.error(err.message);
        }

    }
    /**Esta funcion permite crear jugador en caso de que exista un juego en estado pendiente
     * 
    * @param {*} e evento para evitar recargar pagina
     * @param {*} idjugador identificador del jugador en la base de datos
     * @param {*} namePlayer este lo envia componente hijo,en caso de ganar lo guarda como ganador
     */
    const createPlayers = async (e, id, namePlayer) => {
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

            loadCompnent(jsonData, namePlayer);
        } catch (err) {
            console.error(err.message);
        }

    }

    /**
     * Esta funcion permite llamar componente hijo Bingo
     * @param {*} todos 
     * @param {*} namePlayer 
     */
    const loadCompnent = (todos, namePlayer) => {

        setComponent(<Bingo todoss={todos} nameplayer={namePlayer} />);

    }
    /**
     * Codigo HTMl,css
     */
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