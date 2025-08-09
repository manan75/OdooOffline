import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './Config/db.js'
import cookieParser from 'cookie-parser'


dotenv.config()

//Express setup
const app = express()
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}));
app.use(express.json())
connectDB();
app.use(cookieParser())


//API's

app.use('/api/auth', authRouter)

app.get('/', (req, res) => res.send('StackIt API is running'))










    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
  
