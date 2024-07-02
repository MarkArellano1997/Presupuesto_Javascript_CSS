class Dato{
    constructor(description, valor){
        this._description = description
        this._valor = valor
    }
    
    get description(){
        return this._description
    }

    set description(description){
        return this._description = description
    }

    get valor(){
        return this._valor
    }

    set valor(valor){
        return this._valor = valor
    }
}
