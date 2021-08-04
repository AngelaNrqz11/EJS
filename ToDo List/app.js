const express = require("express");
const app = express();

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// Global variables
var items = ["Do groceries", "Withdraw", "Go home"];

app.get("/", (request, response) => {
  // Sample: Wed Aug 04 2021 13:45:50 GMT+0800 (China Standard Time)
  const date = new Date();
  var day;

  // object "options" is a time format for parameter options (line 19) using styles.
  const options = {
    month: "long",
    day: "2-digit",
    year: "numeric",
    weekday: "long"
  };
  day = date.toLocaleDateString("en-US", options);
  response.render("todo", {whatDay: day, newLists: items});
});

app.post("/", (request, response)=>{
  const todoAdd = request.body.todo;
  items.push(todoAdd);
  response.redirect("/");
  // response.render("todo", {todoNew: todoAdd});
});

app.listen(3000, () => {
  console.log("Listening to port 3000.");
});
