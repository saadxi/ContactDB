import bodyParser from "body-parser";
import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/crmControllers.js";

const routes = (app) => {
  app.use(bodyParser.json());

  app
    .route("/contact")
    .get((req, res, next) => {
      // middleware
      console.log(`Request from ${req.originalUrl}`);
      console.log(`Request type ${req.method}`);
      next();
    }, getContacts) // get all contacts
    // post new contact
    .post(addNewContact);

  app
    .route("/contact/:contactId")
    // get specific contact
    .get(getContactWithID)
    .delete(deleteContact)
    // updating a contact
    .put(updateContact);
};

export default routes;
