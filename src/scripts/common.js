function download(e) {
    const element = e.target;
    const url = element.getAttribute("url");

    const elem = document.createElement("a");
    elem.href = url;
    elem.download = url.split("/").pop();
    elem.click();
    document.body.removeChild(elem);
}
