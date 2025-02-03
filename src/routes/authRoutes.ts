import express from 'express'

import * as authController from '../controllers/authController'

const router = express.Router()

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/logout', authController.logout)

router.post('/refresh-token', authController.refreshToken)

router.get('/user-list', authController.userList)

export default router;