import { Component, OnInit } from '@angular/core';
import { IProyectos } from '../../service/interfaces/IProyectos';
import { ProyectosService } from '../../service/proyectos/proyectos.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  imports: [CommonModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements OnInit {
  proyectos: IProyectos[] = [];
  rutaPermitida: string | null = null; // Ruta permitida obtenida del localStorage

  constructor(private service: ProyectosService, private router: Router) {}

  ngOnInit() {
    this.obtenerRutaPermitida();
    this.list();
  }

  list() {
    this.service.list().subscribe({
      next: (data) => {
        this.proyectos = data;
      },
      error: (error) => {
        console.error('Error al obtener los proyectos:', error);
      }
    });
  }

  navigateTo(ruta: string) {
    this.router.navigate([`start/${ruta}`]);
  }

  obtenerRutaPermitida() {
    const token = localStorage.getItem('user');
    if (token) {
      try {
        const parsedToken = JSON.parse(token); // Convierte el token en un objeto
        this.rutaPermitida = parsedToken.ruta || null; // Obtiene la ruta permitida
      } catch (error) {
        console.error('Error al parsear el token:', error);
        this.rutaPermitida = null;
      }
    }
  }

  // Método para verificar si la ruta es permitida
  esRutaPermitida(ruta: string): boolean {
    return this.rutaPermitida === ruta; // Compara la ruta permitida con la ruta actual
  }

  clearUser() {
    localStorage.removeItem('user');
    console.log('Clave "user" eliminada del localStorage');
  }
}
