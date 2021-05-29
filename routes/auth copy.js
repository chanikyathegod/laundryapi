const router = require('express').Router();
const User = require('../models/User');
const {registerValidation} = require('../validations')

//validation const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
    
});



router.post('/register', async (req, res) => {

//validtaing the data
const { error } = schema.validate(req.body);

//res.send(error.details[0].message);


if(error) return res.status(400).send(error.details[0].message)



const user = new User({
name: req.body.name,
email:req.body.email,
password:req.body.password
});

try {
    const savedUser = await user.save();
    res.send(savedUser);
} catch (error) {
    res.status(400).send(error);
}


});



module.exports = router;