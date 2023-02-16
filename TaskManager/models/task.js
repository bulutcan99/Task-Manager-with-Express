const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({ 
    name:{type:String, required:[true, 'Please add a name'],trim:true, maxLength:[35, 'Name cannot be more than 20 characters']},
    completed:{type:Boolean, default:false}  // only the properties that you set in schema will be saved in the database
})

module.exports = mongoose.model('Task', TaskSchema);