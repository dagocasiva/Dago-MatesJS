// // Bienvenida
// let nombre = prompt("Ingrese su nombre completo")
//     alert("Bienvenido " + nombre)
// // Bucle
// alert("Cuenta hasta 3 para empezar a comprar")
// for (let i = 1; i<=3; i++){
//     alert(i)
// }


// Funcion Constructora
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

function mostrarProductos(productos){
    let contenedor = document.querySelector(".saraza")
    contenedor.innerHTML = ""
    if(productos.length === 0){
        contenedor.innerHTML = "<p>No se encontraron coincidencias</p>"
    } else{
        const lista = document.createElement("ul")
        productos.forEach((prod)=>{
            const li = document.createElement("li")
            li.innerHTML = `<h3> Codigo: ${prod.codigo}</h3>
                            <p>  Producto: ${prod.descripcion}</p>
                            <b> $ ${prod.precio}</b>`;
            lista.appendChild(li)
        })
        contenedor.appendChild(lista)
        localStorage.setItem("resultadosBusqueda", JSON.stringify(productos));
        }
    }

let form = document.querySelector("#formulario")
form.addEventListener("submit", function (e){
    e.preventDefault()
    let valor = document.querySelector("#text").value.toString();
    busqueda = valor.trim().toUpperCase()
    const filtrado = catalogo.filter((prod)=>prod.descripcion.toUpperCase().includes(busqueda))
    mostrarProductos(filtrado)
}) 

const resultadosGuardados = localStorage.getItem("resultadosBusqueda");
if (resultadosGuardados) {
const resultadosParseados = JSON.parse(resultadosGuardados);
mostrarProductos(resultadosParseados);
}





// SEGUNDA PREENTREGA

// const localidades = [
//     {provincia: "cordoba", envio: 1500},
//     {provincia: "catamarca", envio: 3500},
//     {provincia: "bsas", envio: 3000}
// ]


// const valorPrecio = () => {
//     let inputCodigo = document.querySelector(".codigo")
//     const inputNumero = inputCodigo.value
//     const codigoIngresado = parseInt(inputNumero)
//     console.log(codigoIngresado)
//     let codigosDeCatalogo = catalogo.map( (producto) => producto.codigo )
//     let loIncluye = codigosDeCatalogo.includes(codigoIngresado)

//     if (loIncluye) {
//         let prod = catalogo.find( (producto) => producto.codigo == codigoIngresado )
//         return prod.precio
//     } else {
//         return 0
//     }
// }

// const valorEnvio = () => {
//     let prov = document.querySelector(".lugar").value.toString()
//     let provincias = localidades.map( (localidad) => localidad.provincia)
//     let laIncluye = provincias.includes(prov)

//     if (laIncluye) {
//         let lugar = localidades.find( (localidad) => localidad.provincia == prov )
//         return lugar.envio
//     } else {
//         return 0
//     }
// }

// const comprar = () => {
//     let subtotal = valorPrecio()

//     if (subtotal) {
//         let cantidad = document.querySelector(".cant")
//         let envio = valorEnvio()
//         resultado = subtotal + envio * cantidad
//         return resultado
//     } else {
//         alert("El codigo ingresado del producto que buscas no existe")
//     }
// // }


// // let formCompra = document.querySelector("#compra")
// // formCompra.addEventListener("submit", function (e){
// //     e.preventDefault()
// //     comprar()
// // })
