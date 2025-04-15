import { Component, computed, inject, OnInit } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { GrupoCabeceraPage } from "../grupo-cabecera/grupo-cabecera.components";

import {MatSelectModule} from '@angular/material/select';
import { GrupoCabeceraStore, GrupoPaletizadoStore } from "../../core/store";
@Component({
    standalone: true,
    selector: 'grupo-paletizado',
    imports: [
    CommonModule,
    GrupoCabeceraPage,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
],
    templateUrl: './grupo-paletizado.component.html',
    styleUrls: ['./grupo-paletizado.component.scss'],
    providers: []
})
export class GrupoPaletizadoPage implements OnInit {
    grupoPaletizadoStore = inject(GrupoPaletizadoStore);
    grupoCabeceraStore = inject(GrupoCabeceraStore);
    searchQuery: string = ""; 
    
    ngOnInit(): void {
        this.grupoPaletizadoStore.loadGrupoPaletizado();
        this.grupoCabeceraStore.loadGrupoCabecera();        
    }

    getGrupoPaletizado(): any[] {
        return this.grupoPaletizadoStore.grupoPaletizado().sort((a, b) => {
            const aHighlighted = this.isGroupHighlighted(a.nombre);
            const bHighlighted = this.isGroupHighlighted(b.id);
            return (aHighlighted === bHighlighted) ? 0 : aHighlighted ? -1 : 1;
        });
    }

    getGrupoCabecera(paletizadoId: number) {
        return computed(() =>
          this.grupoCabeceraStore.grupoCabecera().filter(g => g.grupoPaletizadoId === paletizadoId)
        );
    }

    // Función para verificar si un grupo debe ser resaltado
    isGroupHighlighted(grupo: any): boolean {
        if(grupo == undefined || grupo == null) return false;
        if(this.searchQuery != '' && grupo.length > 1){
            const nodesInGroup = grupo;
            return grupo.some((node: any) => 
                node.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                node.address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                node.id.toString().includes(this.searchQuery)
            );
        }
        return false;
    }

    // Función para obtener el trackBy
    trackById(index: number, item: any): any {
        return item.id;
    }
}