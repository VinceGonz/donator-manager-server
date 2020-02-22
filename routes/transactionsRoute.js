const express = require('express');
const router = express.Router();

const {verifyToken} = require('../middlewares');


//* verifyToken middleware to check if the token is valid
router.get('/', verifyToken, (req, res) => {
    res.status(200).json({Message: "Transaction Route", User: req.user});
});



module.exports = router;