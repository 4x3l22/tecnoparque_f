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
          localStorage.setItem('user', JSON.stringify(response));
  
          setTimeout(() => {
            this.router.navigate(['start/proyectos']);
          }, 100);
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
