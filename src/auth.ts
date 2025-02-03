import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "./config";

const prisma = new PrismaClient();

export async function register(req: any, res: any) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.json({ message: "User registered", user });
  } catch (error) {
    console.log(error);
    const err = error as Error;
    res.status(400).json({ 
        message: "Email already exists",
        error: err.message
    });
  }
}

export async function login(req: any, res: any) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const accessToken = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user.id }, config.refreshSecret, { expiresIn: "7d" });

  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  res.json({ accessToken, refreshToken });
}

export async function refreshToken(req: any, res: any) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded: any = jwt.verify(refreshToken, config.refreshSecret);
    const user = await prisma.user.findUnique({ where: { id: decoded.id, refreshToken } });

    if (!user) return res.status(403).json({ error: "Invalid refresh token" });

    const newAccessToken = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: "15m" });

    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ error: "Invalid refresh token" });
  }
}

export async function logout(req: any, res: any) {
  const { refreshToken } = req.body;
  await prisma.user.updateMany({ where: { refreshToken }, data: { refreshToken: null } });

  res.json({ message: "Logged out" });
}
