import './TextBox.css'
import { useState } from 'react'

function TextBox() {
    const [respuestaIA, setRespuestaIA ] = useState("");

    return(
        <div className='textbox'>
            <p id="respuestaIA">Placeholder</p>
        </div>
    );
}

export default TextBox