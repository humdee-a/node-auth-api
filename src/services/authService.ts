import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { config } from "../config";

const prisma = new PrismaClient();

// Register a new user
export const register = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return user
  } catch (error) {
    console.log(error);
    return null
  }
}

// Login user
export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return null
  }

  const accessToken = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user.id }, config.refreshSecret, { expiresIn: "7d" });

  await prisma.user.update({ where: { id: user.id }, data: { refreshToken } });

  return { user, accessToken, refreshToken }
}

// refreshToken
export const refreshToken = async (refreshToken: string) => {
    if (!refreshToken) return null

    try {
        const decoded: any = jwt.verify(refreshToken, config.refreshSecret);
        const user = await prisma.user.findUnique({ where: { id: decoded.id, refreshToken } });
    
        if (!user) return null
    
        const newAccessToken = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: "15m" });
    
        return newAccessToken
    } catch (error) {
        console.log(error);
        return null
    }
}

// Logout user
export const logout = async (refreshToken: string) => {
    if (!refreshToken) return null

    try {
        const decoded: any = jwt.verify(refreshToken, config.refreshSecret);
        const user = await prisma.user.findUnique({ where: { id: decoded.id, refreshToken } });
    
        if (!user) return null
    
        await prisma.user.update({ where: { id: user.id }, data: { refreshToken: null } });

        return true
    } catch (error) {
        console.log(error);
        return null
    }
}

// List all users
export const userList = async () => {
    try {
        const users = await prisma.user.findMany();
        return users
    } catch (error) {
        console.log(error);
        return null
    }
}
