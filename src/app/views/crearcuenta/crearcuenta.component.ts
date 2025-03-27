import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crearcuenta',
  imports: [FormsModule],
  templateUrl: './crearcuenta.component.html',
  styleUrls: ['./crearcuenta.component.css']
})
export class CrearcuentaComponent {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  onSubmit(): void {
    if (this.contrasena !== this.confirmarContrasena) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    const nuevaCuenta = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena
    };

    console.log('Datos del formulario:', nuevaCuenta);
    // Aquí puedes enviar los datos al backend o realizar otras acciones
  }
}
