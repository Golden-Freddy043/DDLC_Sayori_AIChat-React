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
    const data = await respuesta.json();
    return { status: respuesta.status, data };
}

function Login() {
    const [ nombreUsuario, setNombreUsuario ] = useState("");
    const [ contraseña, setContraseña ] = useState("");

    const cambiarRuta = useNavigate();
    const manejarEnvío = async (e) => {
        e.preventDefault();

        const submitter = e.nativeEvent.submitter;
        const acción = submitter?.value ?? "undefined";
        let URL = '';

        if (acción === "Iniciar sesión") {
            URL = '/api/login';
        } else if (acción === "Registrarse") {
            URL = '/api/register';
        }

        const DATOS = {
            "Nombre": nombreUsuario,
            "Contraseña": contraseña
        }
        if (DATOS.Nombre === "" || DATOS.Contraseña === "") {
            alert("Error: Los campos no pueden estar vacíos.");
        } else {
            const { status, data } = await enviarDatos(URL, DATOS);
            switch (status) {
                case 200:
                    cambiarRuta('/chat');
                    alert(data.mensaje);
                    break;
                case 201:
                    // PENDIENTE: Mostrar mensaje en verde de que el usuario se creó exitosamente.
                    alert(data.mensaje);
                    break;
                case 401:
                case 409:
                case 500:
                    // PENDIENTE: Mostrar mensaje en rojo con el error correspondiente.
                    alert(data.error);
                    break;
                default:
                    break;
            }
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