import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos: Producto[];
  resultados: Producto[] = []; // Variable para almacenar los resultados de la búsqueda
  terminoBusqueda: string = '';
  mensajeExito: string = '';
  productoEliminado: boolean = false;

  constructor(private productoServicio: ProductoService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  actualizarProducto(sku: string): void {
    this.router.navigate(['actualizar-producto', sku]);
  }

  eliminarProducto(sku: string): void {
    this.productoServicio.eliminarProducto(sku).subscribe(() => {
      // Eliminar el producto antes de establecer el mensaje de éxito
      this.obtenerProductos();
      this.mensajeExito = 'Producto eliminado correctamente';
      this.productoEliminado = true;
  
      // Agrega un temporizador para limpiar el mensaje después de unos segundos
      setTimeout(() => {
        this.mensajeExito = '';
        this.productoEliminado = false;
        this.limpiarBusqueda(); // Limpia la búsqueda después de eliminar el producto
        this.cdr.detectChanges(); // Detectar cambios después de asignar el mensaje
      }, 3000); // Después de 3 segundos (ajusta según sea necesario)
    }, error => {
      console.error('Error al eliminar el producto:', error);
    });
  }
  

  confirmarEliminarProducto(sku: string): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmacion) {
      this.eliminarProducto(sku);
    }
  }

  private obtenerProductos(): void {
    this.productoServicio.obtenerListaDeProductos().subscribe(dato => {
      this.productos = dato;
    });
  }

  buscarProductos(): void {
    if (this.terminoBusqueda.trim() !== '') {
      // Filtrar productos basados en el término de búsqueda
      this.resultados = this.productos.filter(producto =>
        producto.sku.toString().toLowerCase() === this.terminoBusqueda.toLowerCase() ||
        producto.marca.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        producto.precio.toString().includes(this.terminoBusqueda.toLowerCase()) ||
        producto.modelo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        producto.precioVenta.toString().includes(this.terminoBusqueda.toLowerCase())
      );
    } else {
      // Si el campo de búsqueda está vacío, limpiar los resultados
      this.limpiarBusqueda();
    }
  }

  limpiarBusqueda(): void {
    this.resultados = [];
    this.terminoBusqueda = ''; // Limpiar el campo de búsqueda
    this.mensajeExito = '';
    this.productoEliminado = false;
  }
}
