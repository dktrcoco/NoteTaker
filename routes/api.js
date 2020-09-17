var router = require("express").Router();

//the file system module, allows work with the pc file system
var fs = require("fs");

//package that allows for the use of unique id's
var uuidv1 = require("uuid/v1");

function readDB() {
    //reading in db.json as an object declared as db
    var db = fs.readFileSync("db/db.json");
    //turns db (a string) into a JSON object
    return JSON.parse(db);
}

function writeDB(notes) {
    //using fs module to write the latest note captured above to the db.json file
    //after adding new info to obj, convert back to string
    fs.writeFile("db/db.json", JSON.stringify(notes), err => {
        if (err) {
            console.log("Error writing file", err)
        } else {
            console.log("Successfully wrote file")
        }
    });
}
//Displays the noteListItems
router.get("/notes", function (req, res) {
    //allows for the readDB function to perform, which will display the notes added
    res.json(readDB());
})

router.post("/notes", function (req, res) {
    //captures latest note input
    var latestNote = req.body;
    var title = latestNote.title;
    var text = latestNote.text;
    
    //object that contains 3 things,
    //title, text, and the unique id
    var newNote = {
        title, text, id: uuidv1()
    }
    var db = readDB();
    //adding to the object the latest note input
    db.push(newNote);
    //calling function writeDB with db as JSON object
    writeDB(db);
    //returns updated object
    res.json(newNote);
})

//In order to delete specific note inputs
//a unique id number has to be tied to each note input
//this will be in the form of an key: value pair via an object when the input is created
router.delete("/notes/:id", function (req, res) {
    var db = readDB();
    //filter returns array of everything that does not match the id
    var filteredDB = db.filter(note => note.id !== req.params.id);
    //taking filteredDB and writing it into object
    writeDB(filteredDB);
    //generic success message, a function with no return will just be stuck
    res.json({
        ok: true
    })
})

module.exports = router;