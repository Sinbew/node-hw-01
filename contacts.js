const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  return contactsList.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const filteredContacts = contactsList.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();

  const userIds = contactsList.map((contact) => Number(contact.id));
  contactsList.push({ name, email, phone, id: String(Math.max(...userIds) + 1) });

  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
