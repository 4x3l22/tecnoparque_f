import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrearcuentaService {

  private url = "http://127.0.0.1:5000/api/proceso/";
  // private url = "https://tecnoparque-back.onrender.com/api/proceso/";

  constructor(private http: HttpClient) { }

  post(data: any) {
    return this.http.post(`${this.url}crearcuenta`, data);
  }
}
