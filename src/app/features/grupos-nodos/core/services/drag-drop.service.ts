// drag-drop.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  // Usamos BehaviorSubject para mantener y observar el estado de las listas
  private _principalItems = new BehaviorSubject<string[]>(['Elemento 1', 'Elemento 2', 'Elemento 3']);
  private _groupItems = new BehaviorSubject<any[]>([
    { name: 'Grupo 1', items: ['Elemento A', 'Elemento B'] },
    { name: 'Grupo 2', items: ['Elemento C', 'Elemento D'] }
  ]);

  // Observables para los componentes
  principalItems$ = this._principalItems.asObservable();
  groupItems$ = this._groupItems.asObservable();

  // Método para eliminar ítems de la lista principal
  removeFromPrincipal(item: string) {
    const currentItems = this._principalItems.value;
    const updatedItems = currentItems.filter(i => i !== item);
    this._principalItems.next(updatedItems);
  }

  // Método para agregar ítems a un grupo
  addToGroup(groupName: string, item: string) {
    const groups = this._groupItems.value;
    const group = groups.find(g => g.name === groupName);
    if (group && !group.items.includes(item)) {
      group.items.push(item);
      this._groupItems.next(groups); // Actualiza el grupo con el nuevo ítem
    }
  }
}
