import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  firstName: {type: String, trim: true, maxlength: 64, required: true},
  lastName: {type: String, trim: true, maxlength: 64 ,required: true},
  nickName: {type: String, trim: true, maxlength: 64},
  email: {type: String, trim: true, maxlength: 512, required: true},
})

const Model = mongoose.model('Student', schema) // factory function returns a class

export default Model
