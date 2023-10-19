let nombre = prompt("Ingrese su nombre completo")
    alert("Bienvenido " + nombre)

alert("Cuenta hasta 3 para empezar a comprar")
for (let i = 1; i<=3; i++){
    alert(i)
}

const Prod = function(codigo, descripcion, precio){
    this.codigo = codigo
    this.descripcion = descripcion
    this.precio = precio
}

let prod1 = new Prod (1,"Termo Stanley", 15000)
let prod2 = new Prod (2,"Termo Acero Inox", 7000)
let prod3 = new Prod (3,"Mate Imperial", 10000)
let prod4 = new Prod (4,"Mate Camionero", 6000)
let prod5 = new Prod (5,"Mate Personalizado", 10000)

let catalogo = [prod1, prod2, prod3, prod4, prod5]

function filtro(){
    let busqueda = prompt("Ingresa lo que estás buscando").trim().toUpperCase()
    let filtrado = catalogo.filter((prod)=>prod.descripcion.toUpperCase().includes(busqueda))
    if (filtrado.length > 0){
        console.table(filtrado)
    } else {
        alert("Lo sentimos, no se encontraron coincidencias")
    }
}

const localidades = [
    {provincia: "cordoba", envio: 1500},
    {provincia: "catamarca", envio: 3500},
    {provincia: "bsas", envio: 3000}
]

const pedirValor = (peticion) => {
    let txt = prompt(peticion).trim().toLowerCase()
    return txt
}

const valorPrecio = () => {
    let codigoIngresado = parseInt( pedirValor("Ingrese el codigo de su producto") )
    let codigosDeCatalogo = catalogo.map( (producto) => producto.codigo )
    let loIncluye = codigosDeCatalogo.includes(codigoIngresado)

    if (loIncluye) {
        let prod = catalogo.find( (producto) => producto.codigo == codigoIngresado )
        return prod.precio
    } else {
        return 0
    }
} 
const valorEnvio = () => {
    let prov = pedirValor("Ingrese su provincia para realizar el envio")
    let provincias = localidades.map( (localidad) => localidad.provincia)
    let laIncluye = provincias.includes(prov)

    if (laIncluye) {
        let lugar = localidades.find( (localidad) => localidad.provincia == prov )
        return lugar.envio
    } else {
        return 0
    }
}


const comprar = () => {
    let subtotal = valorPrecio()

    if (subtotal) {
        let cantidad = parseInt(pedirValor("Ingrese la cantidad que desea comprar"))
        let envio = valorEnvio()
        // condicion ? true : false
        envio ? alert("su coste total es de " + (subtotal * cantidad + envio)) : alert("No tenemos envío disponible para la localidad ingresada")

    } else {
        alert("El codigo ingresado del producto que buscas no existe")
    }
}




const btn = document.querySelector(".boton")
btn.addEventListener('click', (e) => {
    e.preventDefault()
    comprar()
})
