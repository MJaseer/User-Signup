// const express = require('express')
// const User = require('../Models/user')
// const jwt = require('jsonwebtoken')

// const router = express.Router()

// router.get('/', (req, res) => {
//     console.log('admin');
//     const cookie = req.cookies['jwt'];
//     console.log(JSON.stringify(cookie));
//     if (cookie) {
//         res.send({
//             message: 'success'
//         })
//     } else {
//         res.status(401).send({
//             message:'Authentication failed'
//         })
//     }
// })

// router.get('/home', async (req, res) => {
//     const cookie = req.cookies['jwt'];
//     if (cookie) {
//         claims = jwt.verify(cookie, "secret");
//     }

//     if (cookie) {
//         const { _id } = result.toJSON()
//         const token = jwt.sign({ _id: _id }, "secret")
//         res.cookie('jwt', token, {
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000 // 1 day
//         })

//         const data = await User.find()
//         res.send(data)
//     }

// })

// module.exports = router