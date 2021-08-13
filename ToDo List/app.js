const express = require("express");
const app = express();

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


// create a new folder called "public" and place your static files in it (ex: css, images, js files)
// express.static("public") will provide a path for the static files that will be kept in one place
// then you can refer to your static files using this relative "public" folder.
app.use(express.static("public"));

// Global variables
const items = ["Do groceries", "Withdraw", "Go home"];
const workItems = ["Create essays"];

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
  console.log("Post /:", request.body);
  const todoAdd = request.body.todo;
  items.push(todoAdd);
  response.redirect("/");
  // response.render("todo", {todoNew: todoAdd});
});



app.get("/work", (request, response) => {
  response.render("work", {workTodo: "Work List", workList: workItems});
});

app.post("/work", (request, response)=>{
  console.log(request.body)
  const todoAdd = request.body.todo;
  workItems.push(todoAdd);
  response.redirect("/work");
});




app.listen(3000, () => {
  console.log("Listening to port 3000.");
});
