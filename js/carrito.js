/* Utilizamos FETCH para consumir los productos de un JSON */

const contenedorProductos = document.getElementById("contenedorProductos");
const listadoP = "../json/productos.json";
const arrayProductos = [];

fetch(listadoP)
  .then((response) => response.json())
  .then((datos) => {
    datos.forEach((producto) => arrayProductos.push(producto));
    arrayProductos.forEach((productos) => {
      const cards = document.createElement("div");
      cards.classList.add("col-xl-4", "col-md-6", "col-sm-12");
      cards.innerHTML = `
      <div class = "card m-5 shadow-lg bg-body-tertiary rounded" style="width: 18rem;" >
              <img src = "${productos.img}" class = "card-img-top imgProductos">    
              <div class = "card-body cardBody" >
                  <h2 class="card-title"> ${productos.nombre} </h2>
                  <p class="card-text"> $ ${productos.precio} </p>
                  <button class = "btn btn-dark" id = "boton${productos.id}" >Agregar al Carrito</button>
              </div>
          </div>`;

      contenedorProductos.appendChild(cards);

      /* Agregamos al productos al Carrito */
      const boton = document.getElementById(`boton${productos.id}`);
      boton.addEventListener("click", () => {
        agregaAlCarrito(productos.id);
        /* Ver cantidad de productos en el carrito */
        verCarrito.innerText = " " + carrito.length;
      });
    });
  });

//array carrito

let carrito = [];

/* LocalStorage */
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

console.log(arrayProductos);

const agregaAlCarrito = (id) => {
  const productoCarrito = carrito.find((producto) => producto.id === id);
  if (productoCarrito) {
    productoCarrito.cantidad++;
  } else {
    const producto = arrayProductos.find((producto) => producto.id === id);
    carrito.push(producto);
  }
  /* Verificamos */
  console.log(carrito);

  /* TOTAL */
  calcularTotal();

  /* LocalStorage */
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//mostrar carrito

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

/* Evento Click para la const verCarrito */
verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

/* Mostrar Carrito */
const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((productos) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class = "card m-2">
          <div class = "row g-0">
            <div class = "col-md-4">
            <img src = "${productos.img}" class = "img-fluid rounded-start"> 
            </div>
            <div class = "col-md-8">
              <div class = "card-body cardBody">
                <h2 class="fw-bold fs-2"> ${productos.nombre} </h2>
                <p class="fw-bold fs-6"> $ ${productos.precio} </p>
                <div class="container col-12 d-flex justify-content-center m-3">
                <input class="p-1 w-25 text-center" type="text" id="inputNumber" name="cantidad" min="1" max="10" value="${productos.cantidad}">
                <button class="btn btn-primary m-1 fw-bold" id="sumar${productos.id}" style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .30rem; --bs-btn-font-size: .75rem;">+</button>
                <button class="btn btn-danger m-1 fw-bold" id="restar${productos.id}"style="--bs-btn-padding-y: .20rem; --bs-btn-padding-x: .30rem; --bs-btn-font-size: .75rem;">-</button>
                </div>
                <button class = "btn btn-dark" id ="eliminar${productos.id}" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: 5rem; --bs-btn-font-size: .75rem;">Eliminar</button>
              </div>
            </div>   
          </div>
        </div>`;

    contenedorCarrito.appendChild(card);

    const btnRestar = document.getElementById(`restar${productos.id}`);
    const btnSumar = document.getElementById(`sumar${productos.id}`);
    btnRestar.addEventListener("click", () => {
      btnRestarAccion(productos.id);
    });
    btnSumar.addEventListener("click", () => {
      btnSumarAccion(productos.id);
    });

    /* Eliminar Productos del Carrito */
    const bontonE = document.getElementById(`eliminar${productos.id}`);
    bontonE.addEventListener("click", () => {
      eliminarProductoCarrito(productos.id);
    });
  });
  /* Ver cantidad de productos en el carrito */
  verCarrito.innerText = " " + carrito.length;
  /* TOTAL */
  calcularTotal();
};

/* Btn Restar Cantidad*/
const btnRestarAccion = (id) => {
  const productos = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(productos);
  productos.cantidad--;
  if (productos.cantidad === 0) {
    carrito.splice(indice, 1);
    productos.cantidad++;
  }
  mostrarCarrito();
};

/* Btn sumar Cantidad*/
const btnSumarAccion = (id) => {
  const productos = carrito.find((producto) => producto.id === id);
  productos.cantidad++;
  mostrarCarrito();
};

/* Funcion P/ eliminar productos del carrito */
const eliminarProductoCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  mostrarCarrito();

  /* LocalStorage */
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

/* Vaciar Carrito */

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  vaciarCarriño();
  verCarrito.innerText = " 0";
});

const vaciarCarriño = () => {
  carrito = [];
  mostrarCarrito();

  /* LocalStorage */
  localStorage.clear();
};

/* Total de la Compra */

const precioTotal = document.getElementById("precioTotal");

const calcularTotal = () => {
  let contador = 0;
  carrito.forEach((producto) => {
    contador += producto.precio * producto.cantidad;
  });
  precioTotal.innerHTML = `$ ${contador}`;
};
