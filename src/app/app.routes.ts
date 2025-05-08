import { Routes } from '@angular/router';
import { LoingComponent } from './views/loing/loing.component';
import { StartComponent } from './views/start/start.component';
import { authGuard } from './guards/auth.guard';
import { InicioComponent } from './views/inicio/inicio.component';
import { CrearcuentaComponent } from './views/crearcuenta/crearcuenta.component';
import { ProyectosComponent } from './views/proyectos/proyectos.component';
import { AdminComponent } from './views/admin/admin.component';
import { AdminhomeComponent } from './views/adminhome/adminhome.component';

export const routes: Routes = [

    
    { 
        path: 'start',
        component: StartComponent,
        canActivate: [authGuard],
        children: [
            { path: 'proyectos', component: ProyectosComponent},
            { path: 'inicio', component: InicioComponent},
            { path: 'admin', component: AdminComponent}
        ]
    },
    {
        path: 'inicioadmin',
        component: AdminhomeComponent,
        canActivate: [authGuard],
        children: [
            {path: 'admin', component: AdminComponent}
        ]
    },
    { path: 'crearcuenta', component: CrearcuentaComponent },
    { path: 'login', component: LoingComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];