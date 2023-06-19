// Controllers: functions to send, or update Database
import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel.js";

const Contact = mongoose.model("Contact", ContactSchema);

// POST
export const addNewContact = async (req, res) => {
  let newContact = new Contact(req.body);
  console.log("NEW CONTACT ADDED: (BELOW");
  console.log(req.body);

  newContact
    .save()
    .then((contact) => {
      res.send(contact);
    })
    .catch((err) => {
      res.send(err);
    });
  // (newContact.save(err, contact) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.json(contact);
  // });
};

export const getContacts = async (req, res) => {
  try {
    const contact = await Contact.find({});
    res.json(contact);
  } catch (err) {
    res.send(err);
  }

  // Contact.find({}, (err, contact) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.json(contact);
  // });
};

export const getContactWithID = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    res.json(contact);
  } catch (err) {
    res.send(err);
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    res.send(err);
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.deleteOne({ _id: req.params.contactId });
    res.send(`Deleted Contact`);
  } catch (err) {
    res.send(err);
  }
};
