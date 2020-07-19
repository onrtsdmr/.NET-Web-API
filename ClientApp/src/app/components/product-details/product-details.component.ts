import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/Model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;
  @Input() products: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  saveProduct(
    productId: number,
    name: string,
    price: number,
    isActive: boolean
  ) {
    const p = new Product(productId, name, price, isActive);
    this.productService
      .updateProduct(p)
      .subscribe((result) => {
        this.products.splice(this.products.findIndex(x=>x.productId==p.productId),1,p)
      });
    this.product = null;
  }
}
