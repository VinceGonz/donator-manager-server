const Joi = require('joi');


// Register Validation

const registerValidation =  data => {
    const schema = {
        user_id: Joi.string().required(),
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required()
    }
    return Joi.validate(data, schema);
}

const loginValidation = data => {
    const schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
    }
    return Joi.validate(data, schema);
}


module.exports = {
    registerValidation,
    loginValidation,
}