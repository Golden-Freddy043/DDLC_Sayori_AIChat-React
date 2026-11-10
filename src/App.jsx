// ----- RUTAS -----
import { Routes, Route } from 'react-router-dom'

// ----- ESTILOS -----
import './App.css'

// ----- COMPONENTES -----
import Title from './components/Title'
import Login from './components/Login'
import Chibi from './components/Chibi'
import Chat from './chat/Chat'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<><Title /><Login /><Chibi /></>} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
