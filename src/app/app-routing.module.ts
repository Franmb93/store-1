import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';

const routes: Routes = [
  {path: 'estudiantes', component: EstudiantesComponent},
  {path: 'empleados', component: EmpleadosComponent},
  { path: 'products', loadChildren: () => import('./components/products/products.module').then(m => m.ProductsModule) },
  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'thank-you-page', loadChildren: () => import('./thank-you-page/thank-you-page.module').then(m => m.ThankYouPageModule) },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
