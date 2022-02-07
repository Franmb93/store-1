import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})



export class ProductComponent implements OnInit {

  
  constructor() { }
  @Input() productParam?: Product;
  @Output() addToCart = new EventEmitter<Product>();

  ngOnInit(): void {
  }

  onClick() {
    this.addToCart.emit(this.productParam);
    console.log("achoooo")
  }

}
