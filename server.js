const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors);
app.use(express.json());

app.get("/api", (req, res) => {
  const slackName = req.query.slack_name;
  const track = req.query.track;
  const today = new Date();
  const options = { weekday: "long" }; // You can also use 'short' or 'narrow' for abbreviated names
  const currentDay = today.toLocaleDateString("en-US", options);
  const utcTime = today.toUTCString();

  res.json({
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
  console.log("App listening on port 5000");
});
