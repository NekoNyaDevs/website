const baseUrl = window.location.origin;
const apiURL = `${baseUrl}/api/v1/random/neko`;

function replaceSlashes(string) {
    return string.replace(/\//g, '%2F');
}

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

function createI() {
    const i = document.createElement('i');
    i.classList.add('bi');
    i.classList.add('bi-arrow-counterclockwise');
    return i;
}

/**
 *
 * @param {Element} element
 * @param {boolean} state
 */
function changeLoadingState(element, state) {
    let span = element.querySelector('span.spinner-border.spinner-border-sm');

    if(state === true && !span) {
        const tempoSpan = element.querySelector('span#text');
        tempoSpan.textContent = ' New one!';
        span = document.createElement('span');
        span.classList.add('spinner-border');
        span.classList.add('spinner-border-sm');
        span.setAttribute('role', 'status');
        span.setAttribute('aria-hidden', true);
    }

    if(state === true && !element.contains(span)) {
        const tempoSpan = element.querySelector('span#text');
        tempoSpan.textContent = ' New one!';
        return element.insertBefore(span, element.children[0]);
    }
    if(state === false && element.contains(span)) {
        element.removeChild(span);
        const tempoSpan = element.querySelector('span#text');
        const el = createI();
        const text = document.createTextNode(' New one!');
        tempoSpan.textContent = '';
        tempoSpan.appendChild(el);
        tempoSpan.appendChild(text);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const img = document.querySelector('#neko');
    const newBtn = document.querySelector('#new');
    const downloadBtn = document.querySelector('#download');

    let url = await fetch(apiURL).then(res => res.json()).then(data => data.url);

    async function changeImgSrc() {
        url = await fetch(apiURL).then(res => res.json()).then(data => data.url);
        img.src = url;
        downloadBtn.href = `${baseUrl}/api/v1/download?file=${replaceSlashes(encodeURI((url)))}`;
    }

    newBtn.addEventListener('click', async () => {
        changeClassState('disabled', newBtn, true);
        changeLoadingState(newBtn, true);
        await changeImgSrc().catch(err => {});
        changeClassState('disabled', newBtn, false);
        changeLoadingState(newBtn, false);
    });

    img.src = url;
});