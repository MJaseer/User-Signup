const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/user')
const Moment = require('moment');

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name
        const hashedPassword = await bcrypt.hash(password, 10)

        const record = await User.findOne({ email: email })
        if (record) {
            return res.status(400).send({
                message: 'Email is already registered'
            })
        } else {
            const date = Moment().format('DD/MM/YYYY')
            console.log(date, 'date');
            const user = new User({
                email: email,
                name: name,
                password: hashedPassword,
                timeStamp: Moment().format('DD/MM/YYYY')
            })

            await user.save()

            res.send({
                message: "success"
            })
        }
    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send({
            message: 'User not found'
        })
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).send({
            message: "Password is incorrect"
        })
    } else {
        const token = jwt.sign({ _id: user._id }, 'secret')
        res.cookie("jwtToken", token, {
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000 // for 1 day
        })
        const name = user.name
        res.send({
            message: "success",
            name
        })
    }
})

// router.get('/user', async (req, res) => {
//     try {
//         console.log('user');
//         const cookie = req.cookies['jwtToken'];
//         let claims;
//         if (cookie) {
//             claims = jwt.verify(cookie, "secret");
//         }
//         if (!claims) {
//             return res.status(401).send({
//                 message: "Unauthorized"
//             })
//         } else {
//             const user = await User.findOne({ _id: claims._id });
//             const { password, ...data } = user.toJSON();
//             res.send(data)
//         }
//     } catch (error) {
//         return res.status(401).send({
//             message: "Unauthorized"
//         })
//     }
// })

// router.post('/profile', Multer.single('image'), async (req, res) => {
//     console.log('profile');
//     const cookie = req.cookies['jwtToken'];

//     if (cookie) {
//         claims = jwt.verify(cookie, "secret");
//     }

//     const { filename } = req.file;
//     await User.findOneAndUpdate({ _id: claims._id },
//         {
//             $set:
//             {
//                 profile:filename,
//             }
//         }
//     );
//     res.send({
//         message: "success"
//     });

// })

router.post('/logout', async (req, res) => {
    console.log('logout');
    res.clearCookie('jwtToken');
    res.status(200).send({
        message: 'success'
    })
})

module.exports = router;