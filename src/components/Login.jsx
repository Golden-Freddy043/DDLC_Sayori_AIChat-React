import "./Login.css"
import { useNavigate } from 'react-router-dom'

function Login() {
    const cambiarRuta = useNavigate();
    const manejarEnvío = (e) => {
        e.preventDefault();
        cambiarRuta('/chat');
    }

    return(
        <div className="login">
            <form className="login" onSubmit={manejarEnvío}>
                <label htmlFor="NombreUsuario">Usuario:</label>
                <input type="text" id="NombreUsuario" name="NombreUsuario" placeholder="Nombre de usuario"/>
                <label htmlFor="Contraseña">Contraseña:</label>
                <input type="password" id="Contraseña" name="Contraseña" placeholder="Contraseña" />
                <div className="sign">
                    <input type="submit" id="IniciarSesion" value="Iniciar sesión" />
                    <input type="submit" id="Registrarse" value="Registrarse" />
                </div>
            </form>
        </div>
    )
}

export default Login