import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs';
import { Order } from '../interfaces/order';
import { Store } from '../interfaces/store';
import { DataService } from '../services/data.service';

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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getStores();
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
    console.log("holi", formData)
    const data: Order = formData;
    console.log("order", data)
  }

}
