const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// the route to get all contacts
router.get('/', contactsController.getAllContacts);

// the route to get a single contact by id
router.get('/:id', contactsController.getSingleContact);

module.exports = router;
