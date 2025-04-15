import { Component, computed, EventEmitter, inject, OnInit, Output, signal } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { GrupoCabeceraPage } from "../grupo-cabecera/grupo-cabecera.components";

import {MatSelectModule} from '@angular/material/select';
import { GrupoCabeceraStore, GrupoPaletizadoStore } from "../../core/store";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
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
        searchQuery = signal('');
    
    ngOnInit(): void {
        this.grupoPaletizadoStore.loadGrupoPaletizado();
        this.grupoCabeceraStore.loadGrupoCabecera();        
    }

    grupoPaletizado = computed(() => {
        const query = this.searchQuery().toLowerCase().trim();
        return this.grupoPaletizadoStore.grupoPaletizado().filter(g => {
            const nombreMatch = g.nombre?.toLowerCase().includes(query);
            const idMatch = g.id?.toString().includes(query);
            return nombreMatch || idMatch;
        });
    });

    getGrupoCabecera(paletizadoId: number) {
        return computed(() =>
          this.grupoCabeceraStore.grupoCabecera().filter(g => g.grupoPaletizadoId === paletizadoId)
        );
    }
}