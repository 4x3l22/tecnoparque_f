import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrearcuentaService } from '../../service/crearcuenta/crearcuenta.service';
import { Router } from '@angular/router';

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

  constructor(private service: CrearcuentaService, private router: Router) { }

  register(){
    const nuevaCuenta = {
      nombre: this.nombre,
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.service.post(nuevaCuenta).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.navigateTo('/login'); // Redirige a la página de inicio de sesión
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      (error) => {
        alert('Error al registrar la cuenta. Por favor, inténtalo de nuevo.');
        console.error('Error al registrar la cuenta:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    );
  }

  navigateTo(ruta: string) {
    this.router.navigate([ruta]);
  }
}
