import express from "express";
import 'dotenv/config'
import webRoutes from './routes/webRoutes.js'
import bodyParser from 'body-parser'
import connectionDB from './config/connectionDB.js'
import { createJWT, verifyJWT } from './middleware/JWTAction.js'

const app = express()
const port = process.env.PORT || 8002

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// check connection to DB
connectionDB();

// create token
createJWT();
let decodeDat = verifyJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdEpXVCIsImFkZHJlc3MiOiJIQ00iLCJpYXQiOjE3MTEwNzU3NTZ9.yHV-uph0yZqM3Uh_JhzeWOawO9qkUNHJ3BrN8gdbynw")
console.log(decodeDat);

app.use('/', webRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})