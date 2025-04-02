import { Component } from '@angular/core';
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
export class AdminComponent {

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
    console.log("Nombre Proyecto:", this.nombreProyecto);
    console.log("Descripción:", this.descripcion);
    console.log("Ruta:", this.ruta);
    console.log("Usuario ID:", this.usuarioId);
    console.log("Imagen:", this.imagenProyecto);
  
    if (!this.nombreProyecto.trim() || !this.descripcion.trim() || !this.ruta.trim() || !this.usuarioId.trim() || !this.imagenProyecto) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    const formData = new FormData();
    formData.append('nombre_proyecto', this.nombreProyecto);
    formData.append('descripcion', this.descripcion);
    formData.append('ruta', this.ruta);
    formData.append('id_usuario', this.usuarioId);
    formData.append('img', this.imagenProyecto);
  
    this.adminService.post(formData).subscribe(
      (response) => {
        alert('Proyecto registrado con éxito');
        console.log('Respuesta:', response);
  
        // Cerrar el modal
        let modal = document.getElementById('proyectoModal');
        if (modal) {
          // Ensure Bootstrap is globally available
          const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
          modalInstance?.hide();
        }
  
        // Limpiar formulario
        this.nombreProyecto = '';
        this.descripcion = '';
        this.ruta = '';
        this.usuarioId = '';
        this.imagenProyecto = null;
  
        // Recargar la lista de proyectos
        this.listarProyectos();
      },
      (error) => {
        console.error('Error al registrar el proyecto', error);
      }
    );
  }  

  clearUser() {
    localStorage.removeItem('user');
    console.log('Clave "user" eliminada del localStorage');
  }
}
