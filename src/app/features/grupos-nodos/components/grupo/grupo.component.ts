import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CdkDrag, CdkDragDrop, CdkDropList, } from "@angular/cdk/drag-drop";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatIcon } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: 'grupo',
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    MatListModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent {
  @Input() customStyle: { [key: string]: string } = {};
  @Input() grupoName: string = 'Grupo';
  @Input() dropListGroup: string[] = [];  // Lista de grupos conectados
  @Input() dropListId: string = '';  // ID único del grupo
  @Output() onDrop = new EventEmitter<CdkDragDrop<any>>(); // Emite cambio
  @Output() deleteGroup = new EventEmitter<string>();
  @Output() clearAllNodes = new EventEmitter<string>();
}
