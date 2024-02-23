import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AlmacenarProductoComponent } from './almacenar-producto/almacenar-producto.component';
import { HomeComponent } from './home/home.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';

const routes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'productos', component: ListaProductosComponent},
  {path : 'almacenar-producto', component: AlmacenarProductoComponent},
  {path : 'actualizar-producto/:sku',component : ActualizarProductoComponent},
  {path : '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
