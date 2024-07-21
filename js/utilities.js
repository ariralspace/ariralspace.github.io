function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

function secre() {
    if (localStorage.getItem("nextPasswordTry") && Number(localStorage.getItem("nextPasswordTry")) > Date.now()) {
        return;
    }

    let ans = prompt("Error: Attachment Locked.\n\nPlease Enter Password\n\nHint: 7/1/2024", "");

    if (btoa(ans) == 'eW91bGxzZWVoaW1zb29u') {
        window.location.href = atob('Li92YXVsdC9mYWxzZWJlaW5nLmh0bWw=')
    } else {
        let Tomorrow = new Date();
        Tomorrow.setDate(Tomorrow.getDate()+1);
        localStorage.setItem("nextPasswordTry",Tomorrow.getTime())
        alert("Error: Invalid Password.\n\nMaximum Daily Attempts Reached.\n\nYou may try again after:\n" + Tomorrow.toDateString() + "\n" + Tomorrow.toTimeString())
    }
}