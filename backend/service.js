require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router = require('./routes/goalsRoute')
const  errorHandler =require('./middleware/errorMiddleware')
const connectDB = require('./config/connectDB')
const userRoute = require('./routes/userRoutes')
const Port=5000 || process.env.port

const app=express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/goals',router)
app.use('/api/users',userRoute)
app.use(errorHandler)
connectDB()

app.listen(Port,(err)=>{
    err? console.log(err):console.log(`Yes successfull ${Port}`)
})