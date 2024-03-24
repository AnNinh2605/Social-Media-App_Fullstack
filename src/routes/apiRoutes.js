import express from "express";
import apiController from "../controller/apiController.js";
const router = express.Router()

router.get('/post', apiController.getAllPostController)

module.exports = router