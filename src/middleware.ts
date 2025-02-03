import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { config } from "./config";

export function verifyToken(req: any, res: any, next: any) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, config.jwtSecret, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: "Forbidden" });

    req.user = user;
    next();
  });
}
