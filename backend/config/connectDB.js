const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        await mongoose.connect('mongodb+srv://nanamohamed:TL4zAWD5SjiUc8Sy@cluster0.ebnvwo0.mongodb.net/?retryWrites=true&w=majority')
        console.log('Successfull')
    } catch (error) {
        console.log(error)
    }
}  
module.exports=connectDB