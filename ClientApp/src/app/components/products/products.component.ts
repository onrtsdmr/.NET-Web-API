import { Component, OnInit } from '@angular/core';
import { Model, Product } from '../../models/Model';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  products: Product[];
  categoryName: string;
  selectedProduct: Product;

  constructor(private productService: ProductService, private alerfiyService: AlertifyService)
  {

  }

  ngOnInit(): void
  {
    this.getProducts();
    this.getCategoryName();
  }

  getProducts(){
    this.productService.getProducts().subscribe(products=>{
      this.products = products;
    },error=>{
      console.log(error);
    }
    );
  }

  getCategoryName(){
    this.categoryName = this.productService.getCategoryName();
  }

  onSelectProduct(product: Product){
    this.selectedProduct = product;
  }

  deleteProduct(product: Product){
    this.productService
    .deleteProduct(product)
    .subscribe(p=>{
      this.products.splice(this.products.findIndex(x=>x.productId == product.productId),1);
      this.alerfiyService.error("Product Deleted.")
    });
  }
}
