import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';

const Register = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [error, setError] = useState('');
    let [btnActivo, setBtnActivo] = useState(false);

    const limpiarCampos = () => {
        setName('');
        setUsername('');
        setPassword('');
    }
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

    const saveGamers = async (e) => {
        e.preventDefault();
        try {
            const body = { name, username, password };
            await fetch('http://localhost:4001/register', {
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


    return (
        <>
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
                

            </div>
        </>
    )
}
export default Register;