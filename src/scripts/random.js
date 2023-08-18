const baseUrl = window.location.origin;
const apiURL = `${baseUrl}/api/v1/random/`;
const type = window.location.pathname.split('/')[2];

async function get() {
  const data = await (await fetch(apiURL + type)).json();
  const blob = await (await fetch(data.url)).blob();
  const url = window.URL.createObjectURL(blob);

  document.querySelector("#img").src = url;
  document.querySelector("#download").setAttribute("url", url);
  document.querySelector("#download").addEventListener("click", download);
}

get();

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
        tempoSpan.textContent = ' New ' + type + ' pls';
        span = document.createElement('span');
        span.classList.add('spinner-border');
        span.classList.add('spinner-border-sm');
        span.setAttribute('role', 'status');
        span.setAttribute('aria-hidden', true);
  }

    if(state === true && !element.contains(span)) {
        const tempoSpan = element.querySelector('span#text');
        tempoSpan.textContent = ' New ' + type + ' pls';
    return element.insertBefore(span, element.children[0]);
  }
    if(state === false && element.contains(span)) {
    element.removeChild(span);
        const tempoSpan = element.querySelector('span#text');
    const el = createI();
        const text = document.createTextNode(' New ' + type + ' pls');
        tempoSpan.textContent = '';
    tempoSpan.appendChild(el);
    tempoSpan.appendChild(text);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
    let img = document.querySelector('#img')
    let btnNew = document.querySelector('#new');

    btnNew.addEventListener('click', async () => {
        changeClassState('disabled', btnNew, true);
    changeLoadingState(btnNew, true);
        await get().catch(err => {});
        changeClassState('disabled', btnNew, false);
    changeLoadingState(btnNew, false);
  });
});
