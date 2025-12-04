import pool from "../config/db.js";

export class Task {
  static async getAll(user_id) {
    try {
      const [rows] = await pool.query("SELECT * FROM task WHERE user_id=?", [user_id]);
      console.log("Operación exitosa: tareas obtenidas");
      return  rows ;
    } catch (error) {
      console.log(`401 Error al obtener tareas: ${error.message}`);
    }
  }

  static async getById(id, user_id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM task WHERE id = ? AND user_id=?",
        [id, user_id]
      );
      if (rows.length === 0) {
        console.log("402 No se encontró la tarea solicitada");
      } else {
        console.log("Operación exitosa: tarea encontrada");
      }
      return rows[0] ;
    } catch (error) {
      console.log(`403 Error al obtener tarea: ${error.message}`);
    }
  }

  static async create(task, user_id) {
    try {
      const { name, plannedD, status } = task;
      const [result] = await pool.query(
        "INSERT INTO task (name, plannedD, status, user_id) VALUES (?, ?, ?, ?)",
        [name, plannedD, status, user_id]
      );
      console.log("Operación exitosa: tarea creada");
      return {   id: result.insertId, ...task, user_id };
    } catch (error) {
      console.log(`404 Error al crear tarea: ${error.message}`);
      return { rows: [] };
    }
  }

  static async update(id, task, user_id) {
    try {
      const { name, plannedD, status } = task;
      const [result] = await pool.query(
        "UPDATE task SET name=?, plannedD=?, status=? WHERE id=? AND user_id=?",
        [name, plannedD, status, id, user_id]
      );
      if (result.affectedRows === 0) {
        console.log("405 No se encontró la tarea para actualizar");
      } else {
        console.log("Operación exitosa: tarea actualizada");
      }
     
    } catch (error) {
      console.log(`406 Error al actualizar tarea: ${error.message}`);
    }
  }

  static async delete(id, user_id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM task WHERE id=? AND user_id=?",
        [id, user_id]
      );
      if (result.affectedRows === 0) {
        console.log("407 No se encontró la tarea para eliminar");
      } else {
        console.log("Operación exitosa: tarea eliminada");
      }
    } catch (error) {
      console.log(`408 Error al eliminar tarea: ${error.message}`);
    }
  }
}
