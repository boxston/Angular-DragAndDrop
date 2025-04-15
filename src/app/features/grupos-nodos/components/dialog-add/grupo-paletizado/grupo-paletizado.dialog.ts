import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Paletizado } from "../../../core/interfaces";

@Component({
    standalone: true,
    selector: 'add-grupo-paletizado',
    templateUrl: './grupo-paletizado.dialog.html',
    styleUrls: ['./grupo-paletizado.dialog.scss'],
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
  export class AddGrupoPaletizadoDialog {
    readonly dialogRef = inject(MatDialogRef<AddGrupoPaletizadoDialog>);
    nombre : string = "";

    onSaveClick(): void {
        const nuevoPaletizado: Paletizado = {
            id: 0,
            nombre: this.nombre,
            activo: true
        };
        this.dialogRef.close(nuevoPaletizado);
    }

    onCancelClick(): void {
      this.dialogRef.close();
    }
  }
  