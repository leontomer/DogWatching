const express = require("express");
const router = express.Router();
const dogWatcher = require("../../models/dogwatcher.model");
var nodemailer = require("nodemailer");

router.post("/saveDetails", async (req, res) => {
  try {
    const { name, startDate, endDate, email, phoneNumber, city, role } =
      req.body;

    const newDogWatcher = new dogWatcher({
      name: name,
      startDate: startDate,
      endDate: endDate,
      email: email,
      phone: phoneNumber,
      city: city,
      dogWatcher: role,
    });

    await newDogWatcher.save();
    res.json("ok");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await dogWatcher.find();
    res.json(posts);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.post("/contact", async (req, res) => {
  try {
    //console.log("entered");
    const { name, email, text } = req.body;

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dogwatchcontact@gmail.com",
        pass: "dogw12345678",
      },
    });

    var mailOptions = {
      from: "dogwatchcontact@gmail.com",
      to: "dogwatchcontact@gmail.com",
      subject: `${name} sent a message`,
      text: `${name} (${email}) has contact us. his message:\n ${text}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({ msg: `Email sent to ${email}` });
      }
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
//

module.exports = router;
