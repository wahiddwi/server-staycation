//import express using methods router
const router = require('express').Router();

//export controller 
const adminController = require('../controllers/adminController');

//route
router.get('/dashboard', adminController.viewDashboard);
router.get('/category', adminController.viewCategory);
router.get('/bank', adminController.viewBank);
router.get('/item', adminController.viewItem);
router.get('/booking', adminController.viewBooking);

//export router
module.exports = router