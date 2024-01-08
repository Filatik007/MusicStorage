"use strict";
let allMusicLoad = [
    {
        title: "Nightcall",
        rate: 0,
        released: "2010-04-02",
        recordStudio: "Gang Recording Studio",
        genres: ["synth-pop", "electro", "synthwave"],
        artists: ["Kavinsky", "Lovefoxx"],
        producers: ["Kavinsky", "Guy-Manuel de Homem-Christo"],
        image: "Kavinsky_Nightcall_2010.png",
        song: "Nightcall.mp3",
        album: "OutRun",
        text: "[Verse: Kavinsky & Sébastien Tellier]\nI'm giving you a night call to tell you how I feel\n(We'll go all, all, all night long)\nI want to drive you through the night, down the hills\n(We'll go all, all, all night long)\nI'm gonna tell you something you don't want to hear\n(We'll go all, all, all night long)\nI'm gonna show you where it's dark, but have no fear\n(We'll go all, all, all night long)\n\n[Chorus: Lovefoxxx]\nThere's something inside you\nIt's hard to explain\nThey're talking about you, boy\nBut you're still the same\nThere's something inside you\nIt's hard to explain\nThey're talking about you, boy\nBut you're still the same\n\n[Verse: Kavinsky & Sébastien Tellier]\nI'm giving you a night call to tell you how I feel\n(We'll go all, all, all night long)\nI want to drive you through the night, down the hills\n(We'll go all, all, all night long)\nI'm gonna tell you something you don't want to hear\n(We'll go all, all, all night long)\nI'm gonna show you where it's dark, but have no fear\n(We'll go all, all, all night long)\n[Chorus: Lovefoxxx]\nThere's something inside you\nIt's hard to explain\nThey're talking about you, boy\nBut you're still the same\nThere's something inside you\nIt's hard to explain\nThey're talking about you, boy\nBut you're still the same\nThere's something inside you\nIt's hard to explain\nThey're talking about you, boy\nBut you're still the same",
        songClip: "https://youtu.be/MV_3Dpw-BRY",
        reviews: []
    },
    {
        title: "Happy face",
        rate: 0,
        released: "2023-14-05",
        recordStudio: "Deezer",
        genres: ["alternative music", "indi"],
        artists: ["Jagwar Twin"],
        producers: ["Jagwar Twin"],
        image: "Happyface.png",
        song: "Happyface.mp3",
        album: "33",
        text: "Hey, put on a happy face\nthen everything's okay\nput on a happy face\nflip the switch, flip the stove\nworld gone mad, let's start the show\nget your kicks and let's go\nif you're sad, don't let it show\nsay i'm happy, i'm happy, i'm happy today\ni'm happy, i'm happy, i'm happy today\nthey say put on a happy face\n'cause we're tick-tock, tick-tock\nticking like a timebomb\nhey, put on a happy face\nthen everything's okay\nput on a happy face\nhey, put on a happy face\nthen everything's okay\nput on a happy face\nsay you're good, say you're fine\ntell 'em everything's alright\nhollywood on your timeline\ntelling you what to wear\nand what to like and how to be\nsay i'm happy, i'm happy, i'm happy today\ni'm happy, i'm happy, i'm happy today\nthey say put on a happy face\n'cause we're tick-tock, tick-tock\nticking like a timebomb\nhey, put on a happy face\nthen everything's okay\nput on a happy face\nhey, put on a happy face\nthen everything's okay\nput on a happy face\ndeath of my generation\n(death of my generation)\nah-ah-ah\ndeath of my generation\n(death of my generation)\nhey, put on a happy face\nthen everything's okay\nput on a happy face\nhey, put on a happy face\nthen everything's okay\nput on a happy face",
        reviews: []
    }
];
allMusicLoad.forEach(element => {
    localStorage.setItem("Music" + element.title, JSON.stringify(element));
});
