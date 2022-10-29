const baseUrl = 'https://nekonya.classy.works';
const apiURL = `${baseUrl}/api/v1/random/neko`;

function replaceSlashes(string) {
    return string.replace(/\//g, '%2F');
}

async function getNeko(){
    const response = await fetch(apiURL);
    const data = await response.json();
    const neko = data.url;
    document.querySelector("#neko").src = neko;
    document.querySelector("#download").href = `${baseUrl}/api/v1/download?file=${replaceSlashes(encodeURI((neko)))}`;
}

getNeko();

/**
 * 
 * @param {string} cssClass 
 * @param {Element} element 
 * @param {boolean} state 
 */
function changeClassState(cssClass, element, state) {
    if(state === true && !element.classList.contains(cssClass)) return element.classList.add(cssClass);
    if(state === false && element.classList.contains(cssClass)) return element.classList.remove(cssClass);
    return;
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
        span.setAttribute('aria-hidden', true);
    }

    if(state === true && !element.contains(span)) {
        const tempoSpan = element.querySelector('span#text');
        tempoSpan.textContent = ' New neko pls';
        return element.insertBefore(span, element.children[0]);
    }
    if(state === false && element.contains(span)) return element.removeChild(span);
}

let img = document.querySelector('#neko')
let btnNew = document.querySelector('#new');
btnNew.addEventListener('click', async () => {
    changeClassState('disabled', btnNew, true);
    changeLoadingState(btnNew, true);
    await getNeko().catch(err => {});
    changeClassState('disabled', btnNew, false);
    changeLoadingState(btnNew, false);
});