const express = require('express');
const router = express.Router();
const Clients = require('../models/client');


//Endpoint for all users
router.get('/', async (req, res) => {
    try {
        let clients = await Clients.find().exec();
        res.send(clients);
    } catch (e) {
        console.log({message: e})
    };
});

//Endpoint for returning client from id
router.get('/:id', async (req, res) => {
    try {
        const clients = await Clients.findById(req.params.id);
        res.json (clients);

    } catch (e) {
        console.log({message: e})
    };
});

//Endpoint for adding client
router.post('/', async (req, res) => {
    try {

        let create = await  Clients.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            streetAddress: req.body.streetAddress,
            city: req.body.city
        });
        res.json(create);
    } catch (e) {
        console.log(e)
    }
});


//Endpoint for updating an client
router.put('/:id', async (req, res) => {
    try{
        await Clients.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.end('The client has been updated')
    } catch (e) {
        console.log({message: e})
    }
});


//Endpoint for deleting a specific client
router.delete('/:id', async (req, res) => {
    await Clients.findByIdAndDelete(req.params.id);
    res.end('The client has been deleted')
});





module.exports = router;

