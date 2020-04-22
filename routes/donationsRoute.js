const express = require('express');

const router = express.Router();
const uuid = require('uuid/v1');

const {insertNewDonation, getAllDonators, deleteOneDonator, updateDonator} = require('../models/donationsModel')
const {insertLog} = require('../models/logsModel');

router.get('/', async (req, res) => {
    
    try {
        const response = await getAllDonators();
        if(response.rowCount){
            res.status(200).json({Message: "Successfully fetched donators", donatorsList: response.rows, successCode: 1})
        }
    }catch(error){
        res.status(500).json({Message: "Failed to fetch donators list", successCode: 0})
    }
});


router.post('/addDonator', async(req, res) => {
    console.log('HOY BOBO');
    console.log(req.body);

    try{
        // ? Removed the user_id property and store the rest of the properties to a new variable "newDonatorObject"
        // ? user_id will only be used in the logs query
        const {user_id, ...newDonatorObject} = req.body;
        const response = await insertNewDonation(newDonatorObject);
        console.log('POTA RESPONSE',response);
        if(response.rowCount){
            res.status(200).json({Message: "Successfully Added New Donator", body: req.body, successCode: 1});
        }else{  
            console.log('error brad')
            res.status(500).json({Message: "Failed to add new donator", successCode: 0});

        }

    }catch(error){
        console.log('error bradz')
        res.status(500).json({Message: "Failed to add new donator", error, successCode: 0});
    }

    try {
        const response = await insertLog({log_id: uuid(), action:'Insert', donation_id:req.body.donation_id, user_id:req.body.user_id, username: req.body.processed_by})
        console.log(response);
    }catch(error){
        console.log('ERROR INSERTING LOGS');
        // res.status(500).json({Message: "Failed to Insert log", error, successCode: 0});
    }
    
});


router.delete('/deleteDonator/:id', async(req, res) => {
    console.log(req.params.id);
    console.log('user',req.body)
    try {
        const response = await deleteOneDonator(req.params.id);
        console.log(response);
        res.status(200).json({Message: "Successfully deleted donator", successCode: 1});
    }catch(error){
        res.status(500).json({Message: "Failed to delete donator", successCode: 0})
    }

    try {
        const response = await insertLog({log_id: uuid(), action:'Delete', donation_id:req.params.id, user_id:req.body.user_id, username: req.body.username})
        console.log(response);
    }catch(error){
        console.log('ERROR INSERTING LOGS');
        // res.status(500).json({Message: "Failed to Insert log", error, successCode: 0});
    }
})


router.put('/updateDonator', async(req, res) => {
    console.log(req.body)

    try{
        const response = await updateDonator(req.body);
        console.log(response);
        res.status(200).json({Message: "Successfully Updated Donator", successCode: 1});
    }catch(error){
        console.log(error);
        res.status(500).json({Message: "Failed to update donator", successCode: 0, error})
    }
    
});





module.exports = router;