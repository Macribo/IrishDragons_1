var express = require("express");

const fs = require("fs");

const bodyParser = require("body-parser");

var port = process.env.port || 3000;

var app = express();

app.use(bodyParser.json());

if(!fs.existsSync(__dirname + "/about.json"))
    fs.writeFileSync(__dirname + "/about.json", "[]", "utf-8");

if(!fs.existsSync(__dirname + "/cards.json"))
    fs.writeFileSync(__dirname + "/cards.json", "[]", "utf-8");

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

app.get("/cards", function (req, res) {
    
    if (!req.query.level || req.query.type) {
        fs.readFile(__dirname + "/cards.json", function (err, data) {

            if (err) 
                return res.send({ error : err});

            // 3. Parse JSON
            let cards = JSON.parse(data);

            // 4. Send the array to the user
            return res.send(cards);

        }); 
    }
    else {
        fs.readFile(__dirname + "/cards.json", function (err, data) {

            var found = false;

            var cards = [];

            if (err) 
                return res.send({ error : err});
    
            // 3. Parse JSON
            let currCards = JSON.parse(data);
    
            // 4. Check for the product with the right term
            for (let index = 0; index < currCards.length; index++) {
                
                let card = currCards[index];

                if(card.level = req.query.level) {
                    found = true;
                    cards.push(card);         
                }
            }
            if (!found)
                return res.send("You have no cards of level "+ req.query.level +".");
            else
                return res.send(cards);
        });
    }
});


app.post("/products", function (req, res) { 
    
    if (!req.body.type || !req.body.name || !req.body.level || !req.body.imageURL)
        return res.send({error : "Missing one of the elements! Type, name and image are mandatory."});
    

    // 1. Read request
    let newCard = {
        id          : randomString.generate(20),
        type        : req.body.type,
        name        : req.body.name,
        level       : req.body.level,
        image       : req.body.imageURL
        
    }

    // 2. Read the file
    fs.readFile(__dirname + "/cards.json", function (err, data) {       

        if (err) {
            res.send({ error : err});            
        }
        if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
            res.header("Access-Control-Allow-Origin", "*");
        }

        // 3. Parse JSON. This calls a validation function
        let currCards = validateJSON(data);

        // At the beginning: []
        // Later is : [{}, {}, {}, ...]
        
        
        // 4. Push the user into the array
        currCards.push(newCard);
        

        fs.writeFile(__dirname + "/cards.json", JSON.stringify(currCards), "utf-8",

            function () {
                if (err) 
                    return res.send({ error : err});
                
            }
        ); 
        
    });

    return res.send(newCard);
    // return res.send({ message : "Product has been saved on the file."});
});

app.listen(3000);