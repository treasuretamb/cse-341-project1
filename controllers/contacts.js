const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
const getAllContacts = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const contacts = await db.collection("contacts").find().toArray();
    console.log("Contacts fetched:", contacts);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

// GET single contact by id
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

// Create a new contact. all fields required.
const createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const db = mongodb.getDatabase();
    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.collection("contacts").insertOne(newContact);
    // Return the new contact's id in the response body.
    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Error creating contact", error });
  }
};

// Update a contact by id
const updateContact = async (req, res) => {
  const contactId = req.params.id;
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection("contacts").updateOne(
      { _id: new ObjectId(contactId) },
      { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfully" });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Error updating contact", error });
  }
};

// Delete a contact by id
const deleteContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const db = mongodb.getDatabase();
    const result = await db.collection("contacts").deleteOne({ _id: new ObjectId(contactId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
