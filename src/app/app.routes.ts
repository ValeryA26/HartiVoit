import { Routes } from '@angular/router';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { LoginComponent } from './pages/login/login.component';
import { NavegacionComponent } from './pages/navegacion/navegacion.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { TabsComponent } from './core/components/tabs/tabs.component';

export const routes: Routes = [
    {
        path:"inventario",
        component: InventarioComponent
    },
    {
        path:"clientes",
        component: ClientesComponent
    },
    {
        path:"",
        component: LoginComponent
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"home",
        component: NavegacionComponent
    },
    {
        path:"proveedores",
        component: ProveedoresComponent
    },
    {
        path:"ventas",
        component: VentasComponent
    },
];
