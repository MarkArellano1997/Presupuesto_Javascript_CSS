class Ingreso extends Dato{
    static contadorIngresos = 0;
    constructor(description, valor){
        super(description,valor)
        this._id = ++Ingreso.contadorIngresos;
    }

    get id(){
        return this._id
    }

    
}