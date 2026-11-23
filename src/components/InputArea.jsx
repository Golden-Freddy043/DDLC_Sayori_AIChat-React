import './InputArea.css'
import { useState } from 'react';

function InputArea() {
    return(
        <div className='inputArea'>
            <form>
                <textarea />
                <br />
                <input type="submit" id="enviarConsulta" value="Enviar consulta" />
            </form>
        </div>
    );
}

export default InputArea