import { Task } from "../model/Task.js";


//Todas las Tasks por usuario
export const getTasks = async (req, res) => {
  const { user_id } = req.query;   // --> extraes el campo
  const tasks = await Task.getAll(user_id);  // --> pasas solo el valor
  res.json(tasks );
};

//Una sola Task por id y usuario
export const getTask = async (req, res) => {
  const task = await Task.getById(req.params.id); // --> manera nueva de pasar valor
  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
  res.json(task);
};

//Crear una Task
export const createTask = async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json(newTask);
};

//Actualizar una Task
export const updateTask = async (req, res) => {
  await Task.update(req.body);
  res.json({ message: "Tarea actualizada" });
};

//Eliminar una Task
export const deleteTask = async (req, res) => {
  const { id } = req.params; 
  await Task.delete(id);
  res.json({ message: "Tarea eliminada" });
};
