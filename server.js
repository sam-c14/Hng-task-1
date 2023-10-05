const express = require("express");
const app = express();
const cors = require("cors");
// const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("Hello World");
//   return res.send("Hii");
// });

app.get("/api", (req, res) => {
  const slackName = req.query.slack_name;
  const track = req.query.track;
  const today = new Date();
  const options = { weekday: "long" };
  const currentUtcTime = new Date().toUTCString();
  let utcTime;
  const currentDay = today.toLocaleDateString("en-US", options);

  // Define the validation range in hours
  const validationRange = 2; // +/- 2 hours

  // Calculate the minimum and maximum valid times
  const minValidTime = new Date(Date.now() - validationRange * 60 * 60 * 1000);
  const maxValidTime = new Date(Date.now() + validationRange * 60 * 60 * 1000);

  // Parse the current UTC time as a Date object
  const currentUtcTimeDate = new Date(currentUtcTime);

  //   console.log('wow');

  // Perform validation
  if (
    currentUtcTimeDate >= minValidTime &&
    currentUtcTimeDate <= maxValidTime
  ) {
    date = new Date().toISOString();
    utcTime = date.split(".")[0] + date[date.length - 1];
  } else {
    utcTime = "Current UTC time is outside the valid range.";
  }

  return res.json({
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url:
      "https://github.com/sam-c14/Hng-task-1/blob/865108d1aaf18290b61c854201ca534fd6137c9c/server.js",
    github_repo_url: "https://github.com/sam-c14/Hng-task-1.git",
    status: 200,
  });
});

app.post("/api/v1/webhook-test", (req, res) => {
  // Handle the webhook payload here
  const payload = req.body;
  console.log("Webhook payload:", payload);

  // Add your custom logic to process the payload

  // Respond to the webhook request
  res.status(200).send("Webhook received successfully");
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});

// function getFactorial(n) {
//   if (n !== 1) return n * getFactorial(n - 1);
//   return 1;
// }
// const test = "abcabcabcs";
// const testVar = new RegExp("abc", "g");
// console.log(test.replace(testVar, ""));
// const tetso = "abcabcabc";
// console.log(test === tetso);
// console.log(getFactorial(6));
// const testVar = "dynamicValue"; // Replace with your variable value
// const pattern = new RegExp(testVar, "g");

// const inputString =
//   "This is a sample string with some dynamicValue words. dynamicValue is repeated several times.";

// const replacedString = inputString.replace(pattern, "replacement");

// console.log(replacedString);
