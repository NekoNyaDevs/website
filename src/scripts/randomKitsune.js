const baseUrl = window.location.origin;
const apiURL = `${baseUrl}/api/v1/random/kitsune`;

console.log(apiURL)

function replaceSlashes(string) {
    return string.replace(/\//g, '%2F');
}

async function getKitsune(){
    const response = await fetch(apiURL);
    const data = await response.json();
    const kitsune = data.url;
    document.querySelector("#kitsune").src = kitsune;
    document.querySelector("#download").href = `${baseUrl}/api/v1/download?file=${replaceSlashes(encodeURI((kitsune)))}`;
}

getKitsune();

/**
 * 
 * @param {string} cssClass 
 * @param {Element} element 
 * @param {boolean} state 
 */
 function changeClassState(cssClass, element, state) {
    if(state === true && !element.classList.contains(cssClass)) return element.classList.add(cssClass);
    if(state === false && element.classList.contains(cssClass)) return element.classList.remove(cssClass);
}

/**
 * 
 * @param {Element} element 
 * @param {boolean} state 
 */
function changeLoadingState(element, state) {
    let span = element.querySelector('span.spinner-border.spinner-border-sm');

    if(state === true && !span) {
        span = document.createElement('span');
        span.classList.add('spinner-border');
        span.classList.add('spinner-border-sm');
        span.setAttribute('role', 'status');
        span.setAttribute('aria-hidden', true)
    }

    if(state === true && !element.contains(span)) {
        const tempoSpan = element.querySelector('span#text');
        tempoSpan.textContent = ' New kitsune pls';
        return element.insertBefore(span, element.children[0]);
    }
    if(state === false && element.contains(span)) return element.removeChild(span);
}

let img = document.querySelector('#kitsune')
let btnNew = document.querySelector('#new');
btnNew.addEventListener('click', async () => {
    changeClassState('disabled', btnNew, true);
    changeLoadingState(btnNew, true);
    await getKitsune().catch(err => {});
    changeClassState('disabled', btnNew, false);
    changeLoadingState(btnNew, false);
});