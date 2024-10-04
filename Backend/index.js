import express from 'express';
import { dbConnect } from './DB/dbConnect.js';
import dotenv from 'dotenv';
import cors from 'cors';

const PORT = 8000 || process.env.PORT;
const app =express();
app.use(express.json());
dotenv.config({
    path : './.env'
  })

app.use(cors({
  origin : 'http://localhost:5173',
  methods : 'GET,POST,PUT,DELETE',
}) )

dbConnect()


import userRoutes from '../Backend/routes/user.routes.js'

app.use('/api/v1/users' , userRoutes);



app.listen(PORT , ()=>{
    console.log(`Port listening at port number ${PORT}`)
})