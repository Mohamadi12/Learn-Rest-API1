const express=require('express')
const router=express.Router()
const {getGoals,postGoal,putGoal,deleteGoal}=require('../controllers/goalController')
// Middlewars pour les authorisations
const { protect }=require('../middleware/authMiddleware')

router.get('/',protect,getGoals)
router.post('/',protect,postGoal)
router.put('/:id',protect,putGoal)
router.delete('/:id',protect,deleteGoal)

module.exports=router