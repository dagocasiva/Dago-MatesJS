let nombre = prompt("Ingrese su nombre completo")
    alert("Bienvenido " + nombre)

alert("Cuenta hasta 5 para empezar a comprar")
for (let i = 0; i<=5; i++){
    alert(i)
}

function comprar(prod,cant,envio) {
    prod = prompt("Ingrese el precio de su producto")
    cant = prompt("Ingrese la cantidad que desea comprar")
    envio = prompt("Ingrese su localidad para realizar el envio")

        switch (envio){
            case "cordoba":
                envio = 1500
            break;
            case "bsas":
                envio = 3000
            break;
            case "catamarca":
                envio = 3500
            break;
            default:
                alert("No está disponible el envio en su zona")
        }
        let resultado = prod * cant + envio
        alert("Su coste total es de " + resultado)
    }

comprar()