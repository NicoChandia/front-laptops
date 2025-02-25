import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LaptopService } from '../laptop.service';
import { Laptop } from '../laptop.models';
import {MatTableModule} from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { LoadingComponent } from "../compartidos/componentes/loading/loading.component";

@Component({
  selector: 'app-indice-productos',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatTableModule, SweetAlert2Module, LoadingComponent],
  templateUrl: './indice-productos.component.html',
  styleUrl: './indice-productos.component.css'
})
export class IndiceProductosComponent {

  laptopService = inject(LaptopService);
  laptops?: Laptop[];
  columnaAMostrar = ['nombre', 'acciones']

  constructor(){
    this.cargarProductos(); 
  }

  cargarProductos(){ //recargar el listado de productos
    this.laptopService.obtenerTodos().subscribe(laptops => {
      this.laptops = laptops;
    });
  }

  borrar(id:number){
    this.laptopService.borrar(id).subscribe(()=>{

      this.laptops = undefined;//Para que luego de borrar una laptop se vuelva a cargar la tabla mostrando el loadingGIF

      Swal.fire("Exitoso", "El registro fue borrado exitosamente",'success');

      this.cargarProductos();
    })
  }
}
