const cursor = document.createElement("div");
cursor.id = "cursor";

document.addEventListener('DOMContentLoaded', async function () {
    let mouseContainer = document.getElementById("mouseContainer");
    mouseContainer.insertBefore(cursor, mouseContainer.firstChild);
});

document.addEventListener('mouseover',function(e){
    cursor.style.backgroundImage = `url("./img/cursor/${GetCursorSprite(e.target)}")`;
},false);

const positionElement = (e)=> {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
     
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;  
    cursor.style.display = "block";
}
window.addEventListener('mousemove', positionElement);

document.addEventListener("mouseleave", function(event){
    if(event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight))
    {
        cursor.style.display = "none";
    }
});

function GetCursorSprite(target){
    let cursorState = target.nodeName.toLowerCase();

    if (target.className == "spaceTrash" && (target.src.includes("shrimp") || target.src.includes("skull"))) {
        return "cursorpoint.png";
    }

    switch (cursorState) {
        case "button":
        case "a":
        case "input":
            return "cursorpoint.png";
        default:
            return "cursor.png";
    }
}