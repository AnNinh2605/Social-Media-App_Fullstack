import express from "express";
import 'dotenv/config'
import webRoutes from './routes/webRoutes.js'
import bodyParser from 'body-parser'
import connectionDB from './config/connectionDB.js'

const app = express()
const port = process.env.PORT || 8002

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// check connection to DB
connectionDB();

app.use('/', webRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})