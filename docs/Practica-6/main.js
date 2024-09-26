const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $compraLoader = d.querySelector("#compra-loader");
const $carrito = d.querySelector("#carrito");
const carrito = {};

d.addEventListener("click", function (e) {
  if (e.target.matches(".btn-agregar")) {
    const $producto = e.target.closest(".producto");
    agregarProducto($producto);
  } else if (e.target.matches(".btn-quitar")) {
    const $producto = e.target.closest(".producto");
    quitarProducto($producto);
  }
});

function agregarProducto($producto) {
  let id = $producto.getAttribute("data-id");
  let nombre = $producto.getAttribute("data-nombre");
  let precio = parseFloat($producto.getAttribute("data-precio"));

  if (!carrito[id]) {
    carrito[id] = { nombre, precio, cantidad: 1 };
    const $itemCarrito = d.createElement("li");
    $itemCarrito.setAttribute("data-id", id);
    $itemCarrito.innerText = `${nombre} - $${precio} (1)`;
    $listaCarrito.appendChild($itemCarrito);
  } else {
    carrito[id].cantidad++;
    let $itemCarrito = $listaCarrito.querySelector(`[data-id="${id}"]`);
    $itemCarrito.innerText = `${nombre} - $${precio} (${carrito[id].cantidad})`;
  }

  actualizarTotal();
}

function quitarProducto($producto) {
  let id = $producto.getAttribute("data-id");

  if (carrito[id]) {
    carrito[id].cantidad--;

    if (carrito[id].cantidad === 0) {
      delete carrito[id];
      let $itemCarrito = $listaCarrito.querySelector(`[data-id="${id}"]`);
      $itemCarrito.remove();
    } else {
      let $itemCarrito = $listaCarrito.querySelector(`[data-id="${id}"]`);
      $itemCarrito.innerText = `${carrito[id].nombre} - $${carrito[id].precio} (${carrito[id].cantidad})`;
    }

    actualizarTotal();
  }
}

function actualizarTotal() {
  let total = 0;
  for (let id in carrito) {
    total += carrito[id].precio * carrito[id].cantidad;
  }
  $totalCarrito.innerText = total.toFixed(2);
}

$btnCompra.addEventListener("click", function (e) {
  if ($listaCarrito.children.length > 0) {
    $carrito.classList.add("hidden");
    $compraLoader.classList.remove("hidden");

    setTimeout(function () {
      $compraLoader.classList.add("hidden");

      $mensajeCompra.classList.remove("hidden");
    }, 5000);
  } else {
    alert("El carrito está vacío, no se puede realizar la compra.");
  }
});
