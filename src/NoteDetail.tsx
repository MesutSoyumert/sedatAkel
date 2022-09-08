import React, { useState, useEffect } from "react";
import {Button, Fade} from "reactstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateNote({...props}) {

    const [form, setForm] = useState({
        notename: "",
        notecontent: ""
    });
    useEffect(() => {
        setForm({notename: props.selectedNoteName, notecontent: props.selectedNoteContent});
        props.setInputDisabled();
        props.setEditNoteButtonDisabled(true);
        props.setDisplayNoteButtonDisabled(true);
        return
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function updateForm(value: { notename?: string; notecontent?: string; }) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const editedNote = {
            notename: form.notename,
            notecontent: form.notecontent,
        };

        await fetch(`http://localhost:5000/update/${props.selectedNoteId}`, {
            method: "POST",
            body: JSON.stringify(editedNote),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        props.setDisplayNoteButtonDisabled(true);
        props.setEditNoteButtonDisabled(true);
        props.setInputDisabled();
        const message = editedNote.notename + " isimli not güncellendi";
        props.showToastMessage(message);
        props.setIsNoteSelectedDisable();
        props.getNotes();
    }

    return (
        <div>
            <h3>{props.selectedNoteName} {props.selectedNoteName.title?props.noteDetailInfo.title:""}</h3>
            <Button
                outline
                disabled={props.isEditNoteButtonDisabled}
                onClick={() => props.editNote()}
                color="warning">
                <b>Notu Düzenle</b>
            </Button>
            <Button
                outline
                disabled={props.isDisplayNoteButtonDisabled}
                onClick={() => props.displayNoteDetails()}
                color="success">
                <b>Notu Görüntüle</b>
            </Button>
            <br />
            <Fade className="mt-3"
                  tag="h5">
            </Fade>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="notename">Not Adı: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="notename"
                        value={props.shouldIShowValues?form.notename:""}
                        placeholder={props.isInputDisabled? "" : "Not adını buraya yazınız"}
                        disabled={props.isInputDisabled}
                        onChange={(e) => updateForm({ notename: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Not İçeriği: </label>
                    <textarea
                        className="form-control"
                        rows={21}
                        cols={50}
                        id="notecontent"
                        value={props.shouldIShowValues?form.notecontent:""}
                        placeholder={props.isInputDisabled? "" : "Not içeriğini buraya yazınız"}
                        disabled={props.isInputDisabled}
                        onChange={(e) => updateForm({ notecontent: e.target.value })}
                    />
                </div>
                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Notu Kaydet"
                        disabled={props.isInputDisabled}
                        className="add-item__button"
                    />
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
}
