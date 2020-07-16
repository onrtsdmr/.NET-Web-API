import { Component, OnInit } from '@angular/core';
import { Model, Product } from '../../Model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  products: Product[];
  categoryName: string;
  constructor(private productService: ProductService) 
  {

  }

  ngOnInit(): void 
  {
    this.products = this.productService.getProducts();
    this.categoryName = this.productService.getCategoryName();
  }
}
