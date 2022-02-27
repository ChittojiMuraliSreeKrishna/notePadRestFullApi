import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const NotePage = ({ history }) => {
  const { id } = useParams();
  let [note, setNote] = useState(null);
  let [submit, setSubmit] = useState(false);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === 'new') return;
    await axios.get(`/notes/${id}/`).then(res => {
      setNote(res.data);
    });
  };

  let handleSubmit = () => {
    window.location = '/';
    if (id !== 'new' && !note.body) {
      deleteNote();
    } else if (id !== 'new') {
      updateNote();
    } else if (id === 'new' && note !== null) {
      addNote();
    }
  };

  let updateNote = async () => {
    if (id !== 'new' && !note.body) {
      deleteNote();
    } else if (id !== 'new') {
      fetch(`/notes/${id}/update/`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      });
    }
  };

  let addNote = async () => {
    fetch(`/notes/create/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
  };



  let deleteNote = async () => {
    fetch(`/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    window.location = '/';
  };

  return (
    <div>
      <div className='note-buttons'>
        <Link to="/" className='link-btn'>
          <h3 className='back-arrow'>{("<-")}</h3>
        </Link>
        {id !== 'new' &&
          <h3 className='delete-btn' onClick={deleteNote}>Delete</h3>
        }
      </div>
      <textarea value={note?.body} className='textarea' onChange={(e) => { setNote({ ...note, 'body': e.target.value }); setSubmit(true); }}></textarea>
      <div className='note-buttons'>
        {submit === true && id !== 'new' && (<h3 className='update-btn' onClick={handleSubmit} >update</h3>)}
        {id === 'new' &&
          <h3 className='update-btn' onClick={handleSubmit}>Done</h3>
        }
      </div>
    </div>
  );
};

export default NotePage;
