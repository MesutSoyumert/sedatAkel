import React, {Component} from 'react';
import {Table} from "reactstrap";

class NoteDetailedList extends Component<any, any> {
    render() {
        return (
            <div>
                <h3>{this.props.info.title}</h3>
                <Table>
                    <thead>
                    <tr>
                        <th>Not Numarası</th>
                        <th>Not Adı</th>
                        <th>Not İçeriği</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.notes.map((note:any) => (
                                <tr key ={note!._id!}>
                                    <th scope="row">{note._id}</th>
                                    <td>{note.notename}</td>
                                    <td>{note.notecontent}</td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default NoteDetailedList;
