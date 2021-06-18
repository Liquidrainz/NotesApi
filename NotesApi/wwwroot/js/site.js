$(document).ready(function () {
    GetNotes();
});

function AddNote() {
    var note = prompt("Whats the note?");

    if (note != null) {

        var createNote = CallAPI("POST", "../api/notes", JSON.stringify(note.replace(/</g, "&lt;").replace(/>/g, "&gt;")));

        if (createNote.status == 400) {
            alert("Bad Request - Create Note");
        } else {
            GetNotes();
        }
    }
}

function DeleteNote(id) {

    if (id != null) {

        var deleteNote = CallAPI("DELETE", "../api/notes/" + id, null);

        if (deleteNote.status == 400) {
            alert("Bad Request - Delete Note");
        } else {
            GetNotes();
        }
    }
}

function GetNotes() {
    var getNotes = CallAPI("GET", "../api/notes", null);
    $("#tblNotes tbody").html('');
    jQuery.each(JSON.parse(getNotes.responseText), function (i, val) {
        $("#tblNotes").find('tbody')
            .append($('<tr>').attr('style', 'background-color: lightgray;')
                .append($('<td>').attr('style', 'padding: 5px; width: 15%;')
                    .html(val.id)
                )
                .append($('<td>').attr('style', 'padding: 5px; width: 70%;')
                    .html(val.note)
                )
                .append($('<td>').attr('style', 'padding: 5px; width: 15%; white-space: nowrap')
                    .html(
                        '<button data-toggle="modal" data-target="#noteNew" onclick="GetNote(' + val.id + ')" class="btn btn-sm btn-primary">MODIFY</button>' +
                        " | " +
                        '<button onclick="DeleteNote(' + val.id + ')" class="btn btn-sm btn-danger">DELETE</button>')
                )
            );
    });
}

function GetNote(id) {

    if (id != null) {
        var getNote = CallAPI("GET", "../api/notes/" + id, null);
        if (getNote.status == 400) {
            alert("Note not found.");
        } else {
            note = JSON.parse(getNote.responseText);
            $("#noteNewID").val(note.id);
            $("#noteNewInput").val(note.note);
        }
    } else {
        alert("Note not found.");
    }
}

function PutNote() {
    if ($("#noteNewID").val().length > 0 && $("#noteNewInput").val().length > 0) {
        var putNote = CallAPI("PUT", "../api/notes/" + $("#noteNewID").val(), JSON.stringify($("#noteNewInput").val().replace(/</g, "&lt;").replace(/>/g, "&gt;")));
        if (putNote.status == 400) {
            alert("Note update failed.");
        } else {
            $("#noteNewID").val('');
            $("#noteNewInput").val('');
            $('#noteNew').modal('hide');
            GetNotes();
        }
    } else {
        alert("Error modifying note.");
    }
}

function CallAPI(type, url, body) {

    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.open(type, url, false);
    xhttp.setRequestHeader("Content-type", "application/json");

    if (body === null) {
        xhttp.send();
    } else {
        xhttp.send(body);
    }

    return xhttp;
}
