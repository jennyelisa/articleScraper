var mongoose = require("mongoose");

//schema constructor
var Schema = mongoose.Schema;

//creating a new NoteSchema
var NoteSchema = new Schema({
    title: String,
    body: String
});

//makes new model from the schema we just made above
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;