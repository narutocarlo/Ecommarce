const express = require('express')
const router = express.Router()
const {registerUser,loginUser, logOutUser,forgotPassword} = require('../Controller/userControler')


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logedOut',logOutUser)
router.get('/forgotPassword',forgotPassword)



module.exports = router