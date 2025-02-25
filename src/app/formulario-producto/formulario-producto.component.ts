import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LaptopService } from '../laptop.service';
import { Router, RouterLink } from '@angular/router';
import { Laptop, LaptopCreacion } from '../laptop.models';
import { nombreLaptopEsUnico } from '../compartidos/componentes/funciones/nombreLaptopEsUnico';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

@Component({
  selector: 'app-formulario-producto',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder); //Crear formulario reactivo

  @Input({required:true}) //esto para el {{title}} del html
  titulo!: string;


  @Input()
  modelo?: Laptop; //para poder acceder a una laptop y proyectarla sobre el formulario necesito OnInit
  
  
  @Output() //evento que quiero disparar desde mi componente
  posteoFormulario = new EventEmitter<LaptopCreacion>(); 

  ngOnInit(): void {
    if (this.modelo != undefined){ //si no es indefinido entonces lo proyecto en el formulario

      this.form.patchValue(this.modelo); //si viene modelo.nombre se coloca

    }
  }

  form = this.formBuilder.group({

    nombre: ['', {
      validators: [Validators.required],
      asyncValidators: [nombreLaptopEsUnico()], //validador asyncrono
      updateOn:'blur'//eficiencia, las validaciones se ejecutaran solo cuando el usuario desenfoque el control (no queremos multiples peticiones mientras el usuario esta escribiendo)  
    }],
  })

  //obtener errores de validacion del campo nombre
  obtenerErroresCampoNombre(): string{

    let nombre = this.form.controls.nombre; //campo nombre

    if(nombre.hasError('required')){ //si el campo nombre tiene errores de validacion
      return 'El campo nombre es requerido';
    }
    
    if(nombre.hasError('mensaje')){ //si existe un objeto con propiedad error
      return nombre.getError('mensaje'); //"Ya existe una laptop con este nombre"
    }

    return ""; //vacio en caso de que no haya errores
  }


  guardarCambios(){
    let laptop = this.form.value as LaptopCreacion;
    this.posteoFormulario.emit(laptop); //emito/envio la laptop
    }

}
