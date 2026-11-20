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
app.post("/api/login", async (req, res) => {
  try {
    const nombreUsuario = req.body.Nombre;
    const contraseñaUsuario = req.body.Contraseña;
    const acción = req.body.TipoDeAcción;
    let consulta;
    let params = [];

    if (acción === "Iniciar sesión") {
      consulta =
        "SELECT usuarios.* FROM usuarios WHERE usuarios.nombreusuario = $1";
      params = [nombreUsuario];

      const { rows } = await pool.query(consulta, params);

      const usuario = rows[0];
      if (!usuario) {
        return res.status(401).json({ error: "El usuario no existe" });
      }

      const contraseñaValida = await bcrypt.compare(
        contraseñaUsuario,
        usuario.contraseñaUsuario,
      );
      if (!contraseñaValida) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // DEBUG
      console.log("Tabla Usuarios (DEBUG): ", rows);
      console.log("Datos introducidos por el usuario (DEBUG): ", req.body);

      return res.status(200).json({
        mensaje: "Sesión iniciada correctamente",
        datos: rows[0],
      });
    } else if (acción === "Registrarse") {
      const hashContraseña = await bcrypt.hash(contraseñaUsuario, SALT_ROUNDS);

      consulta =
        "INSERT INTO usuarios (nombreusuario, contraseñausuario) VALUES ($1, $2) RETURNING usuarios.*";
      params = [nombreUsuario, hashContraseña];

      const { rows } = await pool.query(consulta, params);

      // DEBUG
      console.log("Tabla Usuarios (DEBUG): ", rows);
      console.log("Datos introducidos por el usuario (DEBUG): ", req.body);

      return res.status(201).json({
        mensaje: "Usuario registrado correctamente",
        datos: rows[0],
      });
    } else {
      console.log("Acción no válida");
      return res.status(400).json({ error: "Acción no válida" });
    }
  } catch (err) {
    res.status(500).json({ error: "Fallo en la consulta: " + err });
  }
});

// ----- INICIAMOS EL SERVIDOR -----
app.listen(PORT, "0.0.0.0", () => {
  console.log("Escuchando en el puerto " + PORT);
});
