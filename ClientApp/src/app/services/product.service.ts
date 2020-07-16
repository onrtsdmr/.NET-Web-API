import { Injectable } from '@angular/core';
import { Model, Product } from '../Model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  model = new Model();

  constructor() { }

  getCategoryName() {
    return this.model.categoryName;
  }
  getProducts() {
    return this.model.products;
  }

  addProduct(product: Product)
  {
    this.model.products.push(product);
  }
}
