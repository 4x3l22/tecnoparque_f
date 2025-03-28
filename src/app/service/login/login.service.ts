import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private url = "http://127.0.0.1:5000/login";
  private url = "https://tecnoparque-back-f7ch.onrender.com/login";
  private userKey = 'user';

  constructor(private http: HttpClient) { }

  login(contrasena: string, correo: string): Observable<any> {
    const body = { contrasena, correo };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.url, body, { headers })
      .pipe(
        tap(response => {
          if (response && response.success) {
            if (this.isBrowser()) {
              localStorage.setItem(this.userKey, JSON.stringify(response, null, 2));
            }
          }
        }),
        catchError(error => {
          console.error('Error en la solicitud de inicio de sesión:', error);
          return throwError(() => new Error(error.message || 'Error en el servidor'));
        })
      );
  }

  logOut(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.userKey);
    }
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      const userData = localStorage.getItem(this.userKey);
      return userData !== null;
    }
    return false;
  }

  getUser(): any {
    if (this.isBrowser()) {
      const user = localStorage.getItem(this.userKey);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

}
