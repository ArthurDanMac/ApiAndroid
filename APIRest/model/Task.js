import pool from "../config/db.js";

export class Task {
  static async getAll(user_id) {
    try {
      const [rows] = await pool.query("SELECT * FROM task WHERE user_id=?", [user_id]);
      return {
        success: true,
        message: "Operación exitosa: tareas obtenidas",
        data: rows
      };
    } catch (error) {
      return {
        success: false,
        message: `401 Error al obtener tareas: ${error.message}`
      };
    }
  }

  static async getById(id, user_id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM task WHERE id = ? AND user_id=?",
        [id, user_id]
      );
      if (rows.length === 0) {
        return {
          success: false,
          message: "402 No se encontró la tarea solicitada"
        };
      }
      return {
        success: true,
        message: "Operación exitosa: tarea encontrada",
        data: rows[0]
      };
    } catch (error) {
      return {
        success: false,
        message: `403 Error al obtener tarea: ${error.message}`
      };
    }
  }

  static async create(task, user_id) {
    try {
      const { name, plannedD, status } = task;
      const [result] = await pool.query(
        "INSERT INTO task (name, plannedD, status, user_id) VALUES (?, ?, ?, ?)",
        [name, plannedD, status, user_id]
      );
      return {
        success: true,
        message: "Operación exitosa: tarea creada",
        data: { id: result.insertId, ...task, user_id }
      };
    } catch (error) {
      return {
        success: false,
        message: `404 Error al crear tarea: ${error.message}`
      };
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
        return {
          success: false,
          message: "405 No se encontró la tarea para actualizar"
        };
      }
      return {
        success: true,
        message: "Operación exitosa: tarea actualizada"
      };
    } catch (error) {
      return {
        success: false,
        message: `406 Error al actualizar tarea: ${error.message}`
      };
    }
  }

  static async delete(id, user_id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM task WHERE id=? AND user_id=?",
        [id, user_id]
      );
      if (result.affectedRows === 0) {
        return {
          success: false,
          message: "407 No se encontró la tarea para eliminar"
        };
      }
      return {
        success: true,
        message: "Operación exitosa: tarea eliminada"
      };
    } catch (error) {
      return {
        success: false,
        message: `408 Error al eliminar tarea: ${error.message}`
      };
    }
  }
}
