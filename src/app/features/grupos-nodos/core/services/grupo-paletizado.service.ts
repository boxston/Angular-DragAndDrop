import { Injectable } from '@angular/core';
import { Paletizado } from '../interfaces/paletizado.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const mock : Paletizado[]=[
  {
    "id": 1,
    "nombre": "Test de Alan",
    "activo": true,
    "usuario": "alan"
  },
  {
    "id": 2,
    "nombre": "Palet2",
    "activo": true,
    "usuario": "Alan"
  }
];
@Injectable({ providedIn: 'root' })
export class GrupoPaletizadoService {
  private apiUrl = 'https://localhost:7003/api/v1/gruponodos';

  constructor(private http: HttpClient) {}

  getGrupoPaletizado(): Observable<Paletizado[]> {
    return of(mock);
    return this.http.get<Paletizado[]>(this.apiUrl);
  }

  updateGrupoPaletizado(paletizado: Paletizado): Observable<Paletizado> {
    return of({ ...paletizado }); 
    return this.http.put<Paletizado>(`${this.apiUrl}/${paletizado.id}`, paletizado);
  }

  addGrupoPaletizado(paletizado: Paletizado): Observable<Paletizado> {
    const nuevoPaletizado = { ...paletizado, id: mock.length + 1 };
    mock.push(nuevoPaletizado);
    return of(nuevoPaletizado);
    return this.http.post<Paletizado>(this.apiUrl, paletizado);
  }
}