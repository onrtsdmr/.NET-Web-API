import {Injectable} from '@angular/core';
import {Model, Product} from '../models/Model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  model = new Model();

  constructor() {
  }

  getCategoryName() {
    return this.model.categoryName;
  }

  getProducts() {
    return this.model.products;
  }

  getProductById(id: number) {
    return this.model.products.find(i => i.id == id);
  }

  saveProduct(product: Product) {
    if (product.id == 0) {
      product.id = this.model.products.length + 1;
      this.model.products.push(product);
    }
    const p = this.getProductById(product.id);
    p.name = product.name;
    p.price = product.price;
    p.isActive = product.isActive;
  }

  deleteProduct(product: Product){
    const index = this.model.products.indexOf(product);
    this.model.products.splice(index, 1);
  }
}
