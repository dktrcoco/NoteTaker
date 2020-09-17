//Dependencies
//=================================================================
//allows us to run server remotely
var express = require("express");
var apiRoutes = require("./routes/api");
var viewRoutes = require("./routes/view");

//Set up Express App
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
//allows the use of json
app.use(express.json());
//allows use of files in the public folder without explicitly naming them
app.use(express.static("public"));

//ROUTES
//========================================================================

app.use("/api", apiRoutes);
app.use("/", viewRoutes);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
