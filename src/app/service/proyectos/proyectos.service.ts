import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProyectos } from '../interfaces/IProyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private url = "http://127.0.0.1:5000";
  // private url = "https://tecnoparqueback-production.up.railway.app/api/proceso/";

  constructor(private http: HttpClient) { }

  list(): Observable<IProyectos[]> {
    return this.http.get<IProyectos[]>(`${this.url}/proyectos`);
  }
  
}
