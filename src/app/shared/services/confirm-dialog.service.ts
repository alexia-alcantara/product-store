import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Aviso</h2>
      <mat-dialog-content >
        Tem certeza que deseja deletar?
      </mat-dialog-content>
      <mat-dialog-actions align="center">
        <button mat-button (click)="onRecused()">Não</button>
        <button mat-raised-button color="accent" (click)="onAproved()" cdkFocusInitial>Sim</button>
      </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogModule
  ]
})
export class ConfirmationDialogComponent { 
  matDialogRef = inject(MatDialogRef);

  onRecused(){
    this.matDialogRef.close(false);
  }

  onAproved(){
    this.matDialogRef.close(true);
  }
}

@Injectable({
  providedIn: 'root'
})

export class ConfirmDialogService {

  matDialog = inject(MatDialog)


  constructor() { }

  openDialog(): Observable<boolean>{
    return this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
  }
}
