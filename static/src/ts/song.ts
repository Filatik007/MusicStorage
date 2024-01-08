type Review = {
    name: string,
    text: string,
    score: number
}

const queryParams = new URLSearchParams(window.location.search); 
const parameter = queryParams.get("song");

let values : string[] = [];

let x : Music = JSON.parse(localStorage.getItem("Music" + parameter!)!);

document.title = x.title;

let title = <HTMLHeadingElement> document.querySelector(".info h1");
title.innerText = x.title;

let artists = <HTMLHeadingElement> document.querySelector(".info .artistsP");
artists.innerText += x.artists ? x.artists.join(", ") : "Неизвестно";

let producers = <HTMLHeadingElement> document.querySelector(".info .producersP");
producers.innerText += x.producers ? x.producers.join(", ") : "Неизвестно";

let genres = <HTMLHeadingElement> document.querySelector(".info .genresP");
genres.innerText += x.genres ? x.genres.join(", ") : "Неизвестно";

let date = <HTMLHeadingElement> document.querySelector(".info .dateP");
date.innerText += x.released;

let album = <HTMLHeadingElement> document.querySelector(".info .albumP");
album.innerText += x.album;

let recordStudio = <HTMLHeadingElement> document.querySelector(".info .recordStrudioP");
recordStudio.innerText += x.recordStudio;

let label = <HTMLHeadingElement> document.querySelector(".info .labelP");
label.innerText += x.label ? x.label : "Неизвестно";

let rate = <HTMLHeadingElement> document.querySelector(".info .rateP");
rate.innerText += x.rate.toString();

let img = <HTMLImageElement> document.querySelector(".container img");
if(x.image.includes("base64")) img.src = x.image;
else img.src += x.image;

let imginfo = document.querySelector(".imginfo");
if(x.song){
    let audio = document.createElement("audio");
    if(x.song.includes("base64")) audio.setAttribute("src", x.song);
    else audio.setAttribute("src", "../music/" + x.song);
    audio.setAttribute("class", "audio");
    audio.setAttribute("controls", "true");
    imginfo?.after(audio);
}
if(x.text){
    let textDiv = document.createElement("div");
    textDiv.setAttribute("class", "textDiv");

    let headerP = document.createElement("h2");
    headerP.innerText = "Текст песни";
    textDiv.appendChild(headerP);

    let textP = document.createElement("p");
    textP.setAttribute("class", "textP");
    textP.innerText = x.text;
    textDiv.appendChild(textP);
    
    imginfo?.after(textDiv);
}
if(x.songClip){
    let a = document.createElement("a");
    a.href = x.songClip;
    a.innerText = "Клип";
    document.querySelector(".info")?.appendChild(a);
}

function addReview(){
    let author = (<HTMLInputElement> document.querySelector("#nameInput")).value;
    let textReview = (<HTMLInputElement> document.querySelector("#textReviewInput")).value;

    let score : number = 1;
    document.getElementsByName("scoreRadio").forEach(el => {
        if((<HTMLInputElement> el).checked) score = parseInt((<HTMLInputElement> el).value);
    });

    let review : Review = {
        name: author,
        text: textReview,
        score: score
    }

    x.reviews.push(review);
    let sum = 0;
    x.reviews.forEach(el => {
        sum += el.score;
    });
    x.rate = sum / x.reviews.length;
    localStorage.setItem("Music"+x.title, JSON.stringify(x));

    window.location.reload();
}


x.reviews.forEach(el => {
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

    document.querySelector("#reviews")?.appendChild(reviewDiv);
});