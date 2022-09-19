import React, {Component} from 'react';
import {Col, Container, Row} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navi from "./Navi";
import NoteList from "./NoteList";
import NoteDetail from "./NoteDetail";

export default class App extends Component {
    
    state= {
            shouldIRender:"",
            selectedNoteId:"", 
            selectedNoteName:"",  
            selectedNoteContent:"", 
            notes: [],
            isEditNoteButtonDisabled:false,
            isDisplayNoteButtonDisabled: false,
            shouldIShowValues: false,
            cart: []
    }

    isInputDisabled = true;
    noteDetailInfo = {title: " isimli not için yapacağınız işlemi düğmeye basarak gerçekleştirin"};
    isNoteSelected = false;
    apiUrl = "http://localhost:5000/note";

    componentDidMount() { this.getNotes();}

    setEditNoteButtonDisabled = (status:boolean) => {
        this.setState({isEditNoteButtonDisabled: status});
    }

    setDisplayNoteButtonDisabled = (status:boolean) => {
        this.setState({setDisplayNoteButtonDisabled: status});
    }

    editNote = () =>  {
        this.displayNoteDetails();
        this.setInputEnabled();
        this.setState({isDisplayNoteButtonDisabled: true});
        this.setState({isEditNoteButtonDisabled: false});
    }

    displayNoteDetails = () => {
        this.setState({shouldIShowValues: true});
        this.isInputDisabled = true;
        this.setState({isDisplayNoteButtonDisabled: true});
        this.setState({isEditNoteButtonDisabled: false});
    }

    getNotes =  () =>  {
        fetch(this.apiUrl)
            .then(response => response.json())
            .then(data => this.setState({notes:data}));
        this.setState({selectedNotId: ""});
        this.setState({selectedNoteName: ""});
        this.setState({selectedNoteContent: ""});
        this.handleRefresh();
    };

    selectNote = (note: { _id: any, notename:any, notecontent:any }) => {
        this.setState({selectedNotId: note._id});
        this.setState({selectedNoteName: note.notename});
        this.setState({selectedNoteContent: note.notecontent});
        this.state.selectedNoteId = note._id;
        this.showToastMessage(note.notename + " isimli notu seçtiniz");
        this.isNoteSelected = true;
        this.setState({shouldIShowValues: false});
        this.setState({isDisplayNoteButtonDisabled: false});
        this.setState({isEditNoteButtonDisabled: false});
    }
    
    createNote = () => {
        const newNote = {notename: "", notecontent: ""};
        this.getNotes();
        let countOfNotes = this.state.notes.length
        newNote.notename = "Not " + (countOfNotes+1).toString();
        newNote.notecontent = "Boş içerik";

        fetch(this.apiUrl + "/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        this.setState({shouldIShowValues: false});
        this.showToastMessage("Yeni boş not " + newNote.notename + " ismi ile oluşturuldu");

        this.getNotes();
        window.location.reload();
    }

    handleRefresh = () => {
        this.setState({});
    };

    showToastMessage = (showMessage:string) => {
        toast.success(showMessage, {
            position: toast.POSITION.BOTTOM_LEFT
        })};

    showNoteDetail = () => {
        return <NoteDetail
                 selectedNoteId={this.state.selectedNoteId}
                 selectedNoteName={this.state.selectedNoteName}
                 selectedNoteContent={this.state.selectedNoteContent}
                 displayNoteDetails = {this.displayNoteDetails}
                 setInputEnabled = {this.setInputEnabled}
                 setInputDisabled = {this.setInputDisabled}
                 showToastMessage = {this.showToastMessage}
                 editNote = {this.editNote}
                 getNotes = {this.getNotes}
                 setEditNoteButtonDisabled={this.setEditNoteButtonDisabled}
                 setDisplayNoteButtonDisabled={this.setDisplayNoteButtonDisabled}
                 isInputDisabled = {this.isInputDisabled}
                 shouldIShowValues = {this.state.shouldIShowValues}
                 isEditNoteButtonDisabled={this.state.isEditNoteButtonDisabled}
                 isDisplayNoteButtonDisabled={this.state.isDisplayNoteButtonDisabled}
                 setIsNoteSelectedDisable = {this.setIsNoteSelectedDisable}
                 noteDetailInfo={this.noteDetailInfo}/>
    }
    
    shouldIShowNoteDetail = () => {
        if (this.isNoteSelected)  { return <this.showNoteDetail/>}
    }
    setIsNoteSelectedDisable = () => {this.isNoteSelected = false};

    setInputEnabled = () => { this.isInputDisabled = false};
    setInputDisabled = () => { this.isInputDisabled = true};

    getNoteById = (_id: string | undefined) => {

        let getByIdUrl = this.apiUrl+ _id;

        fetch(getByIdUrl)
            .then(response => response.json())
            .then(data => this.setState({note:data}))
    };

    render() {
        const noteListInfo = {title: "Notlar Listesi"};
        return (
            <div>
                <Container>
                    <Navi cart= {this.state.cart}/>
                    <Row>
                        <Col xs="3">
                            <NoteList
                                selectedNoteId={this.state.selectedNoteId}
                                selectedNoteName={this.state.selectedNoteName}
                                selectedNoteContent={this.state.selectedNoteContent}
                                notes={this.state.notes}
                                getNotes={this.getNotes}
                                createNote={this.createNote}
                                selectNote={this.selectNote}
                                setInputEnabled={this.setInputEnabled}
                                info={noteListInfo}/>
                        </Col>

                        <Col xs="9">
                            {this.shouldIShowNoteDetail()}
                        </Col>
                        <ToastContainer />
                    </Row>
                </Container>
            </div>
        );
    }
}
