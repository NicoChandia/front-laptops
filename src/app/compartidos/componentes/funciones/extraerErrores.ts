export function extraerErrores (obj: any): string[]{ //retorno los errores

    const err = obj.error.errors; //busco el "errors" que nos da el navegador al inspeccionar

    let mensajesDeError: string [] = [];
     
    for (let campo in err){ //cambio la forma de mostrar los errores
        const mensajesConCampos = err[campo].map((mensaje: string) => `${campo}: ${mensaje}}`);
        mensajesDeError = mensajesDeError.concat(mensajesConCampos);
    }

    return mensajesDeError

}