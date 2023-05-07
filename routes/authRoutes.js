const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, getAllUsers, registerUser1, loginUser1} = require('../controllers/authController')

//Middleware

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
)
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.get('/allUser', getAllUsers)

router.get('/faculty-login', loginUser1)
router.get('/faculty-register', registerUser1)

module.exports = router