import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { LaptopService } from "../../../laptop.service";
import { inject } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";

export function nombreLaptopEsUnico(): AsyncValidatorFn{

    const laptopService = inject(LaptopService); //inyecto laptopService
    const activateRoute = inject(ActivatedRoute);

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        if(control.pristine || !control.value){ //Si nadie toco el control no hay nada que validar o si no hay valor (control vacio)
            return of (null); //of porque al ser observable necesito de of para usar null
        }

        //ActivateRoute
        const id = activateRoute.snapshot.paramMap.get('id') ?? "0"; //si no hay ningun id, es cero por defecto



        return laptopService.existePorNombre(control.value, id).pipe( //El WebApi me devuelve un verdadero o falso 
            map((existe) => (existe ? {mensaje: "Ya existe una laptop con este nombre"}: null)), //si es verdadero retorno que ya existe, pero si es falso retorno nulo (no hay entonces error de validacion)
            catchError(() => of(null)) //si la funcion falla entonces error
        )

    }

}