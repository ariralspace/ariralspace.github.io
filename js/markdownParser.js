let ac = new AbortController();

function ParseMarkdownPage(path) {
    fetch(path)
        .then((res) => res.text())
        .then((text) => {
            SplitMarkdownIntoMessages(text)
        })
        .catch((e) => console.error(e));
}

function SplitMarkdownIntoMessages(text) {
    document.getElementById("emailList").innerHTML = "";

    let splitLines = text.split("\n");
    let currentBody = "";
    let currentTitle = "";

    for (let i = 0; i < splitLines.length; i++) {
        if (splitLines[i].startsWith('# ')) {
            // New Section
            if (currentTitle != "") {
                CreateEmailPage(currentTitle, currentBody.trim());
            }
            currentTitle = splitLines[i].substring(2);
            currentBody = "";
        } else {
            // Continue Section
            currentBody += `${splitLines[i]}\n`
        }
    }
    if (currentTitle != "") {
        CreateEmailPage(currentTitle, currentBody.trim());
    }
}

function CreateEmailPage(title, body) {
    let newEmailButton = document.createElement("button");
    newEmailButton.type = "button";
    newEmailButton.innerText = title;
    document.getElementById("emailList").appendChild(newEmailButton);

    newEmailButton.onclick = function () {
        LoadEmailPage(title, body);
    }
}

function LoadEmailPage(title, body) {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    const day = currentTime.getDate();
    const emailDate = `${formattedTime} D:${day}`;

    document.getElementById("emailDateTime").innerText = emailDate;
    document.getElementById("emailTitleText").innerText = title;
    let parsedContent = document.getElementById("parsedContent");
    parsedContent.innerHTML = marked.parse(body);

    parsedContent.querySelectorAll("li").forEach(elem => elem.innerHTML = "> " + elem.innerHTML);

    ac.abort();
    ac = new AbortController();
    DelayTextTyping(document.getElementById("parsedContent"), ac);
}

document.addEventListener('DOMContentLoaded', async function () {
    ParseMarkdownPage("./markdown-pages/home.md");
})