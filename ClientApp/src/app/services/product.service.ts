import { Injectable } from '@angular/core';
import { Model, Product } from '../models/Model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:5000/';

  model = new Model();

  constructor(private http: HttpClient) {}

  getCategoryName() {
    return this.model.categoryName;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'api/products');
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + 'api/products', product);
  }

  updateProduct(product: Product){
    return this.http.put<Product>(this.baseUrl + 'api/products/' + product.productId, product);
  }

  deleteProduct(product:Product): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + 'api/products/' + product.productId);
  }

  getProductById(id: number) {
    return this.model.products.find((i) => i.productId == id);
  }

  saveProduct(product: Product) {
    if (product.productId == 0) {
      product.productId = this.model.products.length + 1;
      this.model.products.push(product);
    }
    const p = this.getProductById(product.productId);
    p.name = product.name;
    p.price = product.price;
    p.isActive = product.isActive;
  }

  // deleteProduct(product: Product) {
  //   const index = this.model.products.indexOf(product);
  //   this.model.products.splice(index, 1);
  // }
}
