import React, {Component} from 'react';
import {Button, Fade, ListGroup, ListGroupItem} from "reactstrap";

class NoteList extends Component<any, any> {

    render() {
        return (
            <div>
                <h3>{this.props.info.title}</h3>
                <Button
                    color="info"
                    onClick={() => this.props.createNote()}
                >
                    <b>Yeni Not Oluştur</b>
                </Button>
                <Fade
                    className="mt-3"
                    tag="h5"
                >
                </Fade>

                <ListGroup>
                    {
                        this.props.notes.map((note: { _id: any, notename:any, notecontent:any }) => (
                            <ListGroupItem
                                active={note.notename === this.props.selectedNoteName}
                                onClick={() => this.props.selectNote(note)}
                                key={note._id}>
                                {note.notename}
                            </ListGroupItem>
                        ) )
                    }
                </ListGroup>
            </div>
        );
    }
}

export default NoteList;
