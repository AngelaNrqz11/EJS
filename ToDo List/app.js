const express = require("express");
const app = express();
// Local Node Module
// Since "date.js" module is still a local file not located in the server
// Once the code runs below, it will try to execute all the code inside date.js and bind it to const "date"
const date = require(__dirname + "/date.js");
console.log("Module 'date.js': ", date);

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// create a new folder called "public" and place your static files in it (ex: css, images, js files)
// express.static("public") will provide a path for the static files that will be kept in one place
// then you can refer to your static files using this relative "public" folder.
app.use(express.static("public"));

// Global variables
const items = ["Do groceries", "Withdraw", "Go home"];
const workItems = ["Create essays"];

app.get("/", (request, response) => {
    const day = date.getDay();
    console.log("Day: ", day);
    response.render("todo", { listTitle: day, listItem: items });
});

app.post("/", (request, response) => {
    console.log("Post /", request.body.list, " : ", request.body);
    const listName = request.body.list;
    const todoAdd = request.body.todo;

    if ("Work" === listName) {
        workItems.push(todoAdd);
        response.redirect("/" + listName);
    } else {
        items.push(todoAdd);
        response.redirect("/");
    }
});

app.get("/work", (request, response) => {
    response.render("work", { listTitle: "Work", listItem: workItems });
});

app.listen(3000, () => {
    console.log("Listening to port 3000.");
});
