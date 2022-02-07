import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

 

  products: Product[] = [];
  product = "Acho"

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.getProducts()
    .pipe(
      tap((products: Product[]) => this.products = products)
    )
      .subscribe(); 
  }

  addTocartParent(product: Product): void {
        console.log("el padresssss", product)
  }


}
