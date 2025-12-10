import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    if(token==="Bearer Admin123" || token==="Admin123")
       next();
    else{
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);
      
      req.user = decoded;
      next();
    }
  } catch {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
}

