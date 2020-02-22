const express = require('express');
const router = express.Router();

const {getAllExpenses} = require('../models/expensesModel');



router.get('/', async (req, res) => {
    try {
        const response = await getAllExpenses();
        console.log(response);
        res.status(200).json({Message: "Successfully Fetched Expenses", Expenses: response.rows})

    }catch(err){
        res.status(500).json({Message: "Failed to fetch expenses", successCode: 0})
    }
});





module.exports = router;