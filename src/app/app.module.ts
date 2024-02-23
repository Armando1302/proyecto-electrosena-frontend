import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { AlmacenarProductoComponent } from './almacenar-producto/almacenar-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    AlmacenarProductoComponent,
    HomeComponent,
    ProductoDetalleComponent,
    ActualizarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // se utiliza para formularios de tipo plantila
    ReactiveFormsModule //se utiliza para formularios de tipo reactivo
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
