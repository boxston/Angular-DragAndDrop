import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Detalle } from '../interfaces/detalle.interface';
const mock : Detalle[]=[
  {
    "id": 1,
    "grupoCabeceraId": 1,
    "nodoDestino": 100,
    "activo": true,
    "nodoCodigo": 100,
    "nodoDescripcion": "Nodo 100",
    "usuario": "Alan"
  },
  {
    "id": 2,
    "grupoCabeceraId": 1,
    "nodoDestino": 101,
    "activo": true,
    "nodoCodigo": 101,
    "nodoDescripcion": "Nodo 101",
    "usuario": "Alan"
  },
  {
    "id": 3,
    "grupoCabeceraId": 1,
    "nodoDestino": 102,
    "activo": true,
    "nodoCodigo": 102,
    "nodoDescripcion": "Nodo 102",
    "usuario": "Alan"
  },
  {
    "id": 4,
    "grupoCabeceraId": 1,
    "nodoDestino": 103,
    "activo": true,
    "nodoCodigo": 103,
    "nodoDescripcion": "Nodo 103",
    "usuario": "Alan"
  },
  {
    "id": 5,
    "grupoCabeceraId": 2,
    "nodoDestino": 104,
    "activo": true,
    "nodoCodigo": 104,
    "nodoDescripcion": "Nodo 104",
    "usuario": "Alan"
  },
  {
    "id": 6,
    "grupoCabeceraId": 3,
    "nodoDestino": 105,
    "activo": true,
    "nodoCodigo": 105,
    "nodoDescripcion": "Nodo 105",
    "usuario": "Alan"
  },
  {
    "id": 7,
    "grupoCabeceraId": 3,
    "nodoDestino": 106,
    "activo": true,
    "nodoCodigo": 106,
    "nodoDescripcion": "Nodo 106",
    "usuario": "Alan"
  }
]
@Injectable({ providedIn: 'root' })
export class GrupoDetalleService {
  private apiUrl = 'https://localhost:7003/api/v1/gruponodos';

  constructor(private http: HttpClient) {}

  getGrupoDetalle(): Observable<Detalle[]> {
    return of(mock);
    return this.http.get<Detalle[]>(this.apiUrl);
  }

  updateGrupoDetalle(detalle: Detalle): Observable<Detalle> {
    return of({ ...detalle }); 
    // return this.http.put<Detalle>(`${this.apiUrl}/${detalle.id}`, detalle);
  }

  addGrupoDetalle(detalle: Detalle): Observable<Detalle> {    
    const nuevoDetalle = { ...detalle, id: mock.length + 1 };
    mock.push(nuevoDetalle);
    return of(nuevoDetalle);
    return this.http.post<Detalle>(this.apiUrl, detalle);
  }
  
  deleteGrupoDetalle(nodoDestino: number): Observable<void> {
    const index = mock.findIndex(d => d.nodoDestino === nodoDestino);
    if (index !== -1) mock.splice(index, 1);
    return of(void 0);
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}