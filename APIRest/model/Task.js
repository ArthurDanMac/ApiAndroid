import pool from "../config/db.js";

export class Task {
  //Obtener todas las tareas de un usuario
  static async getAll(user_id) {
    const [rows] = await pool.query("SELECT * FROM task where user_id=?", [user_id]);
    if(rows === 0)
      console.log("400 No hay tareas para este usuario");
    else{
      console.log("200 Tareas encontradas");
      return rows;
    }
  }

  //Obtener una tarea por id
  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM task WHERE id = ?", [id]);
    if(rows === 0)
      console.log("401 No hay tareas para este usuario con ese id");
    else{
      console.log("201 Tarea encontrada");
      return rows[0];
    }
  }

  //Crear una nueva tarea con su user_id
  static async create(task) {
    const { name,plannedD, status, user_id } = task;
    try{
      const [result] = await pool.query(
        "INSERT INTO task (name, plannedD, user_id,status) VALUES (?, ?, ?, ?)",
        [name,plannedD, user_id, status ]
      );
      console.log("202 Tarea creada");
      return { id: result.insertId, ...task };
    }catch{
      console.log("402 No se pudo crear la tarea");
    }
  }

  //Actualizar una tarea con su user_id
  static async update(task) {
    const {  id, name, plannedD, status, user_id  } = task;
    try{
    await pool.query(
      "UPDATE task SET name=?, plannedD=?, status=?, user_id=? WHERE id=?",
      [name, plannedD, status, user_id, id]
    );
    console.log("203 Tarea actualizada");
    }catch{
      console.log("403 No se pudo actualizar la tarea");
    }
  }

  static async delete(id) {
    try{
    await pool.query("DELETE FROM task WHERE id=?", [id]);
    console.log("204 Tarea eliminada");
    }catch{
      console.log("404 No se pudo eliminar la tarea");
    }
  }
}
