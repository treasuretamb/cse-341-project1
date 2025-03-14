const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// get all contacts
router.get('/', contactsController.getAllContacts);

// get a single contact by id
router.get('/:id', contactsController.getSingleContact);

// POST to create new contact
router.post('/', contactsController.createContact);

// PUT to update existing contact by id
router.put('/:id', contactsController.updateContact);

// DELETE to delete contact by id
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
