type Music = {
    title: string,
    released: string,
    album: string,
    recordStudio: string,
    label?: string,
    genres?: string[],
    artists?: string[],
    producers?: string[]
    rate: Number,
    image: string,
    song?: string,
    text?: string,
    songClip?: string,
    reviews: Review[]
}

let music : Music[] = [];

// Создание блока песни
function musicCreator(music: Music) : HTMLDivElement{
    let element = document.createElement("div");
    element.setAttribute("class", "musicBlock");

    let imgBlock = document.createElement("div");
    imgBlock.setAttribute("class", "imageBlock");
    let img = document.createElement("img");
    if(music.image.includes("base64")) img.setAttribute("src", music.image);
    else img.setAttribute("src", "./src/img/" + music.image);
    imgBlock.appendChild(img);
    element.appendChild(imgBlock);    

    let infoBlock = document.createElement("div");
    infoBlock.setAttribute("class", "infoBlock");
    let title = document.createElement("h2");
    title.innerText = music.title;
    title.setAttribute("class", "title");
    infoBlock.appendChild(title);
    let genres = document.createElement("p");
    genres.setAttribute("class", "genres");
    genres.innerText = "Жанры: " + (music.genres ? music.genres.join(", ") : "Неизвестно");
    infoBlock.appendChild(genres);

    let artists = document.createElement("p");
    artists.setAttribute("class", "artist");
    artists.innerText = "Исполнители: " + (music.artists ? music.artists.join(", ") : "Неизвестно");
    infoBlock.appendChild(artists);

    if(music.song){
        let audio = document.createElement("audio");
        if(music.song.includes("base64")) audio.setAttribute("src", music.song);
        else audio.setAttribute("src", "./src/music/" + music.song);
        audio.setAttribute("class", "audio");
        audio.setAttribute("controls", "true");
        infoBlock.appendChild(audio);
    }
    
    let buttons = document.createElement("div");
    buttons.setAttribute("class", "buttons");
    
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.innerText = "Удалить";
    deleteButton.setAttribute("value", music.title);
    deleteButton.setAttribute("onClick", "deleteSong(this.value)");
    buttons.appendChild(deleteButton);

    let buttonRedirection = document.createElement("button");
    buttonRedirection.setAttribute("onClick", `location.href='./src/html/song.html?song=${music.title}'`);
    buttonRedirection.innerText = "Подробнее";
    buttons.appendChild(buttonRedirection);

    infoBlock.appendChild(buttons);
    element.appendChild(infoBlock);
    
    return element;
}

function deleteSong(title: string){
    if(!confirm("Вы уверены что хотите удалить " + title + "?")) return;
    localStorage.removeItem("Music" + title);
    actualMusic = actualMusic.filter(s => s.title != title);
    refresh();
}

function init(){
    music = [];
    for(let key in localStorage){
        if(!key.includes("Music")) continue;
        let stringMusic = localStorage.getItem(key);
        let musicElement;
        if(stringMusic) musicElement = JSON.parse(stringMusic);
        if(musicElement) music.push(musicElement);
    }
}

function refresh(){
    if(musicBlock) musicBlock.innerHTML = "";
    actualMusic.forEach(element => {
        musicBlock?.appendChild(musicCreator(element));
    });
}

function sort(){
    let order = (<HTMLSelectElement> document.getElementById("typeSort")).value == "asc" ? 1 : -1;
    let typeSort = (<HTMLSelectElement> document.getElementById("sortBy")).value;
    if(typeSort == "title"){
        actualMusic.sort((a, b) => a.title.localeCompare(b.title) * order);
    }
    else if(typeSort == "released"){
        actualMusic.sort((a, b) => {
            let aDate = a.released == "Неизвестно" ? new Date("0001-01-01") : new Date(a.released);
            let bDate = b.released == "Неизвестно" ? new Date("0001-01-01") : new Date(b.released);
            return (aDate.valueOf() - bDate.valueOf()) * order;
        });
    }
    else if(typeSort == "rate"){
        actualMusic.sort((a, b) => (a.rate.valueOf() - b.rate.valueOf()) * order);
    }
}

function filterYesNoCreator(name: string, property: string){
    let filterBlock = document.getElementById("filters");

    let element = document.createElement("div");
    element.setAttribute("class", "filterElement");

    let label = document.createElement("label");
    label.setAttribute("for", property + "Select");
    label.innerText = name;

    let select = document.createElement("select");
    select.setAttribute("id", property + "Select");
    select.setAttribute("name", property);

    let defaultOption = document.createElement("option");
    defaultOption.setAttribute("value", "none");
    defaultOption.innerText = "Все";
    select.add(defaultOption);

    let optionYes = document.createElement("option");
    optionYes.setAttribute("value", "true");
    optionYes.innerText = "Есть";
    select.add(optionYes);

    let optionNo = document.createElement("option");
    optionNo.setAttribute("value", "false");
    optionNo.innerText = "Нет";
    select.add(optionNo);

    element.appendChild(label);
    element.appendChild(select);

    filterBlock?.appendChild(element);
}

function filterCreator(name: string, property: string){
    let filterBlock = document.getElementById("filters");

    let element = document.createElement("div");
    element.setAttribute("class", "filterElement");

    let label = document.createElement("label");
    label.setAttribute("for", property + "Select");
    label.innerText = name;

    let select = document.createElement("select");
    select.setAttribute("id", property + "Select");
    select.setAttribute("name", property);

    let defaultOption = document.createElement("option");
    defaultOption.setAttribute("value", "none");
    defaultOption.innerText = "Все";
    select.add(defaultOption);

    let values : string[] = [];

    music.forEach(element => {
        let propertyValue = element[property as keyof Music];
        if(!Array.isArray(propertyValue)){
            if(typeof propertyValue === "string") propertyValue = [propertyValue];
        }
        if(propertyValue && !(propertyValue instanceof Number)){
            propertyValue.forEach(element => {
                if(typeof element != "string") return;
                if(!values.includes(element)){
                    let option = document.createElement("option");
                    option.setAttribute("value", element);
                    option.innerText = element;
                    select.add(option);
                    values.push(element);
                }
            })
        }
    });

    element.appendChild(label);
    element.appendChild(select);

    filterBlock?.appendChild(element);
}

function filterProcess(){
    let selects = document.querySelectorAll("#filters select");
    selects.forEach(element => {
        let selectedValue = (<HTMLSelectElement> element).value;
        let selectedProp = (<HTMLSelectElement> element).name;
        if(selectedValue == "true"){
            actualMusic = actualMusic.filter(music => music[selectedProp as keyof Music]);
        }
        else if(selectedValue == "false"){
            actualMusic = actualMusic.filter(music => !music[selectedProp as keyof Music])
        }
        else if(selectedValue != "none"){
            actualMusic = actualMusic.filter(music => {
                let musicValue = music[selectedProp as keyof Music];
                if(Array.isArray(musicValue)) return (<string[]> musicValue).includes(selectedValue);
                else return music[selectedProp as keyof Music] == selectedValue;
            }
        )};
    });
}

function filter(){
    actualMusic = [...music];
    sort();
    filterProcess();
    refresh();
}

init();
let actualMusic : Music[] = [...music];

let musicBlock = document.getElementById("music");
actualMusic.sort((a, b) => a.title.localeCompare(b.title));
refresh();

filterYesNoCreator("Наличие возможности прослушать", "song");
filterYesNoCreator("Наличие клипа", "songClip");
filterYesNoCreator("Наличие текста", "text");

filterCreator("Жанры: ", "genres");
filterCreator("Лейбл: ", "label");
filterCreator("Исполнители: ", "artists");
filterCreator("Продюсер:", "producers");
filterCreator("Студия звукозаписи:", "recordStudio");

let selects = document.querySelectorAll("select");
selects.forEach(element => {
    element.selectedIndex = 0;
});