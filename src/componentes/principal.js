import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
import axios from 'axios';


const Principal = () => {

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
            }else{
                setError("LAS CONTRASEÑAS NO COINCIDEN");
            }
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

    const login = async (e) => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await axios.post('http://localhost:4001/login', body).catch((err) => {
                console.log(error)
            });
            console.log(response.data);
            if (response.data !== "usuario y/o contraseña invalido") {
                setDisguise(true);
                setDisguise3(false);
            } else {
                setError("usuario y/o contraseña invalido");
            }

        } catch (error) {
            console.log(error)
        }
    }

    const limpiarCampos = () => {
        setName('');
        setUsername('');
        setPassword('');
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
                            <div className='row'>
                                <div className="col-12">
                                    <input type='text' value='B' style={{ textAlign: "center", width: '50px', height: '20px' }} disabled />
                                    <input type='text' value='I' style={{ textAlign: "center", width: '50px', height: '20px' }} disabled />
                                    <input type='text' value='N' style={{ textAlign: "center", width: '50px', height: '20px' }} disabled />
                                    <input type='text' value='G' style={{ textAlign: "center", width: '50px', height: '20px' }} disabled />
                                    <input type='text' value='O' style={{ textAlign: "center", width: '50px', height: '20px' }} disabled />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12">
                                    <input type='submit' value='1' style={{ width: '50px', height: '50px' }} disabled />
                                    <input type='submit' value='2' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='3' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='4' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='5' style={{ width: '50px', height: '50px' }} />
                                </div>
                            </div><br />
                            <div className='row'>
                                <div className="col-12">
                                    <input type='submit' value='6' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='7' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='8' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='9' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='10' style={{ width: '50px', height: '50px' }} />
                                </div>
                            </div><br />
                            <div className='row'>
                                <div className="col-12">
                                    <input type='submit' value='11' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='12' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='13' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='14' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='15' style={{ width: '50px', height: '50px' }} />
                                </div>
                            </div><br />
                            <div className='row'>
                                <div className="col-12">
                                    <input type='submit' value='16' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='17' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='18' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='19' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='20' style={{ width: '50px', height: '50px' }} />
                                </div>
                            </div><br />
                            <div className='row'>
                                <div className="col-12">
                                    <input type='submit' value='21' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='22' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='23' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='24' style={{ width: '50px', height: '50px' }} />
                                    <input type='submit' value='25' style={{ width: '50px', height: '50px' }} />
                                </div>
                            </div><br />
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