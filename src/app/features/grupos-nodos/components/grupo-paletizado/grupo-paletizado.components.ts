import { Component, inject } from "@angular/core";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GrupoCabeceraStore, GrupoDetalleStore, GrupoPaletizadoStore } from "../../core/store";

@Component({
    standalone: true,
    selector: 'grupo-paletizado',
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
    ],
    templateUrl: './grupo-paletizado.component.html',
    styleUrls: ['./grupo-paletizado.component.scss'],
    providers: []
})
export class GrupoPaletizadoPage {
}