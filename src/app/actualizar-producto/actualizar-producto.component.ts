import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  producto: Producto = {
    sku: '',
    descripcion: '',
    modelo: '',
    marca: '',
    precio: 0,
    precioVenta: 0,
  };
  sku: string | null = null; // Inicializamos sku como null para evitar errores de undefined

  actualizacionExitosa: boolean = false;

  constructor(private route: ActivatedRoute, private productoService: ProductoService) { }

  ngOnInit(): void {
    // Obtenemos el SKU de la URL
    this.sku = this.route.snapshot.paramMap.get('sku');

    // Verificamos si el SKU es null
    if (this.sku !== null) {
      this.obtenerProducto(this.sku); // Llamamos a la función obtenerProducto con el SKU obtenido
    } else {
      console.error('El SKU proporcionado es nulo.');
    }
  }

  obtenerProducto(sku: string): void {
    this.productoService.obtenerProductoPorSku(sku).subscribe(
      producto => {
        this.producto = producto;
      },
      error => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  actualizarProducto(): void {
    if (this.producto && this.sku) { // Verificamos que producto y sku no sean null
      // Asigna el SKU al producto antes de enviar la solicitud
      this.producto.sku = this.sku;
      
      this.productoService.actualizarProducto(this.sku, this.producto).subscribe(
        () => {
          console.log('Producto actualizado correctamente.');
          this.actualizacionExitosa = true; // Establecer actualizacionExitosa en true
          // Puedes redirigir a otra página después de la actualización si lo deseas

          // Inicia un temporizador para cambiar la variable a falso después de 3 segundos (3000 milisegundos)
          setTimeout(() => {
            this.actualizacionExitosa = false;
          }, 3000); // Cambia el tiempo según lo que desees
        },
        error => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      console.error('No se pudo actualizar el producto porque el producto o el SKU es nulo.');
    }
  }

}
