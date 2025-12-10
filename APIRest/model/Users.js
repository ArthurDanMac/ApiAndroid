import pool from "../config/db.js";

export class Users {

//Obtener todas las tareas 
  static async getAllUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    if(rows === 0)
      console.log("500 No hay usuarios");
    else{
      console.log("300 Usuarios encontrados");
      return rows;
    }
  }
}