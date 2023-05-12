"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

console.log("🟢 Connected!");

var ingredientesDOM = document.querySelector("#ingredientes");
var ingredientesSeleccionados = document.querySelector("#ingredientesSeleccionados");
var ingredientesExtrasSeleccionados = document.querySelector("#ingredientesExtrasSeleccionados");
var extrasPrecio = document.querySelector("#extrasPrecio");

var formPropina = document.querySelector("#formPropina");
var propinaInput = document.querySelector("#propina");
var propinaPrecio = document.querySelector("#propinaPrecio");

var listadoIngredientes = ["Carne", "Pollo", "Tocino", "Mozzarella", "Champiñón", "Cebolla", "Piña", "Pimentón"];

var resumenPedido = {
  carrito: {
    producto: "Pizza XL",
    precio: 15000
  },
  ingredientes: [],
  ingredientesExtras: [],
  propina: 0,
  totalCompra: function totalCompra() {
    return this.carrito.precio + this.ingredientesExtras.length * 880 + this.propina;
  }
};

var ingredientesHTML = "";

listadoIngredientes.forEach(function (ingrediente) {
  ingredientesHTML += "<li>\n  <input type=\"checkbox\" \n  name=\"" + ingrediente.toLowerCase() + "\" \n  id=\"" + ingrediente.toLowerCase() + "\" \n  value=\"" + ingrediente + "\" \n  onclick=\"manejarIngrediente(" + ingrediente.toLowerCase() + ")\"/>\n\n  <label for=\"" + ingrediente.toLowerCase() + "\">" + ingrediente + "</label>\n</li>";
});
ingredientesDOM.innerHTML = ingredientesHTML;

var formatearCLP = function formatearCLP(cantidad) {
  var CLP = Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  });

  return CLP.format(cantidad);
};

var analizarIngredientes = function analizarIngredientes(ingrediente1, ingrediente2, ingrediente3) {
  for (var _len = arguments.length, extras = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    extras[_key - 3] = arguments[_key];
  }

  resumenPedido.ingredientesExtras = extras;
};

var manejarIngrediente = function manejarIngrediente(ingrediente) {
  var index = resumenPedido.ingredientes.findIndex(function (item) {
    return item === ingrediente.value;
  });

  if (index === -1) {
    resumenPedido.ingredientes.push(ingrediente.value);
  } else {
    resumenPedido.ingredientes.splice(index, 1);
  }

  analizarIngredientes.apply(undefined, _toConsumableArray(resumenPedido.ingredientes));

  ingredientesSeleccionados.textContent = resumenPedido.ingredientes.join(", ");
  ingredientesExtrasSeleccionados.textContent = resumenPedido.ingredientesExtras.join(", ");

  if (resumenPedido.ingredientesExtras.length) {
    extrasPrecio.textContent = formatearCLP(resumenPedido.ingredientesExtras.length * 800);
  } else {
    extrasPrecio.textContent = "";
  }
};

//PROPINA
var obtenerPropina = function obtenerPropina() {
  var monto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

  resumenPedido.propina = monto;
  propinaInput.value = monto;
  propinaPrecio.textContent = formatearCLP(monto);
};

propinaInput.addEventListener("click", function (e) {
  if (!e.target.value.trim()) {
    obtenerPropina();
  } else {
    obtenerPropina(Number(e.target.value));
  }
});

propinaInput.addEventListener("change", function (e) {
  if (!e.target.value.trim()) {
    obtenerPropina();
  } else {
    obtenerPropina(Number(e.target.value));
  }
});

formPropina.addEventListener("submit", function (e) {
  e.preventDefault();

  if (resumenPedido.propina) {
    alert("Su propina de " + formatearCLP(resumenPedido.propina) + " ha sido enviada");
  } else {
    alert("A\xFAn no ha definido una propina");
    propinaInput.focus();
  }
});