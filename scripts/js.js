
usuario.focus();
momentoCero();

const ug = localStorage.getItem("Usuario");
const cg = localStorage.getItem("Contraseña")
console.log("Este es el usuario logueado", ug);
console.log("Este es el mail logueado", cg);


ug == null
  ? Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Para una mejor experiencia ingresa nombre y mail",
    showConfirmButton: false,
    timer: 2500,
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



//Filtrado de articulos

const seleccion = document.getElementById("categorias");
seleccion.addEventListener("change", () => {
  gridElementos.innerHTML = null;
  fetch("assets/json/elementos.json")
    .then((r) => r.json())
    .then((data) => {
      const porCat = data.filter((e) => e.categoria == seleccion.value);

      if (seleccion.value == "todas") {
        momentoCero()
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
     <p class="card-text"><strong>${e.donde}</strong><i> (${e.categoria})</i></p>
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
  prueba.innerHTML = null;
  carouselExampleIndicators.innerHTML = null;
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
              <h5 id="precioSeleccionado" class="card-text text-danger">Precio en U$S: ${e.precio}</h5>
              <a href="#solofaltaunpaso" class="btn btn-warning mt-1" onclick="compra(this)">¡Comprar!</a>
              <a href="" id="1" class="pepe btn btn-danger mt-1" onclick="momentoCero()">Buscar otra </a>
            </div>
          </div>
        </div>
      </div>
`;
        container.appendChild(gridEl);
        localStorage.setItem("uprecio", e.precio);
      });
    });
};


function compra(btn) {
  const ultimoPrecio = parseInt(localStorage.getItem("uprecio")).toFixed(2)
  const ultimoPrecio2cuotas = (parseInt(localStorage.getItem("uprecio")) / 2).toFixed(2)
  const ultimoPrecio3cuotas = (parseInt(localStorage.getItem("uprecio")) / 3).toFixed(2)

  console.log(ultimoPrecio + 2);
  datosproducto.innerHTML = null
  datosproducto.innerHTML = `
    <div class="col-md-12">
              <div class="card-body">
                <h2 id="solofaltaunpaso" class="card-title text-danger display-6">¡Solo falta un paso!</h2>
                <p class="card-text lead">Completa tus datos para finalizar la compra</p>
                <form>
                <div class="form-floating mt-2">
                  <input type="text" class="form-control" id="usuariockout" required>
                  <label for="floatingInput">Nombre</label>
                </div>
                <div class="form-floating mt-2">
                  <input type="email" class="form-control" id="mailckout" required>
                  <label for="floatingPassword">E-mail</label>
                </div>
               

                  <select class="form-select mt-2" aria-label="Default select example" required>
  <option selected>Seleccione las cuotas a pagar</option>
  <option value="1">Una cuota de U$S ${ultimoPrecio}</option>
  <option value="2">Dos cuotas de U$S ${ultimoPrecio2cuotas}</option>
    <option value="3">Tres cuotas de U$S ${ultimoPrecio3cuotas}</option>
</select>
        </form>


                   <a href="#experiencia" class="btn btn-warning mt-2" onclick="finaizarcompra(this)" >¡Finalizar Compra!</a>
                <a href="" class="btn btn-danger mt-2" onclick="momentoCero(this)" >Buscar otra</a>
                </div>
            
                </div>
               


              </div >`
  usuariockout.value = usuarioGuardado
  mailckout.value = contraGuardada

}

function finaizarcompra(btn) {
  usuariockout.value = usuarioGuardado
  mailckout.value = contraGuardada
  datosproducto.innerHTML = null
  datosproducto.innerHTML = `
    <div class="col-md-12">
              <div class="card-body">
                <h2 id="solofaltaunpaso" class="card-title text-danger display-6">¡Gracias por tu compra!</h2>
                <p class="card-text lead">Los datos de la misma se te enviaran por mail a tu casilla</p>
                                <a href="" class="btn btn-warning mt-2" onclick="momentoCero()" >Seguir Comprando😁</a>

               </div>
              </div >`
}



function momentoCero() {

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


     <p class="card-text"><strong>${e.donde}</strong><i> (${e.categoria})</i></p>

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
};

