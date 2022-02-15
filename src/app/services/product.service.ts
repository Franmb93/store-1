import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  saveDetailsOrder(arg0: { details: import("../interfaces/order").Details[]; orderId: number; }): any {
    throw new Error('Method not implemented.');
  }

  private url = "http://localhost:3000/products";

  constructor( private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  updateStock(productId: number, stock: number): Observable<any>
  {
    const body = { "stock": stock }

    return this.http.patch<any>(`${this.url}/${productId}`, body);
  } 
}
