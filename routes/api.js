// dependencies
var express = require('express');
var router = express.Router();
const fs = require('fs');

// --------------------------------------------------------- Endpoints/Routes

// CRUD - Create, Read, Update, Delete

// get all of a resource - Read
router.get('/', function(req, res) {
    try {
        const rawdata = fs.readFileSync('data.json'); // <Buffer <hex code>
        var students = JSON.parse(rawdata);
    
        console.log(students);
    
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// create a new resource - Create
router.post('/', function(req, res) {
    try {
        console.log("Posted Object is: ", req.body);
        // open the file
        const rawdata = fs.readFileSync('data.json');
        // decode the file (parse) so we can use it
        var students = JSON.parse(rawdata);

        // add data, but controlled
        var rawBody = req.body;

        var newObj = {
            name: null,
            age: null,
            currentGame: null
        };

        if (rawBody.name != null) {
            newObj.name = rawBody.name;
        }
        
        if (rawBody.age != null) {
            newObj.age = rawBody.age;
        }
        
        if (rawBody.currentGame != null) {
            newObj.currentGame = rawBody.currentGame;
        }
        


        // get the actual index
        newObj._id = students.length;


        // add our new object to the array
        students.push(newObj);

        // save (write) the data back to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(students));

        // return the data to the user
        res.status(201).json(newObj);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// updated a resource - Update
router.patch('/:id', function(req, res) {
    res.status(200).json({ message: "edited the resource" });
});

// delete a resource - Delete
router.delete('/:id', function(req, res) {
    // capture the id
    var id = req.params.id;

    // open the file for reading
    const rawdata = fs.readFileSync('data.json'); // <Buffer <hex code>
    var students = JSON.parse(rawdata);

    // if found delete it
    if (students.length > id) {
        // modify the object
        students.splice(id, 1);

        // write to the file
        const data = fs.writeFileSync('data.json', JSON.stringify(students));

        res.status(200).json({ message: "ok" });
    } else {
        res.status(500).json({ message: "Something went wrong" });
    }    
});

// ----------------------------------------------------------------- end routes/endpoints

module.exports = router;