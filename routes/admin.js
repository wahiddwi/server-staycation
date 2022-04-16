//import express using methods router
const router = require('express').Router();

//export controller 
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.viewDashboard);

//export router
module.exports = router