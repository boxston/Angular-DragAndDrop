import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { Nodo } from "../../core/interfaces/nodo.interface";
import { GruposNodosService } from "../../core/services/grupos-nodos.service";

@Component({
  standalone: true,
  selector: 'grupo',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent {
  @Input() customStyle: { [key: string]: string } = {};
  @Input() grupoName: string = 'Grupo';
  @Input() nodosList: Nodo[] = []; // Recibe el listado de nodos
  @Input() dropListGroup: string[] = [];  // Lista de grupos conectados
  @Input() dropListId: string = '';  // ID único del grupo
  @Output() onDrop = new EventEmitter<CdkDragDrop<any>>(); // Emite cambio
  @Output() deleteGroup = new EventEmitter<string>();
  @Output() clearAllNodes = new EventEmitter<string>();
  @Output() saveClick: EventEmitter<void> = new EventEmitter();

  onSaveClick() {
    this.saveClick.emit(); // Emite el evento cuando se hace clic en el botón
  }
}
