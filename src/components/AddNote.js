import React, { useContext, useState } from 'react'
import NoteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    

    const {showAlert}  = props;
    const context = useContext(NoteContext);
  const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note);
        setNote({title:"",description:"",tag:""});
        showAlert("Note added successfully","success")
    }


  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" minLength={5} required onChange={onChange} />
             </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' value={note.description} minLength={5} required onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} minLength={5} required/>
          </div>
          <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
