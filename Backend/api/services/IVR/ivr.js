const twilio = require("twilio");
const { VoiceResponse } = twilio.twiml;

// Step 1: IVR Menu
function ivrMenu() {
  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    input: "dtmf",
    numDigits: 1,
    action: "/handle-choice",
  });
  gather.say("Welcome! Press 1 for Option One. Press 2 for Option Two.");
  return twiml.toString();
}

// Step 2: Handle Choice
function handleChoice(digit) {
  const twiml = new VoiceResponse();

  if (digit === "1" || digit === "2") {
    twiml.say(
      "Thank you. Please record your feedback after the beep. Press # when done."
    );
    twiml.record({
      maxLength: 60,
      finishOnKey: "#",
      action: "/handle-recording",
    });
  } else {
    twiml.say("Invalid input, please try again.");
    twiml.redirect("/ivr");
  }

  return twiml.toString();
}

// Step 3: Handle Recording
function handleRecording(recordingUrl) {
  console.log("📢 User Feedback Recording URL:", recordingUrl);
  const twiml = new VoiceResponse();
  twiml.say("Thank you for your feedback. Goodbye!");
  return twiml.toString();
}

module.exports = { ivrMenu, handleChoice, handleRecording };
