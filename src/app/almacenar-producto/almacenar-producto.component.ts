import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-almacenar-producto',
  templateUrl: './almacenar-producto.component.html',
  styleUrls: ['./almacenar-producto.component.css']
})
export class AlmacenarProductoComponent implements OnInit {

  producto: Producto = new Producto();
  skuExists: boolean = false;
  camposVacios: boolean = false;
  productoAlmacenado: string | null = null; // Variable para el mensaje de éxito

  constructor(private productoServicio: ProductoService) { }

  ngOnInit(): void {
  }

  almacenarProducto(): void {
    // Verificar campos vacíos
    if (!this.producto.sku || !this.producto.descripcion || !this.producto.modelo || !this.producto.marca || !this.producto.precio || !this.producto.precioVenta) {
      this.camposVacios = true;
      setTimeout(() => { this.camposVacios = false; }, 3000); // Establecer un temporizador para restablecer camposVacios después de 3 segundos
      return;
    }

    // Verificar si el SKU ya existe
    this.productoServicio.verificarSku(this.producto.sku).subscribe(
      existe => {
        if (existe) {
          this.skuExists = true;
          this.productoAlmacenado = null; // Resetear el mensaje de éxito
        } else {
          this.productoServicio.almacenarProducto(this.producto).subscribe(
            (respuesta: any) => { // Utilizamos 'any' para flexibilizar el tipo
              const sku = respuesta?.sku; // Extraer el SKU del objeto de respuesta
              if (sku) {
                console.log(`Producto almacenado correctamente con SKU: ${sku}`);
                this.productoAlmacenado = sku; // Asignar el SKU al producto almacenado
                setTimeout(() => { // Establecer un temporizador para limpiar los campos después de 5 segundos
                  this.producto = new Producto();
                  this.productoAlmacenado = null;
                }, 3000);
              } else {
                console.error('No se pudo obtener el SKU del objeto de respuesta');
                this.productoAlmacenado = null; // Resetear el mensaje de éxito en caso de error
              }
            },
            (error: any) => {
              console.log(error);
              this.productoAlmacenado = null; // Resetear el mensaje de éxito en caso de error
            }
          );
        }
      },
      (error: any) => console.log(error)
    );
  }

  onSubmit(): void {
    this.almacenarProducto();
  }

  resetSkuExists(): void {
    this.skuExists = false;
  }

  verificarSku(): void {
    // Método para verificar si el SKU ya existe mientras el usuario escribe
    if (this.producto.sku) {
      this.productoServicio.verificarSku(this.producto.sku).subscribe(
        existe => {
          this.skuExists = existe;
        },
        error => {
          console.error('Error al verificar el SKU:', error);
        }
      );
    }
  }

}
