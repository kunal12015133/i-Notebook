const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const note = await Note.find({user:req.user.id})
        res.json(note);
    } catch (error) {
        res.status(400).send("Internal server error");
    }
})


router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        
        const {title,description,tag} = req.body;
        const newNote = {}

        if(title) {newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        var note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send('Not allowed')
        }

        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.send(note);

    } catch (error) {
        console.log(error);
        res.status(400).send("Internal server error");
    }
})

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {

        var note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send('Not allowed')
        }

       note = await Note.findByIdAndDelete(req.params.id);
       res.json({"Success":"Note has been deleted" ,note});

    } catch (error) {
        console.log(error);
        res.status(400).send("Internal server error");
    }
})

router.post('/addnote',fetchuser,async(req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array()});
        }
        const {title,description,tag} = req.body;
        const note =  new Note({
            title,description,tag,user:req.user.id
        })

        const savedNote = await note.save();
        res.send(savedNote)
    } catch (error) {
        console.log(error);
        res.status(400).send("Internal server error");
    }
})
module.exports = router