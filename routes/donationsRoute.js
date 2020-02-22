const express = require('express');

const router = express.Router();
const uuid = require('uuid/v1');

const {insertNewDonation, getAllDonators, deleteOneDonator, updateDonator} = require('../models/donationsModel')

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
    // console.log(req.body);
    try{
        const response = await insertNewDonation(req.body);
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
    
});


router.delete('/deleteDonator/:id', async(req, res) => {
    console.log(req.params.id);
    try {
        const response = await deleteOneDonator(req.params.id);
        console.log(response);
        res.status(200).json({Message: "Successfully deleted donator", successCode: 1});
    }catch(error){
        res.status(500).json({Message: "Failed to delete donator", successCode: 0})
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