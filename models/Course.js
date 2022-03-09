import mongoose from 'mongoose'
import Student from './Student.js'


const schema = new mongoose.Schema({
  code: {type: String, trim: true, maxlength: 16, required: true},
  title: {type: String, trim: true, maxlength: 255, required: true},
  description: {type: String, trim: true, maxlength: 2048},
  url: {type: String, trim: true, maxlength: 512},
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student',trim: true, maxlength: 70, required: true,}] 
})

const Model = mongoose.model('Course', schema) // factory function returns a class

export default Model
