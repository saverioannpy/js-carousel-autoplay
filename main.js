'use strict'; 

/** Funzioni **/

function addEventOnThumbs(){
    const thumbsAllSmallSection = document.querySelectorAll(".carousel-thumb-small"); //seleziono tutte e 5 le sezioni della mia thumb
    console.log(thumbsAllSmallSection);
    for( let i = 1 ; i < thumbsAllSmallSection.length ; i++){ //gli eventi vengono aggiunti dal secondo thumb in poi poichè non è utile avere l'evento in ascolto sulla prima minuatura e ciò sarebbe incompatibile con la logica della funzione shiftArrayElementIdNext
    thumbsAllSmallSection[i].addEventListener("click" , 
        function(){ //ogni volta che clicchiamo su una thumbs verrà avviata la funzione di riordinamento nel nostro array utilizzando l'id dell'elemento cliccato così da iterare il ciclo fin quando esso non sarà l'elemento in cima ed attivo.
            thumbsId = i;
            shiftArrayElementIdNext(articleArray, thumbsId);
        })
    }
    
}

function popoloThumb(articleArray){ // funzione per il popolamento della sezione thumbs
    const thumbContainer = document.querySelector(".carousel-thumb-container"); //Seleziono il contenitore delle immagini thumbs;
    console.log("Selezionato il container delle thumbs: " + thumbContainer);
    for(let i = 0 ; i < articleArray.length ; i++){
        const thumbDiv = document.createElement("div");
        thumbDiv.classList.add("carousel-thumb-small"); //creo il mio <div> con classe .carousel-thumb-small;
        const thumbImg = document.createElement("img"); //creo il mio <img> da inserire nel tag <div> creato in precedenza;
        thumbImg.src = articleArray[i].img; //modifico l'attribbuto "src" al mio tag <img> dandogli la path dell'immagine;
        console.log(thumbImg)
        thumbDiv.append(thumbImg); //appendo il tag <img> con la path dell'immagine nel tag <div>;
        thumbContainer.append(thumbDiv);
    }
    const activeThumb = document.querySelector(".carousel-thumb-small"); //seleziono l'elemento attivo
    console.log(activeThumb);
    activeThumb.classList.add("active");
    addEventOnThumbs();
}


function shiftArrayElementIdNext(articleArray, iterationNumber){ 
    const thumbContainer = document.querySelector(".carousel-thumb-container"); //Seleziono il contenitore delle immagini thumbs;
    thumbContainer.innerHTML = ""; //svuoto la sezione thumbs
    if( iterationNumber === 0){  //se iteration number è 0 significa che l'utente ha cliccato sul tasto next e lo shift in avanti avverrà una sola volta
        articleArray.push(articleArray[0]);  
        for( let i = 1; i <= articleArray.length-1 ; i++ ){ 
            articleArray[i-1] = articleArray[i];
        }
        articleArray.pop();
    }else{ //se iterationNumber è superiore a 0 vorrà dire che l'utente ha cliccato su una minuatura del thumbs
        while( iterationNumber > 0 ){ //iterationNumber è l'id della minuatura thumbs cliccata e il ciclo si ripeterà fin quando quest'ultima non sarà in cima ed attiva
            articleArray.push(articleArray[0]); 
            for( let i = 1; i <= articleArray.length-1 ; i++ ){ //riordino il mio array
                articleArray[i-1] = articleArray[i];
            }
            iterationNumber--;  
            articleArray.pop(); //rimuovo l'ultimo elemento
        }
    }    
    console.log("Array riordinato a in avanti"); //ottengo l'array riordinato
    popoloThumb(articleArray); //ripopolo la thumbs
    popolaMain(); //cambio l'immagine del mail

}


function shiftArrayElementIdPrev(articleArray){
    const thumbContainer = document.querySelector(".carousel-thumb-container"); //Seleziono il contenitore delle immagini thumbs;
    thumbContainer.innerHTML = ""; //svuoto la sezione thumbs
    for( let i = articleArray.length-1; i >= 0; i-- ){ //riordino il mio array
        articleArray[i+1] = articleArray[i];
    }
    articleArray[0] = articleArray[articleArray.length-1];
    articleArray.pop(); //rimuovo l'ultimo elemento
    console.log("Array riordinato a ritroso"); //ottengo l'array riordinato
    popoloThumb(articleArray); //ripopolo la thumbs
    popolaMain(); //cambio l'immagine del mail
}


function popolaMain(){
    const carouselMain = document.querySelector(".carousel-main"); //Seleziono il contenitore delle immagini thumbs;
    carouselMain.innerHTML = "";
    console.log("Seleziono il contenitore principale del carosello: " + carouselMain); 
    const mainDiv = document.createElement("div");
    const mainImg = document.createElement("img"); //creo il mio <img> da inserire nel tag <div> creato in precedenza;
    mainImg.src = articleArray[0].img; //modifico l'attribbuto "src" al mio tag <img> dandogli la path dell'immagine;
    const mainTexts = document.createElement("div");
    mainTexts.classList.add("carousel-main-text-div");
    const mainTitle = document.createElement("h3");
    mainTitle.classList.add("carousel-main-text");
    mainTitle.innerHTML = articleArray[0].title;
    const mainSubTitle = document.createElement("p");
    mainSubTitle.classList.add("carousel-main-text");
    mainSubTitle.innerHTML = articleArray[0].subtitle;
    mainTexts.append(mainTitle);
    mainTexts.append(mainSubTitle);
    mainDiv.append(mainImg); //appendo l'immagine, il titolo e il sottotitolo al nostro Div
    mainDiv.append(mainTexts);
    carouselMain.append(mainDiv);
}


/** Dichiarazione Array di Oggetti */

const articleArray = [
    {
        img: "img/spiderman_result.jpg",
        title: "Titolo Spiderman",
        subtitle: "Sottotitolo Spiderman"
    },
    {
        img: "img/gta_result.jpg",
        title: "Titolo GTA 6",
        subtitle: "Sottotitolo GTA 6"
    },
    {
        img: "img/liesofp_result.jpg",
        title: "Titolo Lies Of P",
        subtitle: "sottotitolo Lies of P"
    },
    {
        img: "img/ken_result.jpg",
        title: "Titolo Ken il Guerriero",
        subtitle: "sottotitolo Ken il guerriero"
    },
    {
        img: "img/layton_result.jpg",
        title: "Titolo Pro Layton",
        subtitle: "Sottotitolo pro Layton"
    },
];

/** Main JS **/

let thumbsId = 0; //questa variabile globale serve alla funzione "shiftArrayElementNext" per poter capire quante volte riordinare l'array, questa variazione avviene solo quando questa funzione è richiamata da "addEventOnThumbs"
popolaMain();
popoloThumb(articleArray);
const nextBtn = document.querySelector(".btn-span-up");  //Seleziono il tasto next;
nextBtn.addEventListener('click', function(){
    shiftArrayElementIdNext(articleArray, thumbsId); //se si clicca sul tasto next l'array verrà shiftato in avanti una sola volta poichè la variabile "thumbsId" è ancora zero
});
const prevBtn = document.querySelector(".btn-span-down"); //Seleziono il tasto prev;
console.log("Seleziono il tasto next" + prevBtn);
prevBtn.addEventListener('click', function(){
    shiftArrayElementIdPrev(articleArray);
});

setTimeout(shiftArrayElementIdNext(articleArray, thumbsId), 3000);