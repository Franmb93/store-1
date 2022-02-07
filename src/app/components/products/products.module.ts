import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { ProductComponent } from '../product/product.component';




@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    AngularMaterialModule
  ]
})
export class ProductsModule { }
