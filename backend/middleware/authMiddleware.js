const jwt=require('jsonwebtoken')
const User=require('../model/userModel')
// Permet de gerer avec precision les erreurs sans trycatch
const asyncHandler = require('express-async-handler')

exports.protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token=req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded=jwt.verify(token, process.env.privateKey)
            if(!decoded){
                return res.json({errors})
            }

            // Get user from the token
            const user=await User.findById(decoded.id)
            res.user=user
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})