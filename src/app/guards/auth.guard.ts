import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(LoginService);

  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  if (isBrowser) {
    const user = localStorage.getItem('user');
    const isLoggedIn = user !== null;

    if (!isLoggedIn) {
      console.log('Usuario no autenticado. Redirigiendo a login...');
      router.navigate(['/login']);
      return false;
    }

    if (route.routeConfig?.path === 'start') {
      return true;
    }

    console.log('Acceso denegado. Redirigiendo a login...');
    router.navigate(['/login']);
    return false;
  } else {
    console.log('El entorno no es el navegador. Acceso denegado.');
    return false;
  }
};

