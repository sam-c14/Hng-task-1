const express = require("express");
const app = express();
const cors = require("cors");
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
    console.log(date);
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

app.listen(port, () => {
  console.log("App listening on port " + port);
});
