
(async () => {
    const { value: email } = await Swal.fire({
    title: "Por favor, ingrese su email",
    input: "email",
    inputLabel: "Tu email es:",
    inputPlaceholder: "ejemplo@mail.com"
    });
    if (email) {
    Swal.fire(`Email ingresado: ${email}`);
    }
})()


const Prod = function(img, id, descripcion, precio){
    this.img = img
    this.id = id
    this.descripcion = descripcion
    this.precio = precio
}

// let prod1 = new Prod ("./img/termo-stanley.jpg", "termo-1","Termo Stanley", 15000)
// let prod2 = new Prod ("./img/termo-acero.jpg", "termo-2", "Termo Acero Inox", 7000)
// let prod3 = new Prod ("./img/mate-imperial.png", "mate-1","Mate Imperial", 10000)
// let prod4 = new Prod ("./img/mate-camionero.jpg", "mate-2", "Mate Camionero", 6000)
// let prod5 = new Prod ("./img/mate-personalizado.webp", "mate-3", "Mate Personalizado", 10000)

let catalogo = []

fetch('productos.json')
    .then(response => response.json())
    .then(data => {
    catalogo = data.map(prod => new Prod(prod.img, prod.id, prod.descripcion, prod.precio));
    console.log(catalogo);
    mostrarProductos(catalogo);
    })
    .catch(error => console.error('Error al cargar los productos:', error));


const contenedor = document.querySelector(".productos")
let botonesAgregar = document.querySelectorAll(".agregarProd")
let botonesEliminar = document.querySelectorAll(".eliminar")
const numero = document.querySelector(".numero")
const total = document.querySelector(".total")

function mostrarProductos(productos){
    console.log('Mostrando productos:', productos);
    contenedor.innerHTML = ""
    if(productos.length === 0){
        contenedor.innerHTML = '<p class="contenedorVacio">No se encontraron coincidencias</p>'
    } else{
        productos.forEach((prod)=>{
            const div = document.createElement("div");
            div.classList.add("cartaProd");

            div.innerHTML = `
            <img class = "imagenProd" src ="${prod.img}" alt= "${prod.descripcion}"
            <div class = "detallesProd">
                <h3 class="tituloProd">${prod.descripcion}</h3>
                <p class="precioProd">$${prod.precio}</p>
                <button class="agregarProd" id="${prod.id}">Agregar al carrito</button>
            </div>
            `
            contenedor.appendChild(div);
        },
        );
        }
        actualizarBotonesAgregar()
    }


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".agregarProd");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click",agregar);
    })
}

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click",eliminar);
    })
}

const productosCarrito = [];


function agregar(e){
    const idBoton = e.currentTarget.id
    const agregado = catalogo.find(prod => prod.id === idBoton)
    
    if(productosCarrito.some(prod => prod.id === idBoton)){
        const index = productosCarrito.findIndex(prod => prod.id === idBoton);
        productosCarrito[index].cantidad++
    } else {
        agregado.cantidad = 1
        productosCarrito.push(agregado)
    }
    actualizarNumero()
    mostrarCarrito()
}



function eliminar(e){
    const idBoton = e.currentTarget.id
    const index = productosCarrito.findIndex(prod => prod.id === idBoton);

    productosCarrito.splice(index, 1)

    mostrarCarrito()
    actualizarNumero()
}



function actualizarNumero(){
    let nuevoNumero = productosCarrito.length
    numero.innerHTML = nuevoNumero
}

const carritoProductos = document.querySelector(".carritoProductos")



function mostrarCarrito(){
    carritoProductos.innerHTML = ""
    if(productosCarrito.length === 0){
        carritoProductos.innerHTML = `
        <p>El carrito esta vacío</p>`
    } else {
        productosCarrito.forEach(prod => {

        const divCarrito = document.createElement("div")
        divCarrito.classList.add("prodCarrito")
        divCarrito.innerHTML = `
                <img class = "imagenProdCarrito" src ="${prod.img}" alt= "${prod.descripcion}"/>
                <div class = "descripcionProdCarrito">
                <h3 class="tituloProdCarrito">${prod.descripcion}</h3>
                <div class = "cantidadProdCarrito">
                    <p>Cantidad: ${prod.cantidad}</p>
                </div>
                <div class = "precioProdCarrito">
                    <p>$${prod.precio}</p>
                </div>
                <div class="subtotal">
                    <h3>Subtotal:</h3>
                    <p>$${prod.precio * prod.cantidad}</p>
                </div>
                <button class="eliminar" id="${prod.id}">Eliminar</button>
            `;
            carritoProductos.appendChild(divCarrito)
            });
    }
    actualizarBotonesEliminar()
    actualizarTotal()
} 

function actualizarTotal(){
    const resultadoTotal = productosCarrito.reduce((acc,prod) => acc + (prod.precio * prod.cantidad), 0)
    total.innerHTML = 
    `
    <p>$${resultadoTotal}</p>
    `
}



const botonComprar = document.querySelector(".botonComprar")

botonComprar.addEventListener("click", comprar)
function comprar(){
    productosCarrito.length === 0 ? Swal.fire({
        icon: "error",
        title: "Lo sentimos, no pudimos realizar su compra",
        text: "El carrito está vacío"
    }) : 
    
    Swal.fire({
        title: "Felicitaciones!",
        text: "Su compra ha sido finalizada, te estaremos contactando.",
        icon: "success"
    });
    productosCarrito.length = 0
    mostrarCarrito()
    actualizarNumero()
}

const localidades = document.querySelector(".localidades")



let form = document.querySelector("#formulario")
form.addEventListener("submit", function (e){
    e.preventDefault()
    let valor = document.querySelector("#text").value.toString();
    busqueda = valor.trim().toUpperCase()
    const filtrado = catalogo.filter((prod)=>prod.descripcion.toUpperCase().includes(busqueda))
    localStorage.setItem("resultadosBusqueda", JSON.stringify(filtrado));
    mostrarProductos(filtrado)
}) 

const resultadosGuardados = localStorage.getItem("resultadosBusqueda");
if (resultadosGuardados) {
const resultadosParseados = JSON.parse(resultadosGuardados);
mostrarProductos(resultadosParseados);
}

mostrarProductos(catalogo);

