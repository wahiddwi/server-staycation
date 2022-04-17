//import model category
const Category = require('../models/Category');


//exports modul
module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard');
    },

    viewCategory: async (req, res) => {
        const category = await Category.find();
        // console.log(category);
        res.render('admin/category/view_category', { category });
    },
    addCategory: async (req, res) => {
        //validation try catch
        try {
            const { name } = req.body;
            // console.log(name);
            await Category.create({ name });
            res.redirect('/admin/category');
        } catch (error) {
            res.redirect('/admin/category');
        }
    },

    editCategory: async (req, res) => {
        //validation try catch
        try {
            const { id, name } = req.body;
            const category = await Category.findOne({ _id: id });
            // console.log(category);
            category.name = name;
            await category.save();
            res.redirect('/admin/category');
        } catch (error) {
            res.redirect('/admin/category');
        }
    },

    deleteCategory: async (req, res) => {
        const { id } = req.params;
        const category = await Category.findOne({ _id: id });
        await category.remove();
        res.redirect('/admin/category');
    },

    viewBank: (req, res) => {
        res.render('admin/bank/view_bank');
    },

    viewItem: (req, res) => {
        res.render('admin/item/view_item');
    },

    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking');
    } 

}