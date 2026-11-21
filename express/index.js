// ----- MÓDULOS -----
import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "../postgres/db.js";
import bcrypt from "bcrypt";

// ----- INICIAMOS EXPRESS -----
const app = express();
const PORT = 3001;

// ----- DECLARAMOS EL SALT DE BCRYPT -----
const SALT_ROUNDS = 10;

// ----- CORS y JSON -----
app.use(cors());
app.use(express.json());

// ----- POST /: DATOS DEL FORMULARIO -----
// --- LOGIN ---
app.post("/api/login", async (req, res) => {
  try {
    const nombreUsuario = req.body.Nombre;
    const contraseñaUsuario = req.body.Contraseña;
    let consulta =
      "SELECT usuarios.* FROM usuarios WHERE usuarios.nombre_usuario = $1";
    let params = [nombreUsuario];

    const { rows } = await pool.query(consulta, params);

    const usuario = rows[0];
    if (!usuario) {
      return res.status(401).json({ error: "El usuario no existe" });
    }

    const contraseñaValida = await bcrypt.compare(
      contraseñaUsuario,
      usuario.contraseña_usuario,
    );
    if (!contraseñaValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // DEBUG
    console.log("Tabla Usuarios (DEBUG): ", rows);
    console.log("Datos introducidos por el usuario (DEBUG): ", req.body);

    return res.status(200).json({
      mensaje: "Sesión iniciada correctamente",
    });
  } catch (err) {
    return res.status(500).json({ error: "Fallo en la consulta: " + err });
  }
});

// --- REGISTRO ---
app.post("/api/register", async (req, res) => {
  try {
    const nombreUsuario = req.body.Nombre;
    const contraseñaUsuario = req.body.Contraseña;
    const hashContraseña = await bcrypt.hash(contraseñaUsuario, SALT_ROUNDS);
    let consulta =
      "INSERT INTO usuarios (nombre_usuario, contraseña_usuario) VALUES ($1, $2) RETURNING usuarios.*";
    let params = [nombreUsuario, hashContraseña];

    const { rows } = await pool.query(consulta, params);

    // DEBUG
    console.log("Tabla Usuarios (DEBUG): ", rows);
    console.log("Datos introducidos por el usuario (DEBUG): ", req.body);

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
    });
  } catch (err) {
    if (err.code === "23505") {
      // DEBUG
      console.log("Ya existe un usuario con ese nombre");
      return res
        .status(409)
        .json({ error: "Ya existe un usuario con ese nombre" });
    } else {
      return res.status(500).json({ error: "Fallo en la consulta: " + err });
    }
  }
});

// ----- INICIAMOS EL SERVIDOR -----
app.listen(PORT, "0.0.0.0", () => {
  console.log("Escuchando en el puerto " + PORT);
});
