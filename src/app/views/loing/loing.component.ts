import { Component } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loing',
  imports: [CommonModule, FormsModule],
  templateUrl: './loing.component.html',
  styleUrl: './loing.component.css'
})
export class LoingComponent {

  correo =  '';
  contrasena = '';
  mensajeError = '';

  constructor( private service: LoginService, private router: Router){}

  login(): void {
    this.service.login(this.contrasena, this.correo).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response); // Depuración

        // Verifica si la respuesta contiene el array `ok` y extrae el ID
        if (response.ok && response.ok.length > 0) {
          const user = response.ok[0]; // Extrae el primer objeto del array `ok`
          const userId = user.id; // Obtén el ID del usuario
          console.log('ID del usuario:', userId);

          // Guarda el usuario en el localStorage
          localStorage.setItem('user', JSON.stringify(user));

          // Redirige a la ruta `/start`
          console.log('Redirigiendo a /start'); // Depuración
          this.router.navigate(['start/proyectos']);
        } else {
          this.mensajeError = 'Error en la autenticación. Respuesta inesperada.';
        }
      },
      (error: any) => {
        console.error('Error en el servidor:', error);
        this.mensajeError = 'Error del servidor. Inténtalo de nuevo más tarde.';
      }
    );
  }

  navigateto(ruta: string) {
    this.router.navigate([ruta]);
  }
}
