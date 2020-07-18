const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
const {body,validationResult} = require('express-validator');

// @route Get api/profile/me - just ours based on userid
// @desc Get current user profile
// @access Private -- auth midleware token- parivate-based on userid

router.get('/me',auth,async(req,res) => {
try{
console.log(req.user.id);
const profile = await Profile.findOne({user:req.user.id});
if(!profile){
    return res.status(400).json({msg:'there is no profile for this user'});
}
res.json(profile);
}catch(err){
    console.error(err.message);
    res.status(400).send('server error');
}
});

router.post('/',[auth,[
    body('status','status is required').isEmpty(),
    body('skills','skills is required').isEmpty()
]],async(req,res)=>{
const errors = validationResult(req); 
if(!errors.isEmpty){
    return res.status(400).json({errors:errors.array()})
}
})

module.exports = router;