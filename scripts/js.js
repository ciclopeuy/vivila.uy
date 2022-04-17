usuario.focus();

const ug = localStorage.getItem("Usuario");
console.log(ug);

ug == null
  ? Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Recuerda ingresar usuario y contraseña",
    showConfirmButton: false,
    timer: 1200,
  })
  : Toastify({
    text: `¡Que bueno tenerte 😀!`,
    duration: 1000,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();

//local Storage

const botonIngresar = document.getElementById("ingresar");
botonIngresar.addEventListener("click", () => {
  localStorage.setItem("Usuario", usuario.value);
  localStorage.setItem("Contraseña", contra.value);
  Toastify({
    text: `¡Hola ${usuario.value}✋`,
    duration: 1000,
    gravity: "top", // `top` or `bottom`
    position: "rigth", // `left`, `center` or `right`
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});

const dataUsuarios = [{ Usuario: usuario.value, contra: usuario.value }];

const usuarioGuardado = localStorage.getItem("Usuario");
const contraGuardada = localStorage.getItem("Contraseña");
usuario.value = usuarioGuardado;
contra.value = contraGuardada;

const botonSoyOtro = document.getElementById("norecordar");
botonSoyOtro.addEventListener("click", () => {
  localStorage.clear();
  usuario.value = "";
  contra.value = "";
  usuario.focus();
});

//Fetch

fetch("assets/json/elementos.json")
  .then((r) => r.json())
  .then((data) => {
    console.log("mi arreglo es este", data);
    data.forEach((e) => {
      console.log(e.nombre);
      const container = document.getElementById("gridElementos");
      const gridEl = document.createElement("div");
      gridEl.innerHTML = `
<div class="container-fluid m-1 p-1">
<ul class="nav justify-content-center">
 <div class="card" style="width: 18rem;">
   <img src=${e.foto} class="card-img-top" alt="...">
   <div class="card-body">
     <h4 class="card-title text-danger display-6">${e.nombre}</h4>
     <p class="card-text lead">${e.donde}  </p>
     <p class="card-text">${e.incluye}</p>
     <p class="card-price lead text-danger">Valor del paquete: U$S ${e.precio} </p>
           <a href="#eleccion">
            <button id="${e.id}" class="btn btn-warning mt-1" onclick="getId(this)">¡Lo Quiero!</button>
           </a>

   </div>
 </div>
`;
      container.appendChild(gridEl);
    });
  });

//Filtrado de articulos

const seleccion = document.getElementById("categorias");
seleccion.addEventListener("change", () => {
  gridElementos.innerHTML = null;
  fetch("assets/json/elementos.json")
    .then((r) => r.json())
    .then((data) => {
      const porCat = data.filter((e) => e.categoria == seleccion.value);

      if (seleccion.value == "todas") {
        data.forEach((e) => {
          console.log(e.nombre);
          const container = document.getElementById("gridElementos");
          const gridEl = document.createElement("div");
          gridEl.innerHTML = `
<div class="container-fluid m-1 p-1">
<ul class="nav justify-content-center">
<div class="card" style="width: 18rem;">
<img src=${e.foto} class="card-img-top" alt="...">
<div class="card-body">
<h4 class="card-title text-danger display-6">${e.nombre}</h4>
<p class="card-text lead">${e.donde}  </p>
<p class="card-text">${e.incluye}</p>
<p class="card-price lead text-danger">Valor del paquete: U$S ${e.precio} </p>
   <a href="#eleccion">
            <button id="${e.id}" class="btn btn-warning mt-1" onclick="getId(this)">¡Lo Quiero!</button>
           </a>
</div>
</div>
`;
          container.appendChild(gridEl);
        });
      }

      console.log("Filtrar por categoria: ", porCat);
      porCat.forEach((e) => {
        const container = document.getElementById("gridElementos");
        const gridEl = document.createElement("div");
        gridEl.innerHTML = `
<div class="container-fluid m-1 p-1">
<ul class="nav justify-content-center">
<div class="card" style="width: 18rem;">
<img src=${e.foto} class="card-img-top" alt="...">
<div class="card-body">
<h4 class="card-title text-danger display-6">${e.nombre}</h4>
<p class="card-text lead">${e.donde}  </p>
<p class="card-text">${e.incluye}</p>
<p class="card-price lead text-danger">Valor del paquete: U$S ${e.precio} </p>
   <a href="#eleccion">
            <button id="${e.id}" class="btn btn-warning mt-1" onclick="getId(this)">¡Lo Quiero!</button>
           </a>
</div>
</div>
`;
        container.appendChild(gridEl);
      });
    });
});


//Mostrar elemento seleccionado


function getId(btn) {
  fetch("assets/json/elementos.json")
    .then((r) => r.json())
    .then((data) => {
      const porCat = data.filter((e) => e.id == btn.id);
      console.log("Filtrar por categoria: ", porCat);
      porCat.forEach((e) => {
        const container = document.getElementById("gridEleccion");
        const gridEl = document.createElement("div");
        gridEleccion.innerHTML = null;
        gridEl.innerHTML = `
            <div id="contenedor2">
  <div class="container-fluid p-1" id="elementoselec">
    <h2 id="eleccion" class="text-center p-2 bg-warning display-5">¡GRAN ELECCION!</h2>
    </div>
<<div class="card m-3">
        <div class="row g-0">
          <div class="col-md-6">
            <img src=${e.foto} class="img-fluid rounded-start" alt="...">
          </div>
          <div id="datosproducto" class="col-md-6">
            <div class="card-body">
              <h2 class="card-title text-danger display-6">${e.nombre}</h2>
              <h5 class="card-text">Incluye:</h5>
              <p class="card-text lead">${e.incluye}</p>
              <h5 class="card-text">Válido hasta:</h5>
              <p class="card-text lead">${e.fechavenc}</p>
              <h5 class="card-text text-danger">Precio en U$S: ${e.precio}</h5>
              <a href="#solofaltaunpaso" class="btn btn-warning mt-1" onclick="compra(this)">¡Comprar!</a>
              <a href="#experiencia" id="1" class="pepe btn btn-danger mt-1" onclick="borrarcontenido()">Buscar otra </a>
            </div>
          </div>
        </div>
      </div>
`;
        container.appendChild(gridEl);
      });
    });
};


function compra(btn) {
  datosproducto.innerHTML = null
  datosproducto.innerHTML = `
    <div class="col-md-12">
              <div class="card-body">
                <h2 id="solofaltaunpaso" class="card-title text-danger display-6">Solo falta un paso</h2>
                <p class="card-text lead">Completa tus datos para finalizar la compra</p>
                <div class="form-floating mt-2">
                  <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com">
                  <label for="floatingInput">Nombre</label>
                </div>
                <div class="form-floating mt-2">
                  <input type="email" class="form-control" id="floatingPassword" placeholder="nombre@mail.com">
                  <label for="floatingPassword">E-mail</label>
                </div>
                <div class="form-floating mt-2">
                  <select class="form-select" aria-label="Default select example >
                          <option value="">Un pago de U$S 160</option>
                    <option value="">Un pago de U$S 160</option>
                    <option value="">Dos cuotas de U$S 80</option>
                    <option value="">Tres cuotas de U$S 53 </option>
                  </select>
                  <label for="floatingPassword">Cuotas</label>
                </div>
                <a href="#" class="btn btn-danger mt-2">Finalizar Compra!</a>
              </div >`
}

// function borrarcontenido() {
//   alert("anda esta mierda?")
//   contenedor2.innerHTML = null;
// }

