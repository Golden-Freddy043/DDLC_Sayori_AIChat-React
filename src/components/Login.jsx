import "./Login.css"

function Login() {
    return(
        <div className="login">
            <form className="login">
                <label for="NombreUsuario">Usuario:</label>
                <input type="text" id="NombreUsuario" name="NombreUsuario" placeholder="Nombre de usuario"/>
                <label for="Contraseña">Contraseña:</label>
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