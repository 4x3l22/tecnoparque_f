import { Routes } from '@angular/router';
import { LoingComponent } from './views/loing/loing.component';
import { StartComponent } from './views/start/start.component';
import { authGuard } from './guards/auth.guard';
import { InicioComponent } from './views/inicio/inicio.component';
import { CrearcuentaComponent } from './views/crearcuenta/crearcuenta.component';
import { ProyectosComponent } from './views/proyectos/proyectos.component';

export const routes: Routes = [
    { path: 'login', component: LoingComponent},
    { path: 'crearcuenta', component: CrearcuentaComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { 
        path: 'start',
        component: StartComponent,
        canActivate: [authGuard],
        children: [
            { path: 'inicio', component: InicioComponent},
            { path: 'proyectos', component: ProyectosComponent}
        ]
    }
];
