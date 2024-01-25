const express=require('express')
const userRoute=express.Router()
const{ registerUser,loginUser,getMe }=require('../controllers/userController')
// Middlewars pour les authorisations
const { protect }=require('../middleware/authMiddleware')



userRoute.post('/',registerUser)
userRoute.post('/login',loginUser)
userRoute.get('/me',protect,getMe)



module.exports=userRoute