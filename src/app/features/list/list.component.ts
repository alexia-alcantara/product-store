import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interface/product.interface';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  products: Product [] = [];

  productService = inject(ProductsService);

  ngOnInit(){
    this.productService.getAll().subscribe((products) =>{
      this.products = products;
    })
  }

}
