const express=require('express')
const User=require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')
// Permet de gerer avec precision les erreurs sans trycatch
const asyncHandler = require('express-async-handler')


exports.registerUser=asyncHandler(async(req,res)=>{
    // Destructuration permettant d'envoyer les données
    const{ name, email, password}=req.body

    // Verification des données puis rejet au cas ou il y a manque
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check voir si User existe
    const userExists=await User.findOne({ email })
    
    // Si on trouve l'email, la personne existe dejà
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    
    const newAdd=new User(req.body)
    // Hash password
    const saltRounds=10
    const salt=bcrypt.genSaltSync(saltRounds)
    const hash=bcrypt.hashSync(password, salt)
    newAdd.password=hash
    await newAdd.save()
    res.status(200).json({message:'Register User',newAdd})
})

exports.loginUser=asyncHandler(async(req,res)=>{
        // Destructuration permettant d'envoyer les données
        const{ email, password}=req.body

        // Check voir si User existe
    const userExists=await User.findOne({ email })
    
    // Si on ne trouve l'email, la personne n'existe dejà
    if(!userExists){
        res.status(400)
        throw new Error('User not exists')
    }
    // Voir si le password est valide et correspond à celui qui existait dejà
    const match=await bcrypt.compare(password, userExists.password)
    if(!match){res.json({msg:'Password errone'})}

    // Generation de JWT (les jetons) pur permettre aux echanges d'infrmations entre les applications
    const payload={ id: userExists._id }
    var token=jwt.sign(payload, process.env.privateKey,{
        expiresIn: '30d',
    })
    res.status(200).json({message:'Login User',userExists,token})
})

exports.getMe=asyncHandler(async(req,res)=>{
    res.send(req.user)
    res.status(200).json({message:'User data display'})
})