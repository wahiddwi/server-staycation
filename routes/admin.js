//import express using methods router
const router = require('express').Router();

//export controller 
const adminController = require('../controllers/adminController');
//declare multer
const { uploadSingle, uploadMultiple } = require('../middlewares/multer');

//route
router.get('/dashboard', adminController.viewDashboard);
//endpoint category
router.get('/category', adminController.viewCategory);
router.post('/category', adminController.addCategory);
router.put('/category', adminController.editCategory);
router.delete('/category/:id', adminController.deleteCategory);
//endpoint bank
router.get('/bank', adminController.viewBank);
router.post('/bank', uploadSingle, adminController.addBank);
router.put('/bank', uploadSingle, adminController.editBank);
router.delete('/bank/:id', adminController.deleteBank);
//endpiont item
router.get('/item', adminController.viewItem);
router.post('/item', uploadMultiple, adminController.addItem);
router.get('/item/show-image/:id', adminController.showImageItem);
router.get('/item/:id', adminController.showEditItem);
router.put('/item/:id', uploadMultiple, adminController.editItem);
router.delete('/item/:id/delete', adminController.deleteItem);


router.get('/booking', adminController.viewBooking);

//export router
module.exports = router