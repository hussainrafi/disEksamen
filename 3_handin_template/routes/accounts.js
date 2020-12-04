const express = require('express');
const router = express.Router();
const Account = require('../models/account');

//Endpoint for all users
router.get('/', async (req, res) => {
    try {
        // 1. return accounts from database instead
        let accounts = await Account.find().exec();
        res.json(accounts);
    } catch (e) {
        console.log({message: e})
    };
});

//Endpoint for adding user
router.post('/', async (req, res) => {
        try {

            let create = await  Account.create({
                balance: req.body.balance,
                alias: req.body.alias,
                client_id: req.body.client_id
            });
            res.json(create);
        } catch (e) {
            console.log(e)
        }
});


//Endpoint for returning specifik account
router.get('/:id', async (req, res) => {
    try {
        // 1. return accounts from database instead
        const accounts = await Account.findById(req.params.id);
        res.json (accounts);

    } catch (e) {
        console.log({message: e})
    };
});


//Endpoint for getting a specific balance from an id
router.get('/:id/balance', async (req, res) => {
    try {
        // 1. return accounts from database instead
        const accounts = await Account.findById(req.params.id);
        res.json ('balance'+': '+ accounts.balance);

    } catch (e) {
        console.log({message: e})
    };
});



//Endpoint for transfering money from on account to another
router.put('/transfer', async (req, res) => {

    var fromAccountId = req.body.fromAccount;
    var toAccountId = req.body.toAccount;
    var amount = req.body.amount;

    const fromAccount = await Account.findById(fromAccountId).exec();
    const toAccount = await Account.findById(toAccountId).exec();

    await Account.findByIdAndUpdate(fromAccount, {balance: fromAccount.balance - amount}, {new: true, useFindAndModify: false}).exec();
    await Account.findByIdAndUpdate(toAccount, {balance: toAccount.balance + amount}, {new: true, useFindAndModify: false}).exec();

    res.end('The amount ' + amount + ' has successfully been transfered from ' + fromAccountId + ' to ' + toAccountId);
});




//Endpoint for updating an account
router.put('/:id', async (req, res) => {
    try{
        await Account.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.end('The account has been updated')
    } catch (e) {
        console.log({message: e})
    }
});

//Endpoint for deleting a specific account
router.delete('/:id', async (req, res) => {
    try {
        await Account.findByIdAndDelete(req.params.id);
        res.end('The account has been deleted')
    } catch (e) {
        console.log({message: e})

    }
});






module.exports = router;