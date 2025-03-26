import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITemperaturas } from '../interfaces/ITemperaturas';

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  // private url = "http://127.0.0.1:5000/api/proceso/";
  private url = "https://tecnoparque-back.onrender.com/api/proceso/";

  constructor(private http: HttpClient) { }

  list(): Observable<ITemperaturas[]>{
    return this.http.get<ITemperaturas[]>(`${this.url}documents/datos`);
  }

  list_table(): Observable<ITemperaturas[]>{
    return this.http.get<ITemperaturas[]>(`${this.url}list_end/datos`)
  }

  list_for_date_range(start: string, end: string): Observable<ITemperaturas[]> {
    const params = new HttpParams()
      .set('start_date', start)
      .set('end_date', end);
  
    return this.http.get<ITemperaturas[]>(`${this.url}documents_by_date/datos/datos`, { params });
  }
  
}
