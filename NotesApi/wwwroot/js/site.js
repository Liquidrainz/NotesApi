// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

function AddNote() {
    var note = prompt("Whats the note?");

    if (note != null) {
        $.ajax({
            url: "../api/notes",
            type: "POST",
            data: JSON.stringify(note),
            contentType: "text/json; charset=utf-8",
            dataType: "json",
            success: function () {
                $.getJSON("../api/notes", function (json) {
                    var notes = JSON.parse(json);
                    console.log(notes);
                    $(notes).each(function (index, element) {
                        console.log(element);
                        $("#tblNotes tbody").innerHTML(
                            "<tr><td>" + element.Note + "</td><td>" + element.Id + "</td></tr>"
                        );
                    });
                });
            }
        });
    }
}
