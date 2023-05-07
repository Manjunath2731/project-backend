const User = require('../models/user')
const User1 = require('../models/user')
const jwt = require('jsonwebtoken');
const {hashPassword, comparedPassword} = require('../helpers/auth')

const test = (req, res) =>{
    res.json('test is working')
}

/********************************************Student Login********************************************************/
//Registerd user
const registerUser = async (req, res) => {
    try {
        const {name, USN, password} = req.body;
        //Check if name was enterd
        if (!name) {
            return res.json({
                error: "Name is required"
            })
        };
        //check is password is good
        if(!password || password.length<6){
            return res.json({
                error: "Password is requires and should be at least 6 charecter"
            })
        };
        //check USN
        const exist = await User.findOne({USN});
        if(exist) {
            return res.json({
                error: "USN already exist"
            })
        }

        const hashedPassword = await hashPassword(password)

        //crete user
        const user = await User.create({
            name, USN, password:hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
};

//Login EndPoint
const loginUser = async (req, res) => {
    try {
        const {USN, password} = req.body;

        // check if user exit
        const user = await User.findOne({USN});
        if(!user){
            return res.json({
                error: "User not found"
            })
        }
        // check if password is correct
        const match = await comparedPassword(password, user.password);
        if(match){
            jwt.sign({USN: user.USN, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match){
            res.json({
                error: "Password is incorrect"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//all users

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}
const getProfile = (req, res)=> {
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET,{}, (err, user)=>{
            if(err) throw err;
            res.json(user)
        })
    }else{
        res.json(null)
    }
}



/**********************************************Faculty Login**********************************************************/

//Registerd user for faculty
const registerUser1 = async (req, res) => {
    try {
        const {name, employeeID, password} = req.body;
        //Check if name was enterd
        if (!name) {
            return res.json({
                error: "Name is required"
            })
        };
        //check is password is good
        if(!password || password.length<6){
            return res.json({
                error: "Password is requires and should be at least 6 charecter"
            })
        };
        //check employeeID
        const exist = await User1.findOne({employeeID});
        if(exist) {
            return res.json({
                error: "employeeID already exist"
            })
        }

        const hashedPassword = await hashPassword(password)

        //crete user
        const user1 = await User.create({
            name, employeeID, password:hashedPassword,
        })

        return res.json(user1)
    } catch (error) {
        console.log(error)
    }
};

//Login EndPoint for faculty
const loginUser1 = async (req, res) => {
    try {
        const {employeeID, password} = req.body;

        // check if user exit
        const user1 = await User1.findOne({employeeID});
        if(!user1){
            return res.json({
                error: "User not found"
            })
        }
        // check if password is correct
        const match = await comparedPassword(password, user1.password);
        if(match){
            jwt.sign({employeeID: user1.employeeID, id: user1._id, name: user1.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user1)
            })
        }
        if(!match){
            res.json({
                error: "Password is incorrect"
            })
        }
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    getAllUsers,
    loginUser1,
    registerUser1
}