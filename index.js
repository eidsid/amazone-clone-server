const express = require("express");
const cors = require("cors");
const path = require("path");

const stripe = require("stripe")(
  "sk_test_51JwvitJSSyNgmcbH3IzDtzpeHeiYCQki89HL3JSC6gwBIN6Edwxd2l11pQhG6TFRUY21FMSKorymjUjgJcDWKHmb004v8Zxbqq"
);

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/payments/create", async (req, res) => {
  const total = req.body.total;
  if (total > 0) {
    try {
      console.log("payment request resive Bom!!! for this amount>>>>", total);
      const paymentIntet = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });

      res.status(201).send({
        clientSecret: paymentIntet.client_secret,
      });
    } catch (error) {
      res.status(404).send(error.message);
    }
  } else {
    res.send("total cost must be greater than 0");
  }
});
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("you are listen on port " + port);
});
