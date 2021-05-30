const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validations')
const dotenv = require('dotenv');




router.post('/register', async (req, res) => {

//validtaing the data
const { error } = registerValidation(req.body);



if(error) return res.status(400).send(error)

//checking if user is already registered

const emialexist = await User.findOne({ email: req.body.email});


if(emialexist) return res.status(400).json({ error: 'already exits' });


//hashthe passsword

const salt = await bcrypt.genSalt(10);
const hashpassword = await bcrypt.hash(req.body.password, salt);

const user = new User({
name: req.body.name,
email:req.body.email,
password: hashpassword
});

try {
    const savedUser = await user.save();
    res.send({user: user._id});
} catch (error) {
    res.status(400).send(error);
}


});

router.post('/login', async (req, res) => {
//validtaing the data 
const { error } = loginValidation(req.body);
if(error) return res.status(400).send(error.details[0].message)
//checking emial exists
const user = await User.findOne({ email: req.body.email});


if(!user) return res.status(400).send('email doest  exits');

const validpass = await bcrypt.compare(req.body.password, user.password);


if(!validpass) return res.status(400).send('invalid passowrd');

//creating tokens

const token = jwt.sign({_id : user._id,username:user.name},process.env.tokensecret);

res.header('auth-token',token).send(token);


})

module.exports = router;