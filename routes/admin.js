const router = require('express').Router()
const User = require('../models/User')

router.get('/getusers', (req, res) => {
    User.find().then((users) => {
        return res.json(users)
    })
})

router.post('/removeuser', (req, res) => {
    const { user_id } = req.body
    User.findByIdAndRemove({ _id: user_id }).then((user) => {
        console.log(user)
        User.find().then((users) => {
            return res.json(users)
        })
    })
})

module.exports = router