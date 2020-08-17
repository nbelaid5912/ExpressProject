const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
let username;

// Get all items
router.get('/', getItemsCustomer,async (req, res) => {
    username=req.query.username;
    console.log(username);
    try {
        item = await Item.Item.find()
        if (item == null) {
            return res.status(404).json({ message: 'Cant find any item' })
        }
        //res.render('create_account');
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.render('items', { items : item});   
});
// Get one item
router.get('/getItem/:id', getItemsCustomer, async (req, res) => {
    res.json(res.item);
});
// Create one item
router.post('/create', async (req, res) => {
    console.log(username);
    const item = new Item.Item({
        name: req.body.name,
        qte: req.body.qte,
        rayon:req.body.rayon,
        date:req.body.date,        
        customer:username
    });
    try {
        const newItem = await item.save().then(item=>{res.redirect('/items')});
        if(newItem=!null){
            alert('Liste de produits créée');
        }else{
            alert('Liste de produits non créée');
        }

        
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});
// Update one item
router.patch('/update/:id', getItemsCustomer, async (req, res) => {
    if (req.body.qte != null) {
        res.item.qte = req.body.qte
    }
    try {
        const updatedItem = await res.item.save()
        res.json(updatedItem)
    } catch {
        res.status(400).json({ message: err.message })
    }
});
// Delete one item
router.delete('/delete/:id', getItemsCustomer, async (req, res) => {
    try {
        await res.item.remove()
        res.json({ message: 'Deleted This Item' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

async function getItemsCustomer(req, res, next) {
    try {
        item = await Item.Item.find({customer:req.params.customer})
        if (item == null) {
            return res.status(404).json({ message: 'Cant find item' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.item = item
    next()
}

module.exports = router