const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mailgun = require("nodemailer-mailgun-transport");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

//middlewares
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  const mailOptions = {
    from: "deltamavericks@gmail.com",
    to: "dannirolands@gmail.com",
    subject: `Message from ${name} through my portfolio contact form`,
    html: `<p style="padding:0rem 1rem;">from <a style="text-decoration: none;" href="mailto:${email}">${email}</a></p>
    <p style="padding:0rem 1rem;">${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("an error occured");
    }
    console.log("success");
    return res.status(200).send({ message: "message delivered successfully" });
  });
});


app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server running in port: ${PORT}`));
