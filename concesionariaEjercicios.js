var autos = require('./autosConcesionaria');

const concesionaria = {
  autos: autos,

  buscarAuto: function (patente) {
    for (let i = 0; i < this.autos.length; i++) {
      if (this.autos[i].patente === patente) {
        return this.autos[i]
      }
    }
    return null;
  },

  venderAuto: function (patente) {
    let auto = this.buscarAuto(patente);
    if (auto) auto.vendido = true;
  },

  autosParaLaVenta: function () {
    return autos.filter(auto => auto.vendido === false);
  },

  autosNuevos: function () {
    this.autosParaLaVenta()
    return autos.filter(auto => auto.km < 100 && auto.vendido == false);
  },

  listaDeVentas: function () {
    let autosVendidos = autos.filter(auto => auto.vendido);
    return autosVendidos.map(auto => auto.precio)
  },

  totalDeVentas: function () {
    return this.listaDeVentas().reduce((acumulador, precio) => acumulador + precio, 0)
  },
  /*
  se agrega una funcionalidad muy importante: la de verificar si una persona puede comprar o no un auto.  Las personas solo sacan los autos en cuotas y tomando dos factores como condición de compra. Una es el costo total: si el total de un auto excede lo que la persona considera caro, no va a comprar el auto. Otra condición es su capacidad de pago en cuotas: si la capacidad de pago en cuotas supera al costo de la cuota, va a poder pagarlo. Si ambas condiciones se cumplen, se realiza la compra.
  
  la función puedeComprar que reciba por parámetro un auto y una persona y devuelva true si la misma puede comprar el auto.
  
  persona Ej:
  
  {
  nombre: “Juan”,
  capacidadDePagoEnCuotas: 20000,
  capacidadDePagoTotal: 100000
  } */

  puedeComprar: function (auto, persona) {
    return (persona.capacidadDePagoEnCuotas > (auto.precio / auto.cuotas) && persona.capacidadDePagoTotal > auto.precio)
  },

  /*función autosQuePuedeComprar, que recibe una persona y devuelve la lista de autos que puede comprar.
  
  La función debe de realizar los siguientes pasos:
  
  1) Obtener los autos para la venta
  
  2) Por cada uno de los autos debe de probar si la persona puede comprarlo.
  
  3) Luego debemos retornar los que pueda comprar */
  autosQuePuedeComprar: function (persona) {
    return this.autosParaLaVenta().filter(auto => this.puedeComprar(auto, persona))
  },


};


