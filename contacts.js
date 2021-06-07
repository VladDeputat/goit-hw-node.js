const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts(contactsPath);
    const contact = contacts.find((contact) => contact.id === contactId);
    // console.log(contact);
    return contact;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const updContacts = JSON.parse(contacts).filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(updContacts));
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(contacts);
    const newItem = { _id: v4(), name, email, phone };
    parsedContacts.push(newItem);
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
  } catch (error) {
    throw error;
  }
}
// getContactById(5);
module.exports = { listContacts, getContactById, removeContact, addContact };
