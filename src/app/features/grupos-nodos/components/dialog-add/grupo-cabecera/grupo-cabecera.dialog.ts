import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { 
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA 
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Cabecera } from "../../../core/interfaces";

@Component({
    standalone: true,
    selector: 'add-grupo-cabecera',
    templateUrl: './grupo-cabecera.dialog.html',
    styleUrls: ['./grupo-cabecera.dialog.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogTitle,
        MatDialogContent,   
        MatDialogActions,
        MatDialogModule, 
    ]
  })
  export class AddGrupoCabeceraDialog {
    readonly dialogRef = inject(MatDialogRef<AddGrupoCabeceraDialog>);
    readonly data = inject(MAT_DIALOG_DATA) as {
      nodos: any[];
      grupoPaletizado: number | null;
    };
    nodoDestinatarioId: number = 0;
    nodoPlazaRuteoId: number = 0;
    nombre : string = "";


    onSaveClick(): void {
        const nuevoCabecera: Cabecera = {
            id: 0,
            grupoPaletizadoId: this.data.grupoPaletizado!,
            nodoDestinatarioId: this.nodoDestinatarioId,
            nodoPlazaRuteoId: this.nodoPlazaRuteoId,
            activo: true
        };
        this.dialogRef.close(nuevoCabecera);
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }
  }
  