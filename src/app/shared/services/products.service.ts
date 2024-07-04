import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../interface/product.interface';
import { ProductPayload } from '../interface/payload-product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 httpClient = inject(HttpClient);

 getAll(){
    return this.httpClient.get<Product[]>('/api/products');
  }

  post(payload: ProductPayload){
    return this.httpClient.post('/api/products', payload);

  }
}



