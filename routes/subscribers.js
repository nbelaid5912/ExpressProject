const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Customer');

// Get all customers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.Customer.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Get one customer
router.get('/login', getSubscriber, async (req, res) => {
    res.json(res.subscriber);
});

// post login
router.post('/login', getSubscriber, async (req, res) => {
    let u = res.subscriber;
    console.log(u[0].username);
    res.username=u[0].username;
    res.redirect('/items?username='+u[0].username);
});
// Create one customer
router.post('/create', async (req, res) => {
    const subscriber = new Subscriber.Customer({
        username: req.body.username,
        pwd:req.body.pwd
    });
    try {
        const newSubscriber = await subscriber.save().then(subscriber=>{res.redirect('/')});
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});
// Update one customer
router.patch('/update', getSubscriber, async (req, res) => {
    if (req.body.pwd != null) {
        res.subscriber.pwd = req.body.pwd
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch {
        res.status(400).json({ message: err.message })
    }
});
// Delete one customer
router.delete('/delete', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted This Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

async function getSubscriber(req, res, next) {
    try {
        subscriber = await Subscriber.Customer.find({username:req.body.username,pwd:req.body.pwd})
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router