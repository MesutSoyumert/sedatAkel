const express = require("express");

// noteRoutes is an instance of the express router.
//IT has been used to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /note.
const noteRoutes = express.Router();

// This section connect to the database
const dbo = require("../db/conn");

// This section convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section gets a list of all the notes.
noteRoutes.route("/note").get(function (req, res) {
    let db_connect = dbo.getDb("seckinyayinevinotedb");
    db_connect
        .collection("notes")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section gets a single note by id
noteRoutes.route("/note/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("notes")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section inserts a new note.
noteRoutes.route("/note/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        notename: req.body.notename,
        notecontent: req.body.notecontent,
    };
    db_connect.collection("notes").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section updates a note by id.
noteRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
        $set: {
            notename: req.body.notename,
            notecontent: req.body.notecontent,
        },
    };
    db_connect
        .collection("notes")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section deletes a note
noteRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("notes").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = noteRoutes;
