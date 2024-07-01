import { Routes } from '@angular/router';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { LoginComponent } from './pages/login/login.component';
import { NavegacionComponent } from './pages/navegacion/navegacion.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { AuthGuard } from './core/auth.guard';
import { TabsComponent } from './core/components/tabs/tabs.component';
import { ModalComponent } from './core/components/dialog/modalc/modalc.component';

export const routes: Routes = [
    {
        path:"inventario",
        component: InventarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"clientes",
        component: ClientesComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"",
        redirectTo: "home",
        pathMatch:"full"
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"home",
        component: NavegacionComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"proveedores",
        component: ProveedoresComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"ventas",
        component: VentasComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"pruebadelmodal",
        component: ModalComponent,
        canActivate: [AuthGuard]
    },
];
