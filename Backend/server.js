import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


import authRouter from './Routes/authRoutes.js'
import userRouter from './Routes/userRoutes.js'
import db from './Config/db.js'
import searchRouter from './Routes/searchRoutes.js'
import tripRouter from './Routes/tripRoutes.js'
import communityRouter from './Routes/communityRoutes.js'




dotenv.config()

//Express setup
const app = express()
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, 
}));
app.use(express.json())

app.use(cookieParser())


//API's
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/trips', tripRouter);
app.use('/api/community',communityRouter);



app.get('/', (req, res) => res.send('StackIt API is running'))


    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    })
  
