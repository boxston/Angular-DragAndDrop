import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cabecera } from '../interfaces/cabecera.interface';
const mock : Cabecera[]=[
  {
    "id": 1,
    "grupoPaletizadoId": 1,
    "nodoDestinatarioId": 101,
    "nodoPlazaRuteoId": 102,
    "activo": true,
    "usuario": "Alan"
  },
  {
    "id": 2,
    "grupoPaletizadoId": 1,
    "nodoDestinatarioId": 103,
    "nodoPlazaRuteoId": 104,
    "activo": true,
    "usuario": "Alan"
  },
  {
    "id": 3,
    "grupoPaletizadoId": 2,
    "nodoDestinatarioId": 105,
    "nodoPlazaRuteoId": 106,
    "activo": true,
    "usuario": "Alan"
  }
]
@Injectable({ providedIn: 'root' })
export class GrupoCabeceraService {
  private apiUrl = 'https://localhost:7003/api/v1/gruponodos';

  constructor(private http: HttpClient) {}

  getGrupoCabecera(): Observable<Cabecera[]> {
    return of(mock);
    return this.http.get<Cabecera[]>(this.apiUrl);
  }

  updateGrupoCabecera(cabecera: Cabecera): Observable<Cabecera> {
    return of({ ...cabecera }); 
    return this.http.put<Cabecera>(`${this.apiUrl}/${cabecera.id}`, cabecera);
  }

  addGrupoCabecera(cabecera: Cabecera): Observable<Cabecera> {
    const nuevoCabecera = { ...cabecera, id: mock.length + 1 };
    mock.push(nuevoCabecera);
    return of(nuevoCabecera);
    return this.http.post<Cabecera>(this.apiUrl, cabecera);
  }
}