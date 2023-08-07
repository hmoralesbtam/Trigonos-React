import { useState } from "react";
import { prettifyRut, removeSeparators, calculateDv } from "./RutUtils";
/**
 * Un _hook_ personalizado que facilita el trabajo con números de RUT.
 *
 * El _hook_ retorna lo siguiente:
 *   - `rut`: Objeto conteniendo:
 *     - `formatted`: Formateado de la forma XX.XXX.XXX-X
 *     - `raw`: Formateado "en bruto" (XXXXXXXX-X), adecuado para usar en
 *       registros o variables
 *   - `updateRut`: actualiza el RUT, para entregarlo formateado en `rut`
 *   - `isValid`: indica si el RUT tiene DV válido
 *
 * @returns Lo indicado arriba
 */
export var useRut = function () {
    var _a = useState(null), rut = _a[0], setRut = _a[1];
    var formattedRut = prettifyRut(rut);
    var updateRut = function (rut) {
        setRut(removeSeparators(rut));
    };
    var rutWithoutDv = formattedRut === null || formattedRut === void 0 ? void 0 : formattedRut.slice(0, -1).replace(/\./g, "");
    var dv = formattedRut.charAt(formattedRut.length - 1);
    var isValid = rutWithoutDv !== "" &&
        rutWithoutDv !== "0-" &&
        dv === calculateDv(parseInt(rutWithoutDv));
    return {
        updateRut: updateRut,
        rut: {
            formatted: formattedRut !== "0-0" ? formattedRut : "",
            raw: formattedRut !== "0-0" ? "" + rutWithoutDv + dv : "",
        },
        isValid: isValid,
    };
};
//# sourceMappingURL=useRut.js.map