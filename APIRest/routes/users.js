import express from "express";

import { getAllUsers} from "../controllers/usersController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", verifyToken, getAllUsers);

export default router;
