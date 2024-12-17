let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.getElementById("carritoVacio");
const contenedorCarritoProductos = document.getElementById("carritoProductos");
const contenedorCarritoOpciones = document.getElementById("carritoOpciones");
const contenedorCarritoComprado = document.getElementById("carritoComprado");
let botonesEliminar = document.querySelectorAll(".botonEliminar");
const botonVaciar = document.getElementById("botonVaciarCarrito");
const contenedorTotal = document.getElementById("precioTotal");
const botonWhatsApp = document.getElementById("botonCompra");

function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoOpciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("productosCaja");

            div.innerHTML = `
            <div>
                <img src="${producto.imagen}" alt="${producto.titulo}">
            </div>
            <div>
                <p>Titulo</p>
                <p class="bold">${producto.titulo}</p>
            </div>
            <div>
                <p>Cantidad</p>
                <p>${producto.cantidad}</p>
            </div>
            <div>
                <p>Precio</p>
                <p>$${producto.precio}</p>
            </div>
            <div>
                <p>Subtotal</p>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <div>
                <a class="botonEliminar" id="${producto.id}">
                    <i class="tacho bi bi-trash3"></i>
                </a>
            </div>
        `;
            console.log(producto.precio * producto.cantidad);

            contenedorCarritoProductos.append(div);
        })

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoOpciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".botonEliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText = `$${totalCalculado}`;
}

// Agrega el evento click
botonWhatsApp.addEventListener("click", () => {
    const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    if (productosEnCarrito.length === 0) {
        alert("El carrito está vacío. Añade productos antes de enviar el mensaje.");
        return;
    }

    // Construye el mensaje
    let mensaje = "Hola, quiero realizar un pedido:\n\n";
    productosEnCarrito.forEach(producto => {
        mensaje += `• ${producto.titulo} - *Cantidad*: ${producto.cantidad}\n`;
    });

    // URL de WhatsApp
    const numeroWhatsApp = "541164681220"; // Reemplaza con el número deseado
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Redirige al usuario a la URL de WhatsApp
    window.open(urlWhatsApp, "_blank");

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoOpciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
});
