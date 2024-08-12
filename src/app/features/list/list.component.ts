import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interface/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';

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

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products: Product [] = [];

  productService = inject(ProductsService);
  router = inject(Router);
  matDialog = inject(MatDialog)

  ngOnInit(){
    this.productService.getAll().subscribe((products) =>{
      this.products = products;
    })
  }


  onEdit(product: Product){
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .pipe(filter((answer) => answer === true))
    .subscribe(() =>{
        this.productService.delete(product.id)
        .subscribe(() =>{
          this.productService.getAll().subscribe((products) =>{
            this.products = products;
          })
        });
     
    })
  }
}
