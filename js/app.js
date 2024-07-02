const ingresos = [
    // new Ingreso('Salario', 2300.00),
    // new Ingreso('Venta coche', 1500),
]

const egresos = [
    // new Egreso('Renta departamento', 1100),
    // new Egreso('Ropa', 400)
]

const presupuestoTotal = document.getElementById('presupuesto')
const ingresosDiv = document.getElementById('ingresos')
const egresosDiv = document.getElementById('egresos')
const porcentajeTotal = document.getElementById('porcentaje')
const listaIngresos = document.getElementById('lista-ingresos')
const listaEgresos = document.getElementById('lista-egresos')
const form = document.getElementById('form')

const cargarApp = () => {

    cargarCabecero()
    CargarIngresos()
    cargarEgresos()
    loadIngresos()
    loadEgresos()

    console.log(totalIngresos());
    console.log(ingresos);
}

let totalIngresos = () => {
    let totalIngreso = 0
    for (let ingreso of ingresos) {
        totalIngreso += ingreso.valor
    }
    return totalIngreso
}

let totalEgresos = () => {
    let totalEgreso = 0
    for (let egreso of egresos) {
        totalEgreso += egreso.valor
    }
    return totalEgreso
}

let cargarCabecero = () => {

    let presupuesto = totalIngresos() - totalEgresos()
    let porcentaje = ((totalEgresos() / totalIngresos()) * 100).toFixed(2)

    presupuestoTotal.innerHTML = formatCurrency(presupuesto)
    porcentajeTotal.innerHTML = `${porcentaje}%`
    ingresosDiv.innerHTML = formatCurrency(totalIngresos())
    egresosDiv.innerHTML = formatCurrency(totalEgresos())
}

const formatCurrency = (valor) => {
    return valor.toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 })
}

const CargarIngresos = () => {
    let ingresosHTML = ``

    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso)
    }

    listaIngresos.innerHTML = ingresosHTML
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.description}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">+ ${formatCurrency(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
                                <ion-icon name="close-circle-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `

    return ingresoHTML
}

const eliminarIngreso = (id) => {

    let indicEliminar = ingresos.findIndex(ingreso => ingreso.id === id)
    ingresos.splice(indicEliminar, 1)
    cargarCabecero()
    CargarIngresos()
    saveIngresos()

}

const cargarEgresos = () => {
    let egresosHTML = ``

    for (const egreso of egresos) {
        egresosHTML += crearEgresosHTML(egreso)
    }

    listaEgresos.innerHTML = egresosHTML
}

const crearEgresosHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.description}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">-${egreso.valor}</div>
                        <div class="elemento_porcentaje">${((egreso.valor/totalIngresos()) * 100).toFixed(0)}%</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
                                <ion-icon name="close-circle-outline"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `

    return egresoHTML
}

const eliminarEgreso = (id) => {
    const eliminarId = egresos.findIndex(egreso => egreso.id === id)
    egresos.splice(eliminarId, 1)
    cargarCabecero()
    cargarEgresos()
    saveEgresos()
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    agregarDato()
})

const agregarDato = () => {
    let tipo = form[0].value
    let description = form[1].value
    let valor = form[2].value
    if (description !== '' && valor !== '') {
        if (tipo === 'ingreso') {
            ingresos.push(new Ingreso(description, +valor))
            cargarCabecero()
            CargarIngresos()
            saveIngresos()

        } else if (tipo === 'egreso') {
            egresos.push(new Egreso(description, +valor))
            cargarCabecero()
            cargarEgresos()
            saveEgresos()
        }
    }

}

const saveIngresos = () => {
        localStorage.setItem('ingresos', JSON.stringify(ingresos))
}

const loadIngresos = () => {

    const lsIngresos = JSON.parse(localStorage.getItem('ingresos'))

    if (lsIngresos !== null) {

        for (const lsIngreso of lsIngresos) {
            
            ingresos.push(new Ingreso(lsIngreso._description, +lsIngreso._valor))

        }
        cargarCabecero()
        CargarIngresos()
    }

}

const saveEgresos = () => {
    localStorage.setItem('egresos', JSON.stringify(egresos))
}

const loadEgresos = () => {

    const lsEgresos = JSON.parse(localStorage.getItem('egresos'))

    if (lsEgresos !== null) {

        for (const lsEgreso of lsEgresos) {
            
            egresos.push(new Egreso(lsEgreso._description, +lsEgreso._valor))

        }
        cargarCabecero()
        cargarEgresos()
    }

}
