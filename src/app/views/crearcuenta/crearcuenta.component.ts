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
      contrasena: this.contrasena,
      rol: 'u' // Asignar rol por defecto como 'u'
    };

    this.service.post(nuevaCuenta).subscribe(
      (response) => {
        debugger
        console.log('Registro exitoso:', response);
      },
      (error) => {
        alert('Error al registrar la cuenta. Por favor, inténtalo de nuevo.');
        console.error('Error al registrar la cuenta:', error);
      }
    );
  }

  navigateTo(ruta: string) {
    this.router.navigate([ruta]);
  }
}
