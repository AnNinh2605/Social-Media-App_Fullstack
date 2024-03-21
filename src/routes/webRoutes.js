import express from "express";
import  authController from "../controller/authController";
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/login', authController.loginController)

router.get('/logout', authController.logoutController)

router.get('/register', authController.registerController)

module.exports = router
