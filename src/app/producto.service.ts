import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //Esta URL obtiene el listado de todos los productos
  private baseURL = "http://localhost:8081/api/facturacion";

  constructor(private httpClient : HttpClient) { }

  //Este metodo nos sirve para obtener la lista de productos
  obtenerListaDeProductos():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.baseURL}/listarProductos`);
  }


  //Este metodo nos sirve para almacenar un producto
  almacenarProducto(producto:Producto) : Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/listarProductos`,producto);
  }

  //Este metodo sirve para obtener un producto por sku
  obtenerProductoPorSku(sku:string):Observable<Producto>{
    return this.httpClient.get<Producto>(`${this.baseURL}/productos/${sku}`);
  }

  //Este metodo sirve para actualizar un producto
  actualizarProducto(sku:string,producto:Producto) : Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/productos/${sku}`,producto);
  }

  //Este metodo sirve para eliminar un producto
  eliminarProducto(sku:string): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/productos/${sku}`);
  }

  //Este metodo sirve para verificar si el sku ya existe
  verificarSku(sku: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseURL}/verificarSku/${sku}`).pipe(
      catchError(error => {
        console.log('Error al verificar SKU:', error);
        return throwError(error);
      })
    );
  }

//Este es el final
}
