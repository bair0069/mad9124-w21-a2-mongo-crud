/* NPM install
-Express, Mongoose, xss, debug,morgan,express-mongo-sanitize 

set type to modules in package.json*/

import morgan from 'morgan'
import express from 'express'
import sanitizeMongo from 'express-mongo-sanitize'
import coursesRouter from './routes/courses.js'
import studentsRouter from './routes/students.js'
import connectDatabase from './startup/connectDatabase.js'
connectDatabase()

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(sanitizeMongo())


// routes
app.use('/api/courses', coursesRouter)
app.use('/api/students', studentsRouter)

export default app