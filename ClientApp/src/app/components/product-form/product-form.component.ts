import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Model';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(private productService: ProductService){}

  ngOnInit(): void {  }

  addProduct(name: string, price: number, isActive: boolean){
    console.log(name);
    console.log(price);
    console.log(isActive);


    const p = new Product(0, name,  price, isActive);
    this.productService.saveProduct(p);

  }

}
