import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { Store } from '../interfaces/store';
import { DataService } from '../services/data.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  model = {
    name: "",
    store: "",
    shippingAddress: "",
    city: ""
  }

  isDelivery: boolean = true;

  stores: Store[] = [];

  cart: Product[] = [];



  constructor(private dataService: DataService, private productService: ProductService
    , private route: Router
    , private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupDelivery(value: boolean):void {
    this.isDelivery = value;
  }

  private getStores(): void {
    this.dataService.getStores().pipe(
      tap((stores: Store[]) => this.stores = stores)
    )
      .subscribe(); 
  }

  onSubmit({value: formData}: NgForm): void {
    // console.log("holi", formData)
    // const data: Order = formData;
    // console.log("order", data);

    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }

    this.dataService.saveOrder(data)
    .pipe(
      tap(res => console.log(res)),
      switchMap(({ id: orderId}) => {
        const details = this.prepareDetails();
        return this.dataService.saveDetailsOrder({ details, orderId });
      }),
      // Necesitamos el modulo Router, por lo cual hay que inyectarlo en el constructor( DI (Intección de dependencias))
      tap(() => this.route.navigate(['/thank-you-page'])),
      delay(5000),
      tap(()=> this.shoppingCartService.resetCart())
    ).subscribe();
  }

  private getCurrentDay(): string{
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];

    this.cart.forEach((product: Product) => {
      const { id: productId, name: productName, qty: quantity, stock} = product;
      const updateStock = (stock - quantity);

      this.productService.updateStock(productId, updateStock)
        .pipe(
          tap(() => details.push( {productId, productName, quantity} ))
        )
        .subscribe();


    })

    return details;
  }


  private getDataCart(): void {
    this.shoppingCartService.cartAction$
    .pipe(
      tap((products: Product[]) => this.cart = products)
    ).subscribe();
  }

  private isCartEmpty():void{
    this.shoppingCartService.totalAction$
    .pipe(
      tap((total: Number) => {
        if(total === 0){
          this.route.navigate(['/products'])
        }
      })
    )
  }
}
