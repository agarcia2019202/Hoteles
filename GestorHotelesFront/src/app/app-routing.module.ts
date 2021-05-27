import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HotelInicioComponent } from './components/hotel-inicio/hotel-inicio.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { LoginComponent } from './components/login/login.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { ReservacionesComponent } from './components/mi-cuenta/reservaciones/reservaciones.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { InicioAdminComponent } from './componentsAdmin/inicio-admin/inicio-admin.component';
import { AdminHotelComponent } from './componentsHotel/admin-hotel/admin-hotel.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path:'not-found',component:NotFoundComponent},
  {path:'HotelInicio/:idHotel', component: HotelInicioComponent},
  {path:'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'reservacion/:idHotel/:idRoom',component:ReservacionComponent},
  {path:'miCuenta',component:MiCuentaComponent},
  {path: 'reservaciones', component:ReservacionesComponent},
  {path: 'InicioAdmin',canActivate: [AdminGuard] ,component:InicioAdminComponent},
  {path: 'Hoteles', component:HotelComponent},
  {path: 'AdminHotel', component:AdminHotelComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
