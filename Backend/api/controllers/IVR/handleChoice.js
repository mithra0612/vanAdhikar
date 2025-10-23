const twilio = require("twilio");
const { VoiceResponse } = twilio.twiml;

// Step 1: IVR Menu Controller
exports.ivrMenuController = (req, res) => {
  try {
    const twiml = new VoiceResponse();
    const gather = twiml.gather({
      input: "dtmf",
      numDigits: 1,
      action: "https://van-adhikar-backend.vercel.app/api/ivr/handle-choice", // must exist in routes
    });

    gather.play(
      "https://62ia2i3ipcsufrew.public.blob.vercel-storage.com/public_tamil-welcome.mp3"
    );

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (err) {
    console.error("Error in ivrMenuController:", err);
    res.status(500).send("Internal Server Error");
  }
};

// Step 2: Handle Choice Controller
exports.handleChoiceController = (req, res) => {
  try {
    const digit = req.body.Digits; // Twilio sends DTMF digits in body
    const twiml = new VoiceResponse();

    if (digit === "1" || digit === "2") {
      twiml.play(
        "https://62ia2i3ipcsufrew.public.blob.vercel-storage.com/tamil-feedback-start.mp3"
      );
      twiml.record({
        maxLength: 60,
        finishOnKey: "#",
        action:
          "https://van-adhikar-backend.vercel.app/api/ivr/handle-recording",
      });
    } else {
      twiml.say("Invalid input, please try again.");
      twiml.redirect("/api/ivr/ivr");
    }

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (err) {
    console.error("Error in handleChoiceController:", err);
    res.status(500).send("Internal Server Error", err);
  }
};

// Step 3: Handle Recording Controller
exports.handleRecordingController = (req, res) => {
  try {
    const recordingUrl = req.body.RecordingUrl;
    console.log("📢 User Feedback Recording URL:", recordingUrl);

    const twiml = new VoiceResponse();
    twiml.play(
      "https://62ia2i3ipcsufrew.public.blob.vercel-storage.com/tamil-thankyou.mp3"
    );

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (err) {
    console.error("Error in handleRecordingController:", err);
    res.status(500).send("Internal Server Error", err);
  }
};

exports.testing = (req, res) => {
  res.send("success");
};
