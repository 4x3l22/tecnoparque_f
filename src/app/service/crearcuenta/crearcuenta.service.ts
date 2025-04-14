import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrearcuentaService {

  private url = "http://127.0.0.1:5000";
  // private url = "https://tecnoparqueback-production.up.railway.app";

  constructor(private http: HttpClient) { }

  post(data: any) {
    return this.http.post(`${this.url}/register`, data);
  }
}
