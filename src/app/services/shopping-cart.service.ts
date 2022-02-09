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
  
  constructor() { }

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
    const total = this.products.reduce((accumulator, actualProduct) => accumulator += (actualProduct.price * actualProduct.qty), 0);
    //Notificar el observable
    this.totalSubject.next(total);
  }

  //Método para la cantidad de productos que el usuario añadió al carrito
  private quantityProducts(): void {
    //Para que en el detalle no se repita el producto si hay más d euno igual y solo sume la cantidad
    // const quantity = this.products.length;
    const quantity = this.products.reduce((acc, prod) => acc += prod.qty, 0);
    this.quantitySubject.next(quantity);
  }

  //Método para añadir productos al carrito
  private addToCart(product: Product): void {
    // console.log("product: ", product)
    //Ahora comprobamos si el product ya esta en la lista o no y solo aumentamos la cantidad.
    const isProductInCart = this.products.find(({id}) => id === product.id)
    if (isProductInCart){
      isProductInCart.qty++;
    } else {
      this.products.push({...product, qty: 1});
    }
    this.cartSubject.next(this.products);
  }

  //Método público para actualizar el carrito de compra
  updateCart(product: Product): void {
    this.addToCart(product);
    this.calcTotal();
    this.quantityProducts();
  }

  resetCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.products = [];
  }

  
}
