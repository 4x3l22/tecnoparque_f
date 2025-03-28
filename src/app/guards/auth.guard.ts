import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(LoginService);

  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined'; // Verifica si está en el navegador

  if (isBrowser) {
    const user = service.getUser(); // Obtiene el usuario desde el servicio
    const isLoggedIn = user !== null; // Verifica si el usuario está autenticado

    if (!isLoggedIn) {
      console.log('Usuario no autenticado. Redirigiendo a login...');
      router.navigate(['/login']);
      return false;
    }

    // Si la ruta es 'start', permite el acceso
    if (route.routeConfig?.path === 'start') {
      return true;
    }
    
    setInterval(() => {
      const token = localStorage.getItem('user');
      if (!token) {
        router.navigate(['/login']);
      }
    }, 100);

    console.log('Acceso denegado. Redirigiendo a login...');
    router.navigate(['/login']);
    return false;
  } else {
    console.log('El entorno no es el navegador. Acceso denegado.');
    return false;
  }
};
