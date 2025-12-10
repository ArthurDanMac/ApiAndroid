import { Users } from "../model/Users.js";

export const getAllUsers = async (req, res) => {
  const users = await Users.getAllUsers();
  res.json(users);
};