import express from "express";
import { login } from "../controllers/authController.js";
import { getAllUsers} from "../controllers/authController.js";


const router = express.Router();

router.post("/login", login);
router.get("/users", verifyToken, getAllUsers);


export default router;
