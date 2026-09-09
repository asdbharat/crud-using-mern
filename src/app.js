const express = require('express')
const noteModel = require("./models/note.model")
const cors = require("cors")


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))


// post /api/notes
// create new note and save data in mongodb
// req.body = {title, description}  === destructure it

app.post('/api/notes', async (req, res) =>{
    const {title, description} = req.body
    // destructure the req.body

    const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message: "note created successfully",
        note
    })
})


// get /api/notes
// fetch data

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "notes fetch successfully",
        notes
    })
})

// delete note with the id from req.params

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id

    // console.log(id)
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message: "note deleted successfully"
    })
})

// patch /api/notes/:id
// update the description of the note by id 
// req.body = {description} description yeyel req.body madhun

app.patch("/api/notes/:id", async (req, res) =>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "note updated successfully"
    })
})

app.use('*name', (req,res) => {
    res.sendFile("/Users/bhara/OneDrive/Desktop/node/day-9/Backend/public/index.html")
})


module.exports = app