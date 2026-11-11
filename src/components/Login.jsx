import "./Login.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

async function enviarDatos(URL = '', DATOS = {}) {
    const respuesta = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(DATOS),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return respuesta.json()
}

function Login() {
    const [ nombreUsuario, setNombreUsuario ] = useState("");
    const [ contraseña, setContraseña ] = useState("");

    const cambiarRuta = useNavigate();
    const manejarEnvío = (e) => {
        e.preventDefault();
        const URL = 'http://localhost:3001/'
        const DATOS = {
            "Nombre": nombreUsuario,
            "Contraseña": contraseña,
        }
        if (DATOS.Nombre === "" || DATOS.Contraseña === "") {
            alert("Error: Los campos no pueden estar vacíos.");
        } else {
            enviarDatos(URL, DATOS)
            .then(DATOS => {
                console.log(DATOS);
            });
            cambiarRuta('/chat');
        }
    }

    return(
        <div className="login">
            <form className="login" onSubmit={manejarEnvío}>
                <label htmlFor="NombreUsuario">Usuario:</label>
                <input type="text" id="NombreUsuario" name="NombreUsuario" placeholder="Nombre de usuario" value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} />
                <label htmlFor="Contraseña">Contraseña:</label>
                <input type="password" id="Contraseña" name="Contraseña" placeholder="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} />
                <div className="sign">
                    <input type="submit" id="IniciarSesion" value="Iniciar sesión" />
                    <input type="submit" id="Registrarse" value="Registrarse" />
                </div>
            </form>
        </div>
    )
}

export default Login