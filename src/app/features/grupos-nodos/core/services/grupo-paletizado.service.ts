import { Injectable } from '@angular/core';
import { Paletizado } from '../interfaces/paletizado.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../interfaces/responseDTO.interface';
/*
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
*/
@Injectable({ providedIn: 'root' })
export class GrupoPaletizadoService {
  private apiUrl = 'https://localhost:7003/api/v1/gruponodos/paletizado';

  constructor(private http: HttpClient) {}

  getGrupoPaletizado(): Observable<ResponseDTO<Paletizado[]>> {
    //return of(mock);
    return this.http.get<ResponseDTO<Paletizado[]>>(this.apiUrl);
  }

  updateGrupoPaletizado(paletizado: Paletizado): Observable<ResponseDTO<Paletizado>> {
    //return of({ ...paletizado }); 
    return this.http.put<ResponseDTO<Paletizado>>(`${this.apiUrl}/${paletizado.id}`, paletizado);
  }

  addGrupoPaletizado(paletizado: Paletizado): Observable<ResponseDTO<Paletizado>> {
    //const nuevoPaletizado = { ...paletizado, id: Math.max(...mock.map(p => p.id)) + 1 };
    //mock.push(nuevoPaletizado);
    //return of(nuevoPaletizado);
    return this.http.post<ResponseDTO<Paletizado>>(this.apiUrl, paletizado);
  }
}