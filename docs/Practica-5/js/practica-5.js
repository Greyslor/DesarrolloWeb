let productos = [
    { nombre: "Camiseta", precio: 15, stock: 10 },
    { nombre: "Pantalones", precio: 25, stock: 8 },
    { nombre: "Zapatos", precio: 50, stock: 5 },
    { nombre: "Gorras", precio: 5, stock: 15 },
  ];
  
  let carrito = [];
  
  function agregarAlCarrito(productoNombre, cantidad) {
    for (let producto of productos) {
      if (producto.nombre === productoNombre) {
        if (producto.stock >= cantidad) {
          carrito.push({
            nombre: productoNombre,
            cantidad: cantidad,
            precio: producto.precio,
          });
  
          producto.stock -= cantidad;
          console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
        } else {
          console.error(`No hay suficiente stock de ${productoNombre}`);
        }
        return;
      }
    }
    console.error(`El producto "${productoNombre}" no existe.`);
  }
  
  function eliminarDelCarrito(productoNombre) {
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].nombre === productoNombre) {
        let cantidadEliminada = carrito[i].cantidad;
        carrito.splice(i, 1);
        for (let producto of productos) {
          if (producto.nombre === productoNombre) {
            producto.stock += cantidadEliminada;
            break;
          }
        }
        console.info(`${productoNombre} eliminado del carrito`);
        return;
      }
    }
    console.error(`El producto "${productoNombre}" no está en el carrito.`);
  }
  
  function calcularTotal() {
    let total = 0;
    for (let item of carrito) {
      total += item.precio * item.cantidad;
    }
    return total;
  }
  
  function aplicarDescuento(total) {
    if (total > 100) {
      return total * 0.9;
    }
    return total;
  }
  
  function mostrarCuentaRegresiva(tiempo) {
    let cuentaRegresiva = tiempo;
    let intervalo = setInterval(() => {
      if (cuentaRegresiva > 0) {
        console.log(`Compra confirmada en ${cuentaRegresiva}...`);
        cuentaRegresiva--;
      } else {
        clearInterval(intervalo);
        procesarCompra();
      }
    }, 3000); 
  }
  
  function procesarCompra() {
    console.log("Procesando compra...");
    setTimeout(function () {
      let total = calcularTotal();
      total = aplicarDescuento(total);
      console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
    }, 3000);
  }
  
  agregarAlCarrito("Pantalones", 3);
  agregarAlCarrito("Zapatos", 2);
  agregarAlCarrito("Gorras", 3);
  console.log(carrito);
  
  eliminarDelCarrito("Gorras");
  console.log(carrito);
  
  mostrarCuentaRegresiva(3);
  