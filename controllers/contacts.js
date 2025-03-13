const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// to get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await db.collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

// to get a single contact by id
const getSingleContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact
};
