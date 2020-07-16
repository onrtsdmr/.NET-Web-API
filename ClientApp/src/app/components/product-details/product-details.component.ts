import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/Model';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  saveProduct(id:number, name: string, price: number, isActive: boolean)
  {
    this.productService.saveProduct(new Product(id, name, price, isActive));
    this.product = null;
  }

}
