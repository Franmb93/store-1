import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  //Para saber que cartAction es un observable s epone $ al final
  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }

  //Necesitamos unos métodos privados también
  //Para calcular el total de la orden que lso clientes compran
  private calcTotal(): void {
    const total = this.products.reduce((accumulator, actualProduct) => accumulator += actualProduct.price, 0);
    //Notificar el observable
    this.totalSubject.next(total);
  }

  //Método para la cantidad de productos que el usuario añadió al carrito
  private quantityProducts(): void {
    const quantity = this.products.length;
    this.quantitySubject.next(quantity);
  }

  //Método para añadir productos al carrito
  private addToCart(product: Product): void {
    console.log("product: ", product)
    this.products.push(product);
    this.cartSubject.next(this.products);
  }

  //Método público para actualizar el carrito de compra
  updateCart(product: Product): void {
    this.addToCart(product);
    this.calcTotal();
    this.quantityProducts();
  }


  constructor() { }
}
