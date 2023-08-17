function download(e) {
  const element = e.target;
  const url = element.getAttribute("url");

  fetch(url).then((response) => {
    response.blob().then((blob) => {
      const elem = document.createElement("a");
      elem.href = window.URL.createObjectURL(blob);
      elem.download = url.split("/").pop();
      elem.click();
      document.body.removeChild(elem);
    });
  });
}
