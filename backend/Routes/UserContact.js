const express = require("express");
const router = express.Router();
const Contact = require("../models/Contacts");
const bodyParser = require("body-parser");

router.post("/contacts", bodyParser.json(), (req, res) => {
  try {
    Contact.create({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      email: req.body.email,
      description: req.body.description,
    });
    res.send({ success: true });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
