function download(e) {
    const element = e.target;
    const url = element.getAttribute("url");

    const elem = document.createElement("a");
    elem.href = url;
    elem.download = url.split("/").pop();
    elem.click();
    document.body.removeChild(elem);
}

document.addEventListener("DOMContentLoaded", async () => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        img.addEventListener("error", (e) => {
            e.target.src = "https://http.cat/404";
            e.onerror = null;
        });
    });
});