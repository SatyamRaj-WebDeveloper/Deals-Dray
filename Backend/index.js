import express from 'express';
import { dbConnect } from './DB/dbConnect.js';
import dotenv from 'dotenv';

const PORT = 8000 || process.env.PORT;
const app =express();
app.use(express.json());
dotenv.config({
    path : './.env'
  })

dbConnect()

import userRoutes from '../Backend/routes/user.routes.js'

app.use('/users' , userRoutes);



app.listen(PORT , ()=>{
    console.log(`Port listening at port number ${PORT}`)
})