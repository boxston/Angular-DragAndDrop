import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Detalle, Nodo } from '../interfaces';
const mock: Nodo[] = [
  {
    Id: 101,
    Activo: true,
    Codigo: "101",
    Descripcion: "Nodo 101",
    IdNodoItem: 101,
    IdNodoTipo: 1,
    Tipo: "Tipo 1"
  },
  {
    Id: 102,
    Activo: true,
    Codigo: "102",
    Descripcion: "Nodo 102",
    IdNodoItem: 102,
    IdNodoTipo: 1,
    Tipo: "Tipo 1"
  },
  {
    Id: 103,
    Activo: true,
    Codigo: "103",
    Descripcion: "Nodo 103",
    IdNodoItem: 103,
    IdNodoTipo: 2,
    Tipo: "Tipo 2"
  },
  {
    Id: 104,
    Activo: true,
    Codigo: "104",
    Descripcion: "Nodo 104",
    IdNodoItem: 104,
    IdNodoTipo: 2,
    Tipo: "Tipo 2"
  },
  {
    Id: 105,
    Activo: true,
    Codigo: "105",
    Descripcion: "Nodo 105",
    IdNodoItem: 105,
    IdNodoTipo: 3,
    Tipo: "Tipo 3"
  },
  {
    Id: 106,
    Activo: true,
    Codigo: "106",
    Descripcion: "Nodo 106",
    IdNodoItem: 106,
    IdNodoTipo: 3,
    Tipo: "Tipo 3"
  },
  {
    Id: 7,
    Activo: true,
    Codigo: "7",
    Descripcion: "Nodo 7",
    IdNodoItem: 7,
    IdNodoTipo: 4,
    Tipo: "Tipo 4"
  },
  {
    Id: 8,
    Activo: true,
    Codigo: "8",
    Descripcion: "Nodo 8",
    IdNodoItem: 8,
    IdNodoTipo: 4,
    Tipo: "Tipo 4"
  },
  {
    Id: 9,
    Activo: true,
    Codigo: "9",
    Descripcion: "Nodo 9",
    IdNodoItem: 9,
    IdNodoTipo: 5,
    Tipo: "Tipo 5"
  },
  {
    Id: 10,
    Activo: true,
    Codigo: "10",
    Descripcion: "Nodo 10",
    IdNodoItem: 10,
    IdNodoTipo: 5,
    Tipo: "Tipo 5"
  },
  {
    Id: 11,
    Activo: true,
    Codigo: "11",
    Descripcion: "Nodo 11",
    IdNodoItem: 11,
    IdNodoTipo: 1,
    Tipo: "Tipo 1"
  },
  {
    Id: 12,
    Activo: true,
    Codigo: "12",
    Descripcion: "Nodo 12",
    IdNodoItem: 12,
    IdNodoTipo: 1,
    Tipo: "Tipo 1"
  },
  {
    Id: 13,
    Activo: true,
    Codigo: "13",
    Descripcion: "Nodo 13",
    IdNodoItem: 13,
    IdNodoTipo: 2,
    Tipo: "Tipo 2"
  },
  {
    Id: 14,
    Activo: true,
    Codigo: "14",
    Descripcion: "Nodo 14",
    IdNodoItem: 14,
    IdNodoTipo: 2,
    Tipo: "Tipo 2"
  },
  {
    Id: 15,
    Activo: true,
    Codigo: "15",
    Descripcion: "Nodo 15",
    IdNodoItem: 15,
    IdNodoTipo: 3,
    Tipo: "Tipo 3"
  },
  {
    Id: 16,
    Activo: true,
    Codigo: "16",
    Descripcion: "Nodo 16",
    IdNodoItem: 16,
    IdNodoTipo: 3,
    Tipo: "Tipo 3"
  },
  {
    Id: 17,
    Activo: true,
    Codigo: "17",
    Descripcion: "Nodo 17",
    IdNodoItem: 17,
    IdNodoTipo: 4,
    Tipo: "Tipo 4"
  },
  {
    Id: 18,
    Activo: true,
    Codigo: "18",
    Descripcion: "Nodo 18",
    IdNodoItem: 18,
    IdNodoTipo: 4,
    Tipo: "Tipo 4"
  },
  {
    Id: 19,
    Activo: true,
    Codigo: "19",
    Descripcion: "Nodo 19",
    IdNodoItem: 19,
    IdNodoTipo: 5,
    Tipo: "Tipo 5"
  },
  {
    Id: 20,
    Activo: true,
    Codigo: "20",
    Descripcion: "Nodo 20",
    IdNodoItem: 20,
    IdNodoTipo: 5,
    Tipo: "Tipo 5"
  }
];

@Injectable({ providedIn: 'root' })
export class NodoService {
  private apiUrl = 'https://localhost:7003/api/v1/gruponodos';

  constructor(private http: HttpClient) {}

  getNodo(): Observable<Detalle[]> {
    return of(mock).pipe(
      map(nodos => nodos.map(nodo => this.transformarNodoADetalle(nodo)))
    );
    // return this.http.get<Nodo[]>(this.apiUrl).pipe(
    //   map(nodos => nodos.map(nodo => this.transformarNodoADetalle(nodo)))
    // );
  }

  private transformarNodoADetalle(nodo: Nodo): Detalle {
    return {
      id: nodo.Id,
      nodoDestino: nodo.IdNodoItem,
      activo: nodo.Activo,
      nodoCodigo: parseInt(nodo.Codigo),
      nodoDescripcion: nodo.Descripcion,
      nodoTipo: nodo.IdNodoTipo
    };
  }
}