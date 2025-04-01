import { Component, OnInit } from '@angular/core';
import { IProyectos } from '../../service/interfaces/IProyectos';
import { ProyectosService } from '../../service/proyectos/proyectos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proyectos',
  imports: [CommonModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements OnInit{

  proyectos: IProyectos[] = [];


  constructor(private service: ProyectosService) { }

  ngOnInit() {
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
}
