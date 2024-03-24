import express from "express";
import 'dotenv/config'
import webRoutes from './routes/webRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import bodyParser from 'body-parser'
// import connectionDB from './config/connectionDB.js'
import cookieParser from 'cookie-parser'
import configCORS from "./routes/CORS.js";

const app = express()
const port = process.env.PORT || 8002

//fix CORS error
configCORS(app);

app.use(cookieParser());
// cookies parse
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// check connection to DB
// connectionDB();

app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})