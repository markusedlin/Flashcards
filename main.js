import Deck from "./Deck.js"
import FlashCard from "./FlashCard.js"

const flashButton = document.getElementById("flashButton")
const submitButton = document.getElementById("submit")
let cardElement = document.getElementById("term")
let correctElement = document.getElementById("correct")
let incorrectElement = document.getElementById("incorrect")
let inputElement = document.getElementById("answer")
let flashcardElement = document.getElementById("flashcard")

const fr = new FileReader()
let deck = new Deck()
let currentCard;
let score = 0;

function addEventListeners(){
    fr.addEventListener("load",handleEvent)
    inputElement.addEventListener("keypress", function(event){
        if(event.key === "Enter"){
            submitButton.click();
        }
    })
    flashButton.addEventListener("click",start)
    submitButton.addEventListener("click",submit)
}

function getFile(){
    let file = document.getElementById("file").files[0]
    return file
}

function handleEvent(event){
    if (event.type == "load"){
        let lines = event.target.result.split("\r\n")
        linesToFlashCards(lines)
        startFlashcards()
    }
}

function readFile(file){
    fr.readAsText(file)
}

function start(){
    hideElement(document.getElementById("file_start"))
    readFile(getFile())
}

function linesToFlashCards(lines){
    let dictionary = {}
    for (let line of lines){
        let splitLine = line.split(" ");


        let term = splitLine[0]
        let definition
        let splitLineLength = splitLine.length
        if(splitLineLength>2){ // if there is more than two words per line (more than one definition)
            definition = splitLine.slice(1,splitLineLength-1)
        }
        else{
            definition = [splitLine[1]]
        }

        if (Object.keys(dictionary).includes(term)){
            if(definition.length > 1){
                let defList = dictionary[term]
                for(let d of definition){
                    if(!defList.includes(d)){ // if the dictionary definition list for term does not include current definition
                        dictionary[term].push(d)
                    }
                }
            }else{
                dictionary[term].push(definition[0])
            }
        }else{
            dictionary[term] = definition
        }
    }

    for(let t of Object.keys(dictionary)){
        deck.addToDeck(new FlashCard(t, dictionary[t]))
    }
}

function startFlashcards(){
    deck.shuffle()
    let card = deck.getNext()
    if(card instanceof FlashCard){
        let term = card.getTerm()
        currentCard = card
        showElement(flashcardElement)
        cardElement.innerHTML = term
        removeElemValue(inputElement)
        inputElement.focus()
    }
}

function getGivenValue(){
    return document.getElementById("answer").value
}

function checkCorrectDefinition(card, given){
    return (card.getDefinition().includes(given))
}

function submit(){
    let correct = checkCorrectDefinition(currentCard, getGivenValue())
    let linkElem = document.createElement("a")
    linkElem.href = "https://www.verbformen.com/?w="+currentCard.getTerm()
    linkElem.target = "_blank"
    linkElem.rel = "noopener noreferrer"
    linkElem.innerHTML = currentCard.getTerm() +": "+ listToString(currentCard.getDefinition()) + "<br>"
    if (correct){
        score +=1
        linkElem.style.color = "green"
        correctElement.appendChild(linkElem)
        scrollToEnd(correctElement)
    }
    else{
        linkElem.style.color = 'red'
        incorrectElement.appendChild(linkElem)
        scrollToEnd(incorrectElement)
    }
    nextCard()
}


function listToString(list){
    let string = ""
    list.forEach(element => {
        string += element + " "
    });
    return string
}

function nextCard(){
    nextTerm()
    updateCardGraphics()
}
function nextTerm(){
    currentCard = deck.getNext();
    removeElemValue(inputElement);
    inputElement.focus();
}

function updateCardGraphics(){
    cardElement.innerHTML = currentCard.getTerm()
}

function hideElement(e){
    e.style.display = "none";
}

function showElement(e){
    e.style.display = "block";
}

function removeElemValue(e){
    e.value = "";
}

function scrollToEnd(e){
    e.scrollTop = e.scrollHeight;
}

addEventListeners()