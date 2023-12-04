const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// GET method route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.country;

  const appkey = "b004c17334d44d60a07104339232611";

  let url =
    "https://api.weatherapi.com/v1/current.json?key=" + appkey + "&q=" + query;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.current.temp_c;
      const condition = weatherdata.current.condition.text;
      const imgurl = "https://cdn.weatherapi.com/weather/64x64/day/113.png";
      res.send("<h1>The Temperature in " + query + " is " + temp + "°C.</h1>");
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
