//import express using methods router
const router = require('express').Router();

//export controller 
const adminController = require('../controllers/adminController');

//route
router.get('/dashboard', adminController.viewDashboard);
//endpoint category
router.get('/category', adminController.viewCategory);
router.post('/category', adminController.addCategory);
router.put('/category', adminController.editCategory);
router.delete('/category/:id', adminController.deleteCategory);
router.get('/bank', adminController.viewBank);
router.get('/item', adminController.viewItem);
router.get('/booking', adminController.viewBooking);

//export router
module.exports = router