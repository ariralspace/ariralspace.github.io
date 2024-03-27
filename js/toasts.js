function CreateToast(label, name, progress, max) {
    let newToast = document.createElement("div");
    newToast.className = "toast";
    document.getElementById("toastRoot").appendChild(newToast);

    let toastImage = document.createElement("img");
    toastImage.className = "toastImage";
    toastImage.src = "./img/noimage.png";
    newToast.appendChild(toastImage);

    let toastContent = document.createElement("div");
    toastContent.className = "toastContent";
    newToast.appendChild(toastContent);

    let toastLabel = document.createElement("span");
    toastLabel.className = "toastLabel";
    toastLabel.innerText = label;
    toastContent.appendChild(toastLabel);

    let toastName = document.createElement("span");
    toastName.className = "toastName";
    toastName.innerText = name;
    toastContent.appendChild(toastName);

    let toastProgress = document.createElement("div");
    toastProgress.className = "toastProgress";
    toastContent.appendChild(toastProgress);

    let toastProgressCompleted = document.createElement("div");
    toastProgressCompleted.style = `width:${(progress / max) * 100}%`;
    toastProgress.appendChild(toastProgressCompleted);

    let toastProgressAmount = document.createElement("span");
    toastProgressAmount.className = "toastProgressAmount";
    toastProgressAmount.innerText = `${progress}/${max}`;
    toastProgress.appendChild(toastProgressAmount);

    setTimeout(function () {
        newToast.remove();
    }, 7000)
}

function AchievementPopup(name, progress, max, audio = false) {
    if (audio) {
        let achieveSound = new Audio("./audio/achievement.ogg");
        achieveSound.volume = 0.5
        achieveSound.play();
    }
    CreateToast("Achievement:", name, progress, max);
}