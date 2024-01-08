"use strict";
var _a;
const queryParams = new URLSearchParams(window.location.search);
const parameter = queryParams.get("song");
let values = [];
let x = JSON.parse(localStorage.getItem("Music" + parameter));
document.title = x.title;
let title = document.querySelector(".info h1");
title.innerText = x.title;
let artists = document.querySelector(".info .artistsP");
artists.innerText += x.artists ? x.artists.join(", ") : "Неизвестно";
let producers = document.querySelector(".info .producersP");
producers.innerText += x.producers ? x.producers.join(", ") : "Неизвестно";
let genres = document.querySelector(".info .genresP");
genres.innerText += x.genres ? x.genres.join(", ") : "Неизвестно";
let date = document.querySelector(".info .dateP");
date.innerText += x.released;
let album = document.querySelector(".info .albumP");
album.innerText += x.album;
let recordStudio = document.querySelector(".info .recordStrudioP");
recordStudio.innerText += x.recordStudio;
let label = document.querySelector(".info .labelP");
label.innerText += x.label ? x.label : "Неизвестно";
let rate = document.querySelector(".info .rateP");
rate.innerText += x.rate.toString();
let img = document.querySelector(".container img");
if (x.image.includes("base64"))
    img.src = x.image;
else
    img.src += x.image;
let imginfo = document.querySelector(".imginfo");
if (x.song) {
    let audio = document.createElement("audio");
    if (x.song.includes("base64"))
        audio.setAttribute("src", x.song);
    else
        audio.setAttribute("src", "../music/" + x.song);
    audio.setAttribute("class", "audio");
    audio.setAttribute("controls", "true");
    imginfo === null || imginfo === void 0 ? void 0 : imginfo.after(audio);
}
if (x.text) {
    let textDiv = document.createElement("div");
    textDiv.setAttribute("class", "textDiv");
    let headerP = document.createElement("h2");
    headerP.innerText = "Текст песни";
    textDiv.appendChild(headerP);
    let textP = document.createElement("p");
    textP.setAttribute("class", "textP");
    textP.innerText = x.text;
    textDiv.appendChild(textP);
    imginfo === null || imginfo === void 0 ? void 0 : imginfo.after(textDiv);
}
if (x.songClip) {
    let a = document.createElement("a");
    a.href = x.songClip;
    a.innerText = "Клип";
    (_a = document.querySelector(".info")) === null || _a === void 0 ? void 0 : _a.appendChild(a);
}
function addReview() {
    let author = document.querySelector("#nameInput").value;
    let textReview = document.querySelector("#textReviewInput").value;
    let score = 1;
    document.getElementsByName("scoreRadio").forEach(el => {
        if (el.checked)
            score = parseInt(el.value);
    });
    let review = {
        name: author,
        text: textReview,
        score: score
    };
    x.reviews.push(review);
    let sum = 0;
    x.reviews.forEach(el => {
        sum += el.score;
    });
    x.rate = sum / x.reviews.length;
    localStorage.setItem("Music" + x.title, JSON.stringify(x));
    window.location.reload();
}
x.reviews.forEach(el => {
    var _a;
    let reviewDiv = document.createElement("div");
    reviewDiv.setAttribute("class", "review");
    let score = document.createElement("p");
    score.innerText = "Оценка: " + el.score.toString();
    score.setAttribute("class", "ratingReview");
    let name = document.createElement("p");
    name.innerText = "Имя: " + el.name;
    let textReview = document.createElement("p");
    textReview.innerText = el.text;
    reviewDiv.appendChild(score);
    reviewDiv.appendChild(name);
    reviewDiv.appendChild(textReview);
    (_a = document.querySelector("#reviews")) === null || _a === void 0 ? void 0 : _a.appendChild(reviewDiv);
});
