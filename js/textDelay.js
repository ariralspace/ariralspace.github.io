const sleep = ms => new Promise(r => setTimeout(r, ms));

function DelayTextTyping(elem, signal) {
    let allText = elem.querySelectorAll("p, span, h1, h2, h3, button, li, a");
    let totalDelay = 0;

    for (let i = 0; i < allText.length; i++) {
        let nextDelay = GetDelayAmount(allText[i]);
        LagText(allText[i], totalDelay);
        totalDelay += nextDelay;
    }

    async function LagText(elem, delay) {
        let finishedText = elem.innerHTML;
        let splitChunks = finishedText.split(" ");

        elem.innerText = "";

        await sleep(delay);
        
        if (!signal.aborted) {
            for (let i = 0; i < splitChunks.length; i++) {
                elem.innerText += ` ${splitChunks[i]}`;
                await sleep(10);
            }
            elem.innerHTML = finishedText;
        }
    }

    function GetDelayAmount(elem) {
        return elem.innerText.split(" ").length * 10;
    }
}