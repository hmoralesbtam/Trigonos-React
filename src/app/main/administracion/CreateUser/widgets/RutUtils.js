
export var removeSeparators = function (rut) {
   if (!rut) {
       return "";
   }
   // Removemos cualquier carácter que no sea dígito o la letra K.
   // Luego elimina cualquier instancia extra de la letra K
   // (solo puede haber una al final de un RUT, si es que ese es su DV)
   return rut.replace(/[^0-9kK]/g, "").replace(/[kK]{1,}$/, "K");
};
/**
* Le da formato a un RUT, incluyendo separadores de miles. Adecuado para presentación.
*
* Por ejemplo, "444444444" o "44444444-4" se convierte en "44.444.444-4".
* @param rut RUT a formatear
* @returns El mismo RUT con formato XX.XXX.XXX-X
*/
export var prettifyRut = function (rut) {
   if (!rut) {
       return "";
   }
   var cleanRut = removeSeparators(rut);
   // Tenemos una K que no esté al final del RUT?
   if (cleanRut.slice(0, -1).toUpperCase().includes("K")) {
       return "";
   }
   // Separamos el RUT de su DV
   var dv = cleanRut.charAt(cleanRut.length - 1).toUpperCase();
   var rutWithoutDv = cleanRut.slice(0, -1).replace(/^0+/, "");
   var formattedRut = rutWithoutDv
       .toString()
       .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   // Si hay un sólo dígito de momento, lo dejamos con formato 0-X
   // para que se vea más presentable mientras el usuario tipea el resto
   if (formattedRut === "") {
       return "0-" + dv;
   }
   return formattedRut + "-" + dv;
};
/**
* Le da formato a un RUT, sin incluir separadores de miles. Adecuado para uso interndo de un programa.
*
* Por ejemplo, "444444444" o "44444444-4" se convierte en "44444444-4".
* @param rut RUT a formatear
* @returns El mismo RUT con formato XXXXXXXX-X
*/
export var formatRut = function (rut) {
   if (!rut) {
       return "";
   }
   var cleanRut = removeSeparators(rut);
   // Tenemos una K que no esté al final del RUT?
   if (cleanRut.slice(0, -1).toUpperCase().includes("K")) {
       return "";
   }
   // Separamos el RUT de su DV
   var dv = cleanRut.charAt(cleanRut.length - 1).toUpperCase();
   var rutWithoutDv = cleanRut.slice(0, -1).replace(/^0+/, "");
   // Si hay un sólo dígito de momento, lo dejamos con formato 0-X
   // para que se vea más presentable mientras el usuario tipea el resto
   if (rutWithoutDv === "") {
       return "0-" + dv;
   }
   return rutWithoutDv + "-" + dv;
};
/**
* Calcula el dígito verificador (DV) de un RUT.
* @param rut Rut a calcular
* @returns Su dígito verificador
*/
export var calculateDv = function (rut) {
   var rutArr = Math.abs(rut).toString().split("");
   var digits = rutArr.map(function (digit) { return parseInt(digit, 10); }).reverse();
   var sum = digits.reduce(function (acc, digit, idx) {
       var weightedDigit = digit * ((idx % 6) + 2);
       return acc + weightedDigit;
   }, 0);
   var modulo = 11 - (sum % 11);
   if (modulo === 11) {
       return "0";
   }
   else if (modulo === 10) {
       return "K";
   }
   else {
       return modulo.toString();
   }
};
/**
* Comprueba si el dígito verificador de un RUT (con o sin formato) es válido.
* @param rut RUT a comprobar
* @returns Si el RUT tiene un dígito verificador válido
*/
export var checkRut = function (rut) {
   if (!rut) {
       return false;
   }
   // Limpiamos el RUT de caracteres innecesarios
   var cleanRut = removeSeparators(rut);
   // Un RUT debiera tener como mínimo tres caracteres (X-X)
   if (cleanRut.length < 2) {
       return false;
   }
   var rutWithoutDv = parseInt(cleanRut.slice(0, -1));
   var dv = cleanRut.charAt(cleanRut.length - 1).toUpperCase();
   return calculateDv(rutWithoutDv) === dv;};