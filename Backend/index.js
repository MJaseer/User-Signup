const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/UserManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const user = require('./Routes/user');
// const admin = require('./Routes/admin')

app = express()

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

app.use(express.json())

app.use('/api', user)
// app.use('/admin',admin)

app.listen(3000,()=>{
    console.log('Connected');
})
