import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { LaptopService } from '../laptop.service';
import { LaptopCreacion } from '../laptop.models';
import { FormularioProductoComponent } from '../formulario-producto/formulario-producto.component';
import { extraerErrores } from '../compartidos/componentes/funciones/extraerErrores';
import { MostrarErroresComponent } from "../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-producto',
  standalone:true,
  imports: [FormularioProductoComponent, MostrarErroresComponent],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent {
  router = inject(Router);
  laptopService = inject(LaptopService);
  errores: string [] = [];
  
  guardarCambios(laptop : LaptopCreacion){
    
    this.laptopService.crear(laptop).subscribe({ //cuando obtenga una respuesta del WebApi
      next: (response) => { //si la respuesta es exitosa

        this.router.navigate(["productos"]);
      },
      error: (err) => { //si la respuesta no es exitosa

        const errores = extraerErrores(err);
        this.errores = errores;
      }
      
    });

  }
  
}
