function addTextInput(el: HTMLInputElement){
    let name;
    if(el instanceof RadioNodeList) name = (<HTMLInputElement>el[0]).name;
    else name = el.name;
    let elements = document.getElementsByName(name);
    let prevElement = elements.item(elements.length - 1);

    console.log(elements);

    let input = document.createElement("input");
    input.setAttribute("name", name);
    input.setAttribute("type", "text");

    if(prevElement) prevElement.after(input);    
}

function addMusic(){
    let title = (<HTMLInputElement>document.querySelector("#titleInput")).value;
    
    let artists : string[] = [];
    document.getElementsByName("artistsInput").forEach(element =>{
        if((<HTMLInputElement>element).value)artists.push((<HTMLInputElement>element).value)
    });

    let genres :string[] = [];
    document.getElementsByName("genresInput").forEach(element =>{
        if((<HTMLInputElement>element).value)genres.push((<HTMLInputElement>element).value)
    });

    let recordStiduo = (<HTMLInputElement>document.querySelector("#recordStudioInput")).value || "Неизвестно";

    let producers : string[] = [];
    document.getElementsByName("producersInput").forEach(element =>{
        if((<HTMLInputElement>element).value)producers.push((<HTMLInputElement>element).value)
    });

    let labelInput = (<HTMLInputElement>document.querySelector("#labelInput")).value || "Неизвестно";

    let albumInput = (<HTMLInputElement>document.querySelector("#albumInput")).value || "Неизвестно";

    let date = (<HTMLInputElement>document.querySelector("#date")).value;

    let text = (<HTMLInputElement>document.querySelector("#descTextArea")).value;

    let songClip = (<HTMLInputElement>document.querySelector("#descTextArea")).value;

    let x : Music = {
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
    }

    let imageInput = (<HTMLInputElement> document.getElementById("image")).files;
    let songInput = (<HTMLInputElement> document.getElementById("song")).files;

    if(imageInput!.length > 0){
        let file = imageInput?.item(0);
        let reader = new FileReader();
        reader.readAsDataURL(file!);

        reader.onload = function(){
            x.image = reader.result as string;
        };
    } 
    if(songInput!.length > 0){
        let file = songInput?.item(0);
        let reader = new FileReader();
        reader.readAsDataURL(file!);

        reader.onload = function(){
            x.song = reader.result as string;
        };
    }

    setTimeout(() => {
        localStorage.setItem("Music" + title, JSON.stringify(x));
        window.location.href = "../../index.html";
    }, 500);
}

