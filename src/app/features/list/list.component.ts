import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interface/product.interface';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogService } from '../../shared/services/confirm-dialog.service';
import { filter } from 'rxjs/operators';
import { NoItemsComponent } from './components/no-items/no-items.component';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent,
    RouterLink,
    MatButtonModule,
    NoItemsComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products = signal<Product[]>(
    inject(ActivatedRoute).snapshot.data['products']
  ) ;

  productService = inject(ProductsService);
  router = inject(Router);
  confirmDialogService = inject(ConfirmDialogService);


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
            this.products.set(products)
          })
        });
    });
  }
}
