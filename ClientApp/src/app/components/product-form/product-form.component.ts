import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Model';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() products: Product[];
  constructor(private productService: ProductService, private alerfiyService: AlertifyService){}

  ngOnInit(): void {  }

  addProduct(name: string, price: number, isActive: boolean){
    console.log(name);
    console.log(price);
    console.log(isActive);


    const p = new Product(this.products.length + 1, name,  price, isActive);
    this.productService.addProduct(p).subscribe(product=> {
      this.products.push(product);
      this.alerfiyService.success("Product Added.");
    });
  }

}
