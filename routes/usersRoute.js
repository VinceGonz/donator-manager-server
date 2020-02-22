const express = require('express');

const router = express.Router();

const {getAllUsers} = require('../models/usersModel');



router.get('/', async (req, res) => {
    try{
        const {rows, rowCount} = await getAllUsers();
        if(rowCount){
            res.status(200).json({Message: "Successfully Fetched Users", Users: rows})
        }else{
            res.status(200).json({Message: "Currently no users found!"})
        }
    }catch(err){
        res.status(500).json({Message: "Failed to fetch users", Error: err});
    }
});




module.exports = router;