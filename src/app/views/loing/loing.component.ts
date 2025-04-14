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
        if (response.id) { // Verifica si hay un ID en la respuesta
          localStorage.setItem('user', JSON.stringify(response)); // Guarda el token en localStorage

          // Verifica el rol del usuario
          const rol = response.rol; 
          if (rol === 'a') {
            console.log('Usuario administrador. Redirigiendo a inicioadmin/admin...');
            this.router.navigate(['inicioadmin/admin']);
          } else if (rol === 'u') {
            console.log('Usuario estándar. Redirigiendo a start...');
            this.router.navigate(['start/proyectos']);
          } else {
            console.error('Rol desconocido. Redirigiendo a login...');
            this.mensajeError = 'Rol desconocido. Contacte al administrador.';
            this.router.navigate(['/login']);
          }
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
