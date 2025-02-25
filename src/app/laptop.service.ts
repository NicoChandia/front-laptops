import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Laptop, LaptopCreacion } from './laptop.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  constructor() { }

  private http = inject(HttpClient); //coloco el token para poder obtener el hhtpclient
  private URLbase = environment.apiURL + '/api/laptops'; // URL a la que quiero hacer la peticion, esta en .net
  
  public obtenerTodos(): Observable<Laptop[]>{ //arreglo de laptop xq son varias
    return this.http.get<Laptop[]>(this.URLbase);
  }


  public obtenerPorId(id: number): Observable<Laptop>{ //obtener una unica laptop y no el arreglo
    return this.http.get<Laptop>(`${this.URLbase}/${id}`); 
  } //Tiene que ver con el obtener Laptop por ide del .net HttpGet{id:int}


  public existePorNombre(nombre:string, id:string): Observable<boolean>{ 
    let params = new HttpParams();
    params = params.append('id',id);
    return this.http.get<boolean>(`${this.URLbase}/${nombre}/existe`,{params}); //usamos [HttpGet("{nombre}/existe")]
  } //envio el id atraves de un query string hacia mi WebApi


  public actualizar(id: number, laptop: LaptopCreacion){ //HttpPut en .net
    return this.http.put(`${this.URLbase}/${id}`, laptop);
  }


  public crear(laptop: LaptopCreacion){ //tiene que venir la la interfaz de la laptop, lo tarigo de laptop.models
    return this.http.post(this.URLbase, laptop); //peticion get 
      //http para usar htppclient
  }

  public borrar(id: number){
    return this.http.delete(`${this.URLbase}/${id}`);
  }
}
