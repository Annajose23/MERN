const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
// @route GET api/users
// @desc register user
// @access Public
router.post('/',[
    body('name', 'username is required').not().isEmpty(),
    body('email','please include a valid email').isEmail(),
    body('password','please enter a password with 5 or more characters').isLength({min:5})
],async(req,res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name, email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
           return res.status(400).json({errors:[{msg:'user already exist'}]})
        }
        const avatar = gravatar.url(email,{
            s:'200', //size
            r:'pg', //rating
            d:'mm' //default
        })

        //creating instance of user
        user = new User({
            name,
            email,
            avatar,
            password
        })
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        const payload = {
            user : {
                id : user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
             (err,token) => {
                 if(err) throw err;
                 res.json({token})
             }
            );


    }catch(err){
        console.error(err.message);
        res.send(500).send('Server error')
    }
    //see if user exist

    //get user gravatar
    //encrypt password
    //return jwt
    
})

module.exports = router;