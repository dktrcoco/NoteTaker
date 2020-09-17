var router = require("express").Router();

//allows joining of file names
var path = require("path");

//returns the notes.html file
//best practice is separate files
//one file for these and one file for api routes
router.get("/notes", function (req, res) {
    //.sendfile contatonates
    //belongs to the response object
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//returns the index.html file
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;