import './Chibi.css'
import { useState } from 'react'

let chibiDistrait = 'src/assets/characters/Sayori/Sayori_Sticker_Distrait.webp'
let chibiExcited = 'src/assets/characters/Sayori/Sayori_Sticker_Excited.webp'

function Chibi() {
    const [chibiSprite, setChibiSprite] = useState(chibiDistrait);
    const chibiHover = () => {
        setChibiSprite(chibiExcited);
    }
    const chibiLeave = () => {
        setChibiSprite(chibiDistrait);
    }

    return (
        <div className="chibi">
            <img onMouseEnter={chibiHover} onMouseLeave={chibiLeave} src={chibiSprite} alt="SayoriChibi" />
        </div>
    )
}

export default Chibi