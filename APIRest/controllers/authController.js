import pool from "../config/db.js";


import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const USER = {
  username: "root",
  passwordHash: await bcrypt.hash("password", 10),
};

export const login = async (req, res) => {
  
  const { username, password,email } = req.body;
/*
//Hecho con usuario hardcodeado para pruebas
  if (username !== USER.username) {
    return res.status(401).json({ message: "Usuario incorrecto" });
  }

  const valid = await bcrypt.compare(password, USER.passwordHash);
  if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
*/
    // Buscar usuario en BD
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Verificar contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
   const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
   if(token!=null){
    console.log("Token generated successfully");
    res.json({ token });
   }
  else{
    console.log("Token generation failed");
    console.error("Error generating token");
    res.status(500).json({ message: "Error al generar el token" });
  }
  
};
