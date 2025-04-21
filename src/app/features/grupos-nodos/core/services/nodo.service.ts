import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Detalle, Nodo } from '../interfaces';
const mock: Nodo[] = [
  {
    id: 101,
    activo: true,
    codigo: "101",
    descripcion: "Nodo 101",
    idNodoItem: 101,
    idNodoTipo: 1,
    tipo: "Tipo 1"
  },
  {
    id: 102,
    activo: true,
    codigo: "102",
    descripcion: "Nodo 102",
    idNodoItem: 102,
    idNodoTipo: 1,
    tipo: "Tipo 1"
  },
  {
    id: 103,
    activo: true,
    codigo: "103",
    descripcion: "Nodo 103",
    idNodoItem: 103,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 104,
    activo: true,
    codigo: "104",
    descripcion: "Nodo 104",
    idNodoItem: 104,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 105,
    activo: true,
    codigo: "105",
    descripcion: "Nodo 105",
    idNodoItem: 105,
    idNodoTipo: 1,
    tipo: "Tipo 1"
  },
  {
    id: 106,
    activo: true,
    codigo: "106",
    descripcion: "Nodo 106",
    idNodoItem: 106,
    idNodoTipo: 1,
    tipo: "Tipo 1"
  },
  {
    id: 8,
    activo: true,
    codigo: "8",
    descripcion: "Nodo 8",
    idNodoItem: 8,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 9,
    activo: true,
    codigo: "9",
    descripcion: "Nodo 9",
    idNodoItem: 9,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 10,
    activo: true,
    codigo: "10",
    descripcion: "Nodo 10",
    idNodoItem: 10,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 11,
    activo: true,
    codigo: "11",
    descripcion: "Nodo 11",
    idNodoItem: 11,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 12,
    activo: true,
    codigo: "12",
    descripcion: "Nodo 12",
    idNodoItem: 12,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 13,
    activo: true,
    codigo: "13",
    descripcion: "Nodo 13",
    idNodoItem: 13,
    idNodoTipo: 1,
    tipo: "Tipo 1"
  },
  {
    id: 14,
    activo: true,
    codigo: "14",
    descripcion: "Nodo 14",
    idNodoItem: 14,
    idNodoTipo: 1,
    tipo: "Tipo 1"
  },
  {
    id: 15,
    activo: true,
    codigo: "15",
    descripcion: "Nodo 15",
    idNodoItem: 15,
    idNodoTipo: 1,
    tipo: "Tipo 1"
  },
  {
    id: 16,
    activo: true,
    codigo: "16",
    descripcion: "Nodo 16",
    idNodoItem: 16,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 17,
    activo: true,
    codigo: "17",
    descripcion: "Nodo 17",
    idNodoItem: 17,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 18,
    activo: true,
    codigo: "18",
    descripcion: "Nodo 18",
    idNodoItem: 18,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 19,
    activo: true,
    codigo: "19",
    descripcion: "Nodo 19",
    idNodoItem: 19,
    idNodoTipo: 2,
    tipo: "Tipo 2"
  },
  {
    id: 20,
    activo: true,
    codigo: "20",
    descripcion: "Nodo 20",
    idNodoItem: 20,
    idNodoTipo: 1,
    tipo: "Tipo 1"
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
      id: nodo.id,
      nodoDestino: nodo.idNodoItem,
      activo: nodo.activo,
      nodoCodigo: parseInt(nodo.codigo),
      nodoDescripcion: nodo.descripcion,
      nodoTipo: nodo.idNodoTipo
    };
  }
}