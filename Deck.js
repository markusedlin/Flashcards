import FlashCard from "./FlashCard.js"

export default class Deck{
    constructor(){
        this.deck = []
    }
    getDeck(){
        return this.deck
    }
    addToDeck(card){
        if (card instanceof FlashCard){
            this.deck.push(card)
        }
    }
    shuffle(){
        this.deck.sort(()=>Math.random()-0.5)
    }
    getNext(){
        return this.deck.pop()
    }
}