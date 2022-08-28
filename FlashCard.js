export default class FlashCard{
    constructor(term, definition){
        this.term = term
        this.definition = definition
    }
    getTerm(){
        return this.term
    }
    getDefinition(){
        return this.definition
    }
}