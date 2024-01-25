const express=require('express')
// Permet de gerer avec precision les erreurs sans trycatch
const asyncHandler = require('express-async-handler')
const Goal=require('../model/goalModel')

exports.getGoals=asyncHandler(async (req,res)=>{
    const goals= await Goal.find()
    res.status(200).json({message:' Get goal',goals})
})

exports.postGoal=asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const postGoal=new Goal(req.body)
    await postGoal.save()
    res.status(200).json({message:' Set goal',postGoal})
})

exports.putGoal=asyncHandler(async (req,res)=>{
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Not find')
    }

    const goalput= await Goal.findByIdAndUpdate(id,{$set:{...req.body}})
    res.status(200).json({message:' Upadate goal',goalput})
})

exports.deleteGoal=asyncHandler(async (req,res)=>{
    const { id }=req.params
    const goaldelete=await Goal.findByIdAndDelete(id)
    res.status(200).json({message:' Delete goal',goaldelete})
})