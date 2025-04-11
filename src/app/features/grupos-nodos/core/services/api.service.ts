// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paletizado } from '../interfaces/paletizado.interface';
import { Cabecera } from '../interfaces/cabecera.interface';
import { Detalle } from '../interfaces/detalle.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7003/api/v1/gruponodos';

  constructor(private http: HttpClient) {}

  getPaletizado(): Observable<Paletizado[]> {
    return this.http.get<Paletizado[]>(`${this.baseUrl}/paletizado`);
  }
  putPaletizado(paletizado: Paletizado): Observable<Paletizado> {
    return this.http.put<Paletizado>(`${this.baseUrl}/paletizado`, paletizado);
  }  
  postPaletizado(paletizado: Paletizado): Observable<Paletizado> {
    return this.http.post<Paletizado>(`${this.baseUrl}/paletizado`, paletizado);
  }

  getCabecera(): Observable<Cabecera[]> {
    return this.http.get<Cabecera[]>(`${this.baseUrl}/cabecera`);
  }
  putCabecera(cabecera: Cabecera): Observable<Cabecera> {
    return this.http.put<Cabecera>(`${this.baseUrl}/cabecera`, cabecera);
  }
  postCabecera(cabecera: Cabecera): Observable<Cabecera> {
    return this.http.post<Cabecera>(`${this.baseUrl}/cabecera`, cabecera);
  }


  getDetalle(): Observable<Detalle[]> {
    return this.http.get<Detalle[]>(`${this.baseUrl}/detalle`);
  }
  putDetalle(detalle: Detalle): Observable<Detalle> {
    return this.http.put<Detalle>(`${this.baseUrl}/detalle`,detalle);
  }
  postDetalle(detalle: Detalle): Observable<Detalle> {
    return this.http.post<Detalle>(`${this.baseUrl}/detalle`,detalle);
  }

}
