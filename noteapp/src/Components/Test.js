import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Test = () => {
    let [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);

    let getNotes = async () => {
        let response = await fetch('/notes/');
        let data = await response.json();
        setNotes(data);
    };

    let getTitle = (note) => {
        let title = note.body.split('\n')[0];
        if (title.length > 45) {
            return title.slice(0, 45);
        }
        return title;
    };

    let getTime = (note) => {
        return new Date(note.updated).toLocaleString()
    };

    return (
        <div className='notes-body'>
            <div>
                {console.log(notes)}
                <div className='notes-header'>
                    <h2>&#9782; Notes</h2>
                    <h3 className='notes-length'>{notes.length}</h3>
                </div>
                {notes.map((note, index) => (
                    <Link to={`/note/${note.id}`} className="link-btn">
                        <div className="notes-container">
                            <h3 className="notes" key={index}>{getTitle(note)}</h3>
                            <p className='date'><span>{getTime(note)}</span></p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='addnote-container'>
                <Link className='addnote-button' to={`/note/new`} >+</Link>
            </div>
        </div>
    );
};

export default Test;