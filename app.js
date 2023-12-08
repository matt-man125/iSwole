// This file should set up the express server as shown in the lecture code
import express from "express";
import exphbs from "express-handlebars";
const app = express();
import configRoutesFunction from "./routes/index.js";

const staticDir = express.static("public");
app.use("/public", staticDir);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static('static')); 


configRoutesFunction(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
