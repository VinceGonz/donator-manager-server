const express = require('express');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v1');
const router = express.Router();
const brcypt = require('bcryptjs');
require('dotenv').config();
const {registerValidation, loginValidation} = require('../validation');

const {createNewUser, getOneUserByUsername} = require('../models/usersModel');


router.get('/', async(req, res) => {
    res.send('home');
});

router.post('/register', async(req, res) => {
    // res.json({message: 'Register route'})
    console.log(req.body);
    req.body.user_id = uuid();
    const {error} = registerValidation(req.body);
    if(error){
        //* return so that code ends here if the condition is true
        return res.status(400).json({Message: error.details[0].message, successCode: 0})
    }

    //* Checking if the username already exists in the database
    const usernameExist = await getOneUserByUsername(req.body.username);
    if(usernameExist.rowCount){
        //* return so that code ends here if the condition is true
        return res.status(400).json({Message: 'Username already exists!', successCode: 0});
    }

    //* If both conditions on top is false then it will move to the next conditions below

    //* Hash the passwords
    try{
        const salt = await brcypt.genSalt(10);
        const hashedPassword = await brcypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
       
    }catch(error){
        console.log("Error hashing the password: ",error);
    }
    

    try{
        // * Destructure the response
        //* Generate a unique ID and assign to the req.body.user_id
        const {user_id, fname, lname, username, password} = req.body;
        const {rowCount, command} = await createNewUser({user_id, fname, lname, username, password});
        console.log(req.body);
        if(rowCount){
            res.status(200).json({Message: "Successfully Created new user", addedRow: rowCount, command, successCode: 1});
        }
    }catch(err){
        res.status(500).json({Message: "Failed to create new user", Error: err.message, successCode: 0});
        console.log(err)
    }
});

router.post('/login', async (req, res) => {

    const {error} = loginValidation(req.body);
    console.log(error)

    if(error){
        //* return so that code ends here if the condition is true
        return res.status(400).json({Message: error.details[0].message, successCode: 0})
    }

    //* Checking if the username exists in the database
    const user = await getOneUserByUsername(req.body.username);
    if(!user.rowCount){
        return res.status(400).json({Message: 'Username or Password is Incorrect', successCode: 0});
    }

    try{
        const ValidPassword = await brcypt.compare(req.body.password,user.rows[0].password);
        
        if(!ValidPassword) return res.status(400).json({Message: "Username or Password is Incorrect"});
    }catch(error){
        res.status(500).json({Message: "Error when trying to compare password", error, errorCount: 0})
    }

    //* When all the conditions on top is false then that means the credentials given was valid. Then we create a token for the user that logged in.

    //* Create and assign a token
    const token = jwt.sign({user_id: user.rows[0].user_id,username: req.body.username}, process.env.TOKEN_SECRET)
    //* { expiresIn: '1h' } - can also be added to assign token expiration
    
    // Pass the token to the response header 
    res.header('auth-token', token).json({token, successCode: 1, is_admin: user.rows[0].is_admin, user: user.rows[0]})

    
});





module.exports = router;