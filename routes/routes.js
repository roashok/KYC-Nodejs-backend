const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(req.body)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    const result = await user.save()

    const {password, ...data} = await result.toJSON()

    res.send(data)
})

router.post('/login', async (req,res)=>{
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(404).send({
            message: 'user not found'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'invalid credentials'
        })
    }
    const token = jwt.sign({_id: user._id}, "secret")
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // 60 mins
    })
    res.send({message: 'success'})
})
module.exports = router;