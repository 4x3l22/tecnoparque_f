import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  if (isBrowser) {
    const publicRoutes = ['login', 'crearcuenta']; // 🚀 Rutas que no necesitan autenticación
    const currentRoute = route.routeConfig?.path || '';

    if (publicRoutes.includes(currentRoute)) {
      return true; // ✅ Permitir acceso a estas rutas sin autenticación
    }

    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        const rol = parsedUser.rol;

        // Verifica el rol y redirige según corresponda
        if (rol === 'a' && currentRoute === 'inicioadmin') {
          return true;
        } else if (rol === 'u' && currentRoute === 'start') {
          return true;
        } else {
          console.log('Acceso denegado. Redirigiendo a login...');
          router.navigate(['/login']);
          return false;
        }
      } catch (error) {
        console.error('Error al parsear el token:', error);
        router.navigate(['/login']);
        return false;
      }
    } else {
      console.log('Usuario no autenticado. Redirigiendo a login...');
      router.navigate(['/login']);
      return false;
    }
  } else {
    console.log('El entorno no es el navegador. Acceso denegado.');
    return false;
  }
};
