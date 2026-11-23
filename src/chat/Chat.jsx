// ----- ESTILOS -----
import "./Chat.css"

// ----- COMPONENTES -----
import InputArea from "../components/InputArea";
import Sayori from "../components/Sayori"
import TextBox from "../components/TextBox";

function Chat() {
    return(
        <div className="chat">
            <InputArea />
            <Sayori />
            <TextBox />
        </div>
    )
}

export default Chat
