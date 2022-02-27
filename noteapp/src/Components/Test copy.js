import axios from 'axios';
import React, { Component } from 'react';


export default class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            note: "",
            openNote: false
        };
    }

    componentDidMount() {
        this.getnotes();
    }

    getnotes() {
        axios.get("/notes/").then(res => {
            console.log(res.data);
            this.setState({ notes: res.data });
        });
    }

    getNote = (item, index) => {
        window.location = `/note/${item.id}`;
    };

    getNoteDetails() {
        return this.state.notes.map((item, index) => {
            const { body, id } = item;
            return (
                <tr key={index}>
                    <td>{id}</td>
                    <td>{body}</td>
                    <td><button onClick={() => this.getNote(item, index)} >view</button></td>
                </tr>
            );
        });
    }

    viewNoteDetails() {
        return this.state.note.map((item, index) => {
            const { body, id } = item;
            return (
                <div key={index}>
                    <p>{body}</p>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h3>Notes</h3>
                <table>
                    <tbody>
                        {this.getNoteDetails()}
                    </tbody>
                </table>
                {this.state.openNote &&
                    <div>
                        <p>{this.state.note}</p>
                    </div>
                }
            </div>
        );
    }
}
