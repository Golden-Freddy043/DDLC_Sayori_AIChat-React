// ----- MÓDULOS -----
import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "../postgres/db.js";

// ----- INICIAMOS EXPRESS -----
const app = express();
const PORT = 3001;

// ----- CORS y JSON -----
app.use(cors());
app.use(express.json());

// ----- POST /: DATOS DEL FORMULARIO -----
app.post("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT Usuarios.id, Usuarios.nombreUsuario FROM Usuarios",
    );
    console.log("Tabla Usuarios (vacía, DEBUG): ", rows);
    console.log("Datos introducidos por el usuario (DEBUG): ", req.body);
    res.json({
      status: "200 OK",
      mensaje: "Datos enviados correctamente: ",
      datos: rows,
    });
  } catch (err) {
    res.status(500).json({ error: "Fallo en la consulta: " + err });
  }
});

// ----- INICIAMOS EL SERVIDOR -----
app.listen(PORT, "0.0.0.0", () => {
  console.log("Escuchando en el puerto " + PORT);
});
