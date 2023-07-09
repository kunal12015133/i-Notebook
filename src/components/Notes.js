import React, { useContext, useEffect, useRef ,useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {  useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate();
  const {showAlert} = props;
  const context = useContext(NoteContext);
  const { notes,editNote, getNotes } = context;
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line 
  }, [])

  const updateNote = async(currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    
  }
  const ref = useRef(null);
  const refClose = useRef(null);

  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }

const handleClick = (e)=>{
  // console.log("Updated note is ",note);
  editNote(note.id,note.etitle,note.edescription,note.etag)
  refClose.current.click(); 
    e.preventDefault();
    showAlert("Note upated successfully","success")
    // addNote(note);
}

  return (
    <>

      <AddNote showAlert={showAlert}/>
      <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
        {notes.length===0 && 'No Notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} showAlert={showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
