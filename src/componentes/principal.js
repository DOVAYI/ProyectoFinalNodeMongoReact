import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
import axios from 'axios';


const Principal = () => {

    const [todos, setTodos] = useState([]);
    const [contador, setContador] = useState(1);
    const [disguise, setDisguise] = useState(false);
    const [disguise2, setDisguise2] = useState(true);
    const [disguise3, setDisguise3] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [error, setError] = useState('');
    let [btnActivo, setBtnActivo] = useState(false);


    const validarCampos = (e) => {

        if (name === null || name === "") {
            setError("Se requiere el Nombre del Jugador");
        } else if (username === null || username === "") {
            setError("Se requiere Usuario de juego (email)");
        } else if (password === null || password === "") {
            setError("Se requiere el password");
        } else {
            if (password === confpassword) {
                let option = validator.isEmail(username);
                if (option) {
                    setError(" ");
                    setBtnActivo(true);
                    saveGamers(e);
                } else {
                    setError("Correo invalido");
                }
            } else {
                setError("LAS CONTRASEÑAS NO COINCIDEN");
            }
        }

    }

    const getTodos = async (e, id) => {
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




        } catch (err) {
            console.error(err.message);
        }

    }
    useEffect(()=>{
        const timer=setTimeout(()=>{
                   alert("entro al useeffect");
        },10000)
        
    },[contador]);
    //cambia el estado de juego y con use effect consultas los numeros para el bingo
    //
    const actualizarEstadoJuego=async(e)=>{
        e.preventDefault();
        try {
            await fetch("http://localhost:8080/actualizarestado",{
                method:"patch",
                headers: { "content-type": 'application/json' },
            }).then(()=>{
                alert("puede iniciar el juego")
                setContador(contador+1);
            })
        } catch (error) {
            console.log("error en el metodo actualizarEstadoJuego"+error.message)
        }

    }
    const buscarEstadoJuego = async(e,idjugador) => {
        e.preventDefault();
        try {
            const response= await fetch("http://localhost:8080/buscarjuego");
            
            console.log("aqui buscarestado"+ response.type.length);
            if(response.type.length==0){
                setDisguise(true);
                setDisguise3(false);
                getTodos(e,idjugador);
            }else if(response.type.length>0){
                setDisguise(true);
                setDisguise3(false);
                getTodos(e,idjugador)
                const timer=setTimeout(()=>{
                    actualizarEstadoJuego(e);
                },60000)
                //clearTimeout(timer);
            }
        } catch (error) {
            console.log("error en el metodo buscarEstadoJuego"+error)
        }
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await axios.post('http://localhost:4001/login', body).catch((err) => {
                console.log(error)
            });
            console.log(response.data._id);
            if (response.data !== "usuario y/o contraseña invalido") {
                buscarEstadoJuego(e, response.data._id);

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

    const saveGamers = async (e) => {
        e.preventDefault();
        try {
            const body = { name, username, password };
            const response = await fetch('http://localhost:4001/register', {
                method: "POST",
                headers: { "content-type": 'application/json' },
                body: JSON.stringify(body),
            }).then(() => {
                setError("Registro Guardado con exito")
                setTimeout(() => {
                    setError("");
                }, 2000)
                limpiarCampos();
                setBtnActivo(false);
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }

    }
    //ruta http://localhost:8080/crearbingo
    

    

    const limpiarCampos = () => {
        setName('');
        setUsername('');
        setPassword('');
    }

    const cambiarEstado = (e, id) => {
        e.preventDefault();
        let seleccionar = document.getElementById(id).disabled = true;


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

                                }}>Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply
                                    random text. It has roots in a piece of
                                    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
                                    a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container-fluid' hidden={disguise2}>
                    <div className="modal-content" style={{ background: "#989cbb" }}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Crear Jugador</h5>
                        </div>
                        <div className="modal-body ">
                            <div className="container">
                                <div className="row">
                                    <div className="col-2"><label>Nombre</label>
                                        <input type="text" value={name} onChange={e => setName((e.target.value))} /><label>Usuario</label>
                                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                                    </div>
                                    <div className="col-6">{error}</div>
                                    <div className="col-2">
                                        <label>Contraseña</label>
                                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                        <label>Confirmar Contraseña</label>
                                        <input type="password" value={confpassword} onChange={e => setConfpassword(e.target.value)} />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={(e) => { validarCampos(e) }} type="button" id="btnSave" className="btn btn-success" disabled={btnActivo} ><FontAwesomeIcon icon={faSave} />Guardar</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><FontAwesomeIcon icon={faCancel} />Limpiar Campos</button>
                        </div>
                        <button className="btn btn-primary" onClick={e => {
                            e.preventDefault()
                            setDisguise(false);
                            setDisguise2(true);
                        }}>

                            Ir al Inicio
                        </button>

                    </div><br />
                </div>
                <div className='container-fluid' hidden={disguise3} style={{ width: '1024px', height: '400px' }}>
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
                                        todos.map(todo => (

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
                                    </table>
                                </div>
                                <div className="col-4" ><br />
                                    <input type='submit' value='Ganar' style={{ width: '100px', height: '50px' }} /><br />
                                    <label>Letra</label>
                                    <input type='text' disabled />
                                    <label>Numero generado</label>
                                    <input type='text' disabled />
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <table className="table">
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
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td >Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div><br />

            </div>
        </>
    );
}
export default Principal;