var express = require("express");

const fs = require("fs");

const bodyParser = require("body-parser");

var port = process.env.port || 3000;

var app = express();

app.use(bodyParser.json());

if(!fs.existsSync(__dirname + "/about.json"))
    fs.writeFileSync(__dirname + "/about.json", "[]", "utf-8");

// This function is just to check if the json file 
// is empty or not.
function validateJSON(body) {
    try {
      var data = JSON.parse(body);
      // if came to here, then valid
      return data;
    } catch(e) {
      // failed to parse
      return null;
    }
}

// Redirection. Better than writing all the options for all files
app.use("/", express.static(__dirname + "/"));

app.get("/about", function (req, res) {
    
    fs.readFile(__dirname + "/about.json", function (err, data) {

        if (err) 
            return res.send({ error : err});

        // 3. Parse JSON
        let about = JSON.parse(data);

        // 4. Send the array to the user
        return res.send(about);

    }); 
});

app.listen(3000);