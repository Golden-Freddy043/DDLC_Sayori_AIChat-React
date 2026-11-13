// ----- MÓDULOS -----
import express from "express";
import cors from "cors";

// ----- INICIAMOS EXPRESS -----
const app = express();
const PORT = 3001;

// ----- CORS y JSON -----
app.use(cors());
app.use(express.json());

// ----- POST /: DATOS DEL FORMULARIO -----
app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ status: "200 OK", mensaje: "Datos enviados correctamente." });
});

// ----- INICIAMOS EL SERVIDOR -----
app.listen(PORT, "0.0.0.0", () => {
  console.log("Escuchando en el puerto " + PORT);
});
