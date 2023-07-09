
import React, { useState } from 'react'
import NoteContext from './NoteContext'
// import { json } from 'react-router-dom';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  const getNotes =async ()=>{

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":localStorage.getItem('token')
      }
    });
    
    const json = await response.json();
    // console.log(json);
    
    setNotes(json);

  }


  const addNote =async (props)=>{
    
    const {title,description,tag}  = props;

    // const response = 
    await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    
    // const json = response.json();
    const   note = {
      "_id": "6427f0f4e34c3a829bdf9ea3",
      "user": "64272c1c055def2b9b1d2263",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-04-01T08:53:08.795Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }

  const deleteNote = async(id)=>{
    
    // const response =
     await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });
    const newNotes = notes.filter((note)=>{
      return note._id!==id;
    })
    setNotes(newNotes);
  }
  const editNote = async(id,title,description,tag)=>{

    
      // const response = 
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      
      // const json = response.json();
    
    
      let newNotes = JSON.parse(JSON.stringify(notes));
    for(let index = 0;index<notes.length;index++)
    {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  return(
    <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
