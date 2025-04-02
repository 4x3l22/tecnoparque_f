import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthWatcherService {
  private checkInterval: any;

  constructor(private router: Router) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  startWatching() {
    if (!this.isBrowser()) {
      return;
    }

    this.checkInterval = setInterval(() => {
      const user = localStorage.getItem('user');
      if (!user) {
        console.log('Sesión expirada. Redirigiendo a login...');
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  stopWatching() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}
