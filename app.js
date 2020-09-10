const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

let name = [];
let email = [];
let body = [];

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    for (let step = 1; step < 7; step++) {
        const url = "https://jsonplaceholder.typicode.com/comments/" + step;
        https.get(url, function (response) {
            response.on("data", function (data) {
                const userData = JSON.parse(data);
                name.push(userData.name);
                email.push(userData.email);
                body.push(userData.body);
            });
        });
    }
    res.render("index", { name: name, email: email, body: body });
})

app.get("/comments/:var1", function (req, res) {
    var requested = req.params.var1;
    res.render("comments", { name: name, email: email, body: body, step: requested });

});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started at port 3000")
});