import express from "express";
import  authController from "../controller/authController";
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/login', authController.loginController)

router.post('/logout', authController.logoutController)

router.post('/register', authController.registerController)

module.exports = router
