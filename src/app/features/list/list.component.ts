import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interface/product.interface';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { filter } from 'rxjs/operators';



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
  confirmDialogService = inject(ConfirmDialogService);

  ngOnInit(){
    this.productService.getAll().subscribe((products) =>{
      this.products = products;
    })
  }


  onEdit(product: Product){
    this.router.navigate(['/edit-product', product.id]);
  }

  onDelete(product: Product) {
    this.confirmDialogService
    .openDialog()
    .pipe(filter((answer) => answer === true))
    .subscribe(() =>{
      this.productService.delete(product.id)
        .subscribe(() =>{
          this.productService.getAll().subscribe((products) =>{
            this.products = products;
          })
        });
    });
  }
}
