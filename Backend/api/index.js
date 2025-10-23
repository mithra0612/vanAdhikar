const express = require("express");
const cors = require("cors");
const ivrRoutes = require("./routes/ivrRoutes");
const ocrRoutes = require("./routes/ocrRoutes");

require("dotenv").config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/ivr", ivrRoutes);
app.use("/api/ocr", ocrRoutes);
// Endpoint to make outbound call
app.post("/api/call-user", async (req, res) => {
  const twilio = require("twilio");
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const toNumber = req.body.to;

  try {
    const call = await client.calls.create({
      url: "https://van-adhikar-backend.vercel.app/api/ivr/menu",
      to: toNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    res.send({ success: true, callSid: call.sid });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
});

module.exports = app;
// Run locally
if (require.main === module) {
  app.listen(3000, () =>
    console.log(`Server running on http://localhost:${3000}`)
  );
}
