const contenedorInisiar = document.getElementById("contenedorInisiar");
/* funcion para el contenedor de inisiar */

const mostrarInisio = (userName, password) => {
  const form = document.createElement("div");
  form.classList.add("row", "flex-column");
  form.innerHTML = `
    <h1 class="fw-bold text-center text-white">UrbanFlags</h1>
    <div class="col-12 p-3">
        <label class="form-label text-white">User Name</label>
        <input type="text" id="user"  class="form-control" />
    </div>
    <div class="col-12 p-3">
        <label class="form-label text-white">Password</label>
        <input type="password" id="pass"  class="form-control" />
    </div>
    <div class="col-12 p-3">
        <button class="btn btn-dark m-3" id="btnInisiar">Iniciar Session</button>
        <button class="btn btn-dark m-3" id="btnRegistrarse">Registrarse</button>
    </div>
`;
  contenedorInisiar.appendChild(form);

  const btnInisiar = document.getElementById("btnInisiar");

  btnInisiar.addEventListener("click", () => {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if ((user === userName) & (pass === password)) {
      window.location.href = "html/carrito.html";
    } else {
      /* SWEET ALERT */
      Swal.fire({
        title: "Contraseña o Usuario incorrecto",
        text: "Si no tiene un usuario debe registrarse",
        inputLabel: "intentelo de nuevo",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  });

  /* Mostramos Form de registro si hace click en btn de registrar */
  const btnRegistrarse = document.getElementById("btnRegistrarse");
  btnRegistrarse.addEventListener("click", () => {
    contenedorInisiar.innerHTML = "";
    mostrarRegistro();
  });
};

/* funcion para el contenedor de registro */
const contenedorRegistro = document.getElementById("contenedorRegistro");

const mostrarRegistro = () => {
  const form = document.createElement("div");
  form.classList.add("row", "flex-column");
  form.innerHTML = `
        <h1 class="fw-bold text-center text-white">UrbanFlags</h1>
        <div class="col-12 p-3">
            <label class="form-label text-white">User Name</label>
            <input type="text" id="userName" class="form-control" />
        </div>
        <div class="col-12 p-3">
            <label class="form-label text-white">Password</label>
            <input type="password" id="password" class="form-control" />
        </div>
        <div class="col-12 p-3">
            <label class="form-label text-white">Email</label>
            <input type="email" id="email" class="form-control" />
        </div>
        <div class="col-12 p-3">
            <button class="btn btn-dark m-3" id="btnInisiar">Iniciar Session</button>
            <button class="btn btn-dark m-3" id="btnRegistrarse">Registrarse</button>
        </div>
        <div class="col-12 p-3">
            <p class="validacion" id= "pEmail"></p>
        </div>
    `;

  contenedorRegistro.appendChild(form);

  const btnRegistrarse = document.getElementById("btnRegistrarse");
  const userName = document.getElementById("userName");
  const password = document.getElementById("password");
  const email = document.getElementById("email");
  const pEmail = document.getElementById("pEmail");

  /* guardamos los datos del usuario y validamos form*/
  btnRegistrarse.addEventListener("click", () => {
    let validacion = "";
    let regExpre = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let entrar = false;
    pEmail.innerHTML = "";
    if (userName.value.length < 6) {
      validacion += `El usuario no es valido <br>`;
      entrar = true;
    }
    if (!regExpre.test(email.value)) {
      validacion += `El email no es valido <br>`;
      entrar = true;
    }
    if (password.value.length < 8) {
      validacion += `La contraseña no es valida <br>`;
      entrar = true;
    }
    if (entrar) {
      pEmail.innerHTML = validacion;
    } else {
      contenedorRegistro.innerHTML = "";
      mostrarInisio(userName.value, password.value);
      /* SWEET ALERT */
      Swal.fire({
        title: "Se registró correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }

    /* LocalStorage */
    localStorage.setItem("usuario", userName.value);
    localStorage.setItem("contraseña", password.value);
  });
};

/* Trabajamos con el LocalStorage */

const usuario = localStorage.getItem("usuario");
const contraseña = localStorage.getItem("contraseña");

mostrarInisio(usuario, contraseña);
