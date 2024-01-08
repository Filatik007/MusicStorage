"use strict";
function addTextInput(el) {
    let name;
    if (el instanceof RadioNodeList)
        name = el[0].name;
    else
        name = el.name;
    let elements = document.getElementsByName(name);
    let prevElement = elements.item(elements.length - 1);
    console.log(elements);
    let input = document.createElement("input");
    input.setAttribute("name", name);
    input.setAttribute("type", "text");
    if (prevElement)
        prevElement.after(input);
}
function addMusic() {
    let title = document.querySelector("#titleInput").value;
    let artists = [];
    document.getElementsByName("artistsInput").forEach(element => {
        if (element.value)
            artists.push(element.value);
    });
    let genres = [];
    document.getElementsByName("genresInput").forEach(element => {
        if (element.value)
            genres.push(element.value);
    });
    let recordStiduo = document.querySelector("#recordStudioInput").value || "Неизвестно";
    let producers = [];
    document.getElementsByName("producersInput").forEach(element => {
        if (element.value)
            producers.push(element.value);
    });
    let labelInput = document.querySelector("#labelInput").value || "Неизвестно";
    let albumInput = document.querySelector("#albumInput").value || "Неизвестно";
    let date = document.querySelector("#date").value;
    let text = document.querySelector("#descTextArea").value;
    let songClip = document.querySelector("#descTextArea").value;
    let x = {
        title: title,
        released: date ? new Date(date).toLocaleDateString() : "Неизвестно",
        album: albumInput,
        recordStudio: recordStiduo,
        label: labelInput,
        genres: genres.length > 0 ? genres : undefined,
        artists: artists.length > 0 ? artists : undefined,
        producers: producers.length > 0 ? producers : undefined,
        rate: 0,
        image: "default.png",
        text: text,
        songClip: songClip,
        reviews: []
    };
    let imageInput = document.getElementById("image").files;
    let songInput = document.getElementById("song").files;
    if (imageInput.length > 0) {
        let file = imageInput === null || imageInput === void 0 ? void 0 : imageInput.item(0);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            x.image = reader.result;
        };
    }
    if (songInput.length > 0) {
        let file = songInput === null || songInput === void 0 ? void 0 : songInput.item(0);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            x.song = reader.result;
        };
    }
    setTimeout(() => {
        localStorage.setItem("Music" + title, JSON.stringify(x));
        window.location.href = "../../index.html";
    }, 500);
}
