import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../service/interfaces/IUsuario';
import { AdminService } from '../../service/admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProyectos } from '../../service/interfaces/IProyectos';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  usuarios: IUsuario[] = [];
  proyectos: IProyectos[] = [];

  nombreProyecto: string = '';
  descripcion: string = '';
  ruta: string = '';
  usuarioId: string = '';
  imagenProyecto: File | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.listarProyectos();
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.adminService.list().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  listarProyectos(): void {
    this.adminService.list_proyects().subscribe(
      (data) => {
        this.proyectos = data;
        console.log('Proyectos:', this.proyectos);
      },
      (error) => {
        console.error('Error al obtener proyectos', error);
      }
    );
  }

  seleccionarImagen(event: any): void {
    if (event.target.files.length > 0) {
      this.imagenProyecto = event.target.files[0];
    }
  }
  
  registrarProyecto(): void {
    if (!this.nombreProyecto.trim() || !this.descripcion.trim() || !this.ruta.trim() || !this.usuarioId.trim() || !this.imagenProyecto) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      const imagenBase64 = reader.result as string;
  
      const proyectoData = {
        nombre_proyecto: this.nombreProyecto,
        descripcion: this.descripcion,
        ruta: this.ruta,
        id_usuario: this.usuarioId,
        img_base64: imagenBase64
      };
  
      this.adminService.post(proyectoData).subscribe(
        (response) => {
          alert('Proyecto registrado con éxito');
          console.log('Respuesta:', response);
  
          const modal = document.getElementById('proyectoModal');
          if (modal) {
            const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
            modalInstance?.hide();
          }
  
          this.nombreProyecto = '';
          this.descripcion = '';
          this.ruta = '';
          this.usuarioId = '';
          this.imagenProyecto = null;
  
          this.listarProyectos();
        },
        (error) => {
          console.error('Error al registrar el proyecto', error);
        }
      );
    };
  
    reader.readAsDataURL(this.imagenProyecto);
  }  

  clearUser() {
    localStorage.removeItem('user');
    console.log('Clave "user" eliminada del localStorage');
  }
}
