import express from "express";
import apiController from "../controller/apiController.js";
const router = express.Router()

router.get('/post', apiController.getAllPostController)
router.post('/create-post', apiController.createPostController)

module.exports = router