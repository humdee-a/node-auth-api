import { Request, Response } from 'express'

import * as authService from '../services/authService'

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body
        const user = await authService.register(name, email, password)
        
        res.status(201).json({ 
            message: "Register successfully",
            data: user
        })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ 
            message: "Failed to register!",
            error: err.message
        })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body
        const user = await authService.login(email, password)
        
        if (!user) {
            res.status(401).json({ 
                message: "Invalid credentials!"
            })
        } else {
            res.status(200).json({ 
                message: "Login successfully",
                data: user
            })
        }
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ 
            message: "Failed to login!",
            error: err.message
        })
    }
}

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body
        const newAccessToken = await authService.refreshToken(refreshToken)

        if (!newAccessToken) {
            res.status(403).json({ 
                message: "Invalid refresh token!"
            })
        } else {
            res.status(200).json({ 
                message: "Refresh token successfully",
                data: {
                    accessToken: newAccessToken
                }
            })
        }
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ 
            message: "Failed to refresh token!",
            error: err.message
        })
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refreshToken } = req.body
        const result = await authService.logout(refreshToken)

        if (!result) {
            res.status(400).json({ 
                message: "Failed to logout!"
            })
        }else{
            res.status(200).json({ 
                message: "Logout successfully"
            })
        }
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ 
            message: "Failed to logout!",
            error: err.message
        })
    }
}

// List users
export const userList = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await authService.userList()
        res.status(200).json({ 
            message: "List users successfully",
            data: users
        })
    } catch (error) {
        console.log(error)
        const err = error as Error
        res.status(500).json({ 
            message: "Failed to list users!",
            error: err.message
        })
    }
}
