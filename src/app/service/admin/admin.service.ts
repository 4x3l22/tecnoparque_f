import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';
import { IProyectos } from '../interfaces/IProyectos';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = "http://127.0.0.1:5000";
  // private url = "https://tecnoparqueback-production.up.railway.app/api/proceso/";

  constructor(private http: HttpClient) { }

  list(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.url}/usuarios`);
  }

  list_proyects(): Observable<IProyectos[]> {
    return this.http.get<IProyectos[]>(`${this.url}/proyectos`);
  }

  post(data: any): Observable<any> {
    return this.http.post(`${this.url}/proyecto`, data);
  }
}
