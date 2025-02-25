import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherforecastService {

  constructor() { }

  private http = inject(HttpClient); //coloco el token para poder obtener el hhtpclient
  private URLbase = environment.apiURL + '/weatherforecast'; // URL a la que quiero hacer la peticion

  public obtenerClima(){
    return this.http.get<any>(this.URLbase); //peticion get

    //http para usar htppclient
    }
  }

