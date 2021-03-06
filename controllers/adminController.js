//import model
const Category = require('../models/Category');
const Bank = require('../models/Bank');
const Item = require('../models/Item');
const Image = require('../models/Image');
const fs = require('fs-extra');
const path = require('path');


//exports modul
module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', {
            title: "STaycation | Dashboard"
        });
    },

    viewCategory: async (req, res) => {
        try {
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/category/view_category', { category, alert, title: "Staycation | Category" });
        } catch (error) {
            res.redirect('/admin/category');
        }
    },
    addCategory: async (req, res) => {
        //handle error validation
        try {
            const { name } = req.body;
            // console.log(name);
            await Category.create({ name });
            req.flash('alertMessage', 'Success Add Category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
    },

    editCategory: async (req, res) => {
        //handle error validation
        try {
            const { id, name } = req.body;
            const category = await Category.findOne({ _id: id });
            // console.log(category);
            category.name = name;
            await category.save();
            req.flash('alertMessage', 'Success Update Category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
    },

    deleteCategory: async (req, res) => {
        //handle error validation
        try {
            const { id } = req.params;
            const category = await Category.findOne({ _id: id });
            await category.remove();
            req.flash('alertMessage', 'Success Delete Category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
    },

    viewBank: async (req, res) => {
        //handle error
        try {
            //using function find for read data
            const bank = await Bank.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/bank/view_bank', {
                title: "Staycation | Bank",
                alert,
                bank
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },

    addBank: async (req, res) => {
        try {
            const { name, nameBank, nomorRekening } = req.body;
            await Bank.create({
                name,
                nameBank,
                nomorRekening,
                imageUrl : `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success Add Bank');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },

    editBank: async (req, res) => {
        try {
            const { id, name, nameBank, nomorRekening } = req.body;
            //using function findOne for update data
            const bank = await Bank.findOne({ _id: id });
            //validasi
            //jika tidak pilih gambar
            if (req.file == undefined) {
                bank.name = name;
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                await bank.save();
                req.flash('alertMessage', 'Success Update Bank');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/bank');
            //jika gambar dipilih
            } else {
                //hapus gambar yang lama
                await fs.unlink(path.join(`public/${bank.imageUrl}`));
                bank.name = name;
                bank.nameBank = nameBank;
                bank.nomorRekening = nomorRekening;
                bank.imageUrl = `images/${req.file.filename}`
                await bank.save();
                req.flash('alertMessage', 'Success Update Bank');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/bank');
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },

    deleteBank: async (req, res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.findOne({ _id: id });
            await fs.unlink(path.join(`public/${bank.imageUrl}`));
            await bank.remove();
            req.flash('alertMessage', 'Success Delete Bank');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },

    viewItem: async (req, res) => {
        try {
            //menampilkan semua data
            const item = await Item.find()
            .populate({ path:'imageId', select:'id imageUrl' })
            .populate({ path:'categoryId', select:'id name' });
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/item/view_item', {
                title: "Staycation | Item",
                category,
                alert,
                item,
                action : 'view'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },

    addItem: async (req, res) => {
        try {
            const { categoryId, title, price, city, about } = req.body;

            //validasi
            if (req.files.length > 0) {
                const category = await Category.findOne({ _id: categoryId });
                const newItem = {
                    categoryId : category._id,
                    title,
                    description: about,
                    price,
                    city
                }
                //create
                const item = await Item.create(newItem);
                category.itemId.push({ _id: item._id });
                await category.save();

                //looping untuk menyimpan gambar lebih dari 1 file
                for (let i = 0; i < req.files.length; i++) {
                    //variable save image
                    const imageSave = await Image.create({ imageUrl: `images/${req.files[i].filename }`});
                    item.imageId.push({ _id: imageSave._id });
                    await item.save();
                }
                //redirect setelah success save and show flash message
                req.flash('alertMessage', 'Success Add Item');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/item');
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }
    },

    showImageItem: async (req, res) => {
        try {
            const { id } = req.params;
            //menampilkan semua data
            const item = await Item.findOne({ _id:id })
            .populate({ path:'imageId', select:'id imageUrl' });
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/item/view_item', {
                title: "Staycation | Show Image Item",
                alert,
                item,
                action: 'show image'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }
    },

    showEditItem: async (req, res) => {
        try {
            const { id } = req.params;
            //menampilkan semua data
            const item = await Item.findOne({ _id:id })
            .populate({ path:'imageId', select:'id imageUrl' })
            .populate({ path:'categoryId', select:'id name' });
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/item/view_item', {
                title: "Staycation | Edit Item",
                alert,
                item,
                category,
                action: 'edit'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }
    },

    editItem: async (req, res) => {
        try {
            const { id } = req.params;
            const { categoryId, title, price, city, about } = req.body;
            const item = await Item.findOne({ _id: id })
            .populate({ path:'imageId', select:'id imageUrl' })
            .populate({ path:'categoryId', select:'id name' });
            
            if (req.files.length > 0) {
                for (let i = 0; i < item.imageId.length; i++) {
                    const imageUpdate = await Image.findOne({ _id: item.imageId[i]._id });
                    await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
                    imageUpdate.imageUrl = `images/${req.files[i].filename}`;
                    await imageUpdate.save();
                }
                item.title = title;
                item.price = price;
                item.city = city;
                item.description = about;
                item.categoryId = categoryId;
                await item.save();
                req.flash('alertMessage', 'Success Update Item');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/item');
            } else {
                item.title = title;
                item.price = price;
                item.city = city;
                item.description = about;
                item.categoryId = categoryId;
                await item.save();
                req.flash('alertMessage', 'Success Update Item');
                req.flash('alertStatus', 'success');
                res.redirect('/admin/item');
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }
    },

    deleteItem: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await Item.findOne({ _id: id }).populate('imageId');
            for (let i = 0; i < item.imageId.length; i++) {
                Image.findOne({ _id: item.imageId[i]._id }).then((image) => {
                    fs.unlink(path.join(`public/${image.imageUrl}`));
                    image.remove();
                }).catch((error) => {
                    req.flash('alertMessage', `${error.message}`);
                    req.flash('alertStatus', 'danger');
                    res.redirect('/admin/item');
                });
            } 
            await item.remove();
            req.flash('alertMessage', 'Success Delete Item');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/item');
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/item');
        }
    },

    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', {
            title: "Staycation | Booking"
        });
    } 

}