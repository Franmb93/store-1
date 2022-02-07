import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

 

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {

    this.productService.getProducts()
    .pipe(
      tap((products: Product[]) => this.products = products)
    )
      .subscribe(); 
  }

  addTocartParent(product: Product): void {
        console.log("el padresssss", product)
        this.shoppingCartService.updateCart(product);
  }


}
