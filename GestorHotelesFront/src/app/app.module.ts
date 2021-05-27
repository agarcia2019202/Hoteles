import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FontAwesomeModule } from '@fortawesome/fontawesome-free';
import { ImgFooterComponent } from './components/img-footer/img-footer.component';
import { FooterComponent } from './components/footer/footer.component';
import { HotelInicioComponent } from './components/hotel-inicio/hotel-inicio.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";

import { NotifierModule,NotifierOptions } from "angular-notifier";
import {BrowserAnimationsModule  } from "@angular/platform-browser/animations";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { ReservacionesComponent } from './components/mi-cuenta/reservaciones/reservaciones.component';
import { EditarCuentaComponent } from './components/mi-cuenta/editar-cuenta/editar-cuenta.component';
import { InicioAdminComponent } from './componentsAdmin/inicio-admin/inicio-admin.component';
import { HotelesComponent } from './componentsAdmin/hoteles/hoteles.component';
import { UsuariosComponent } from './componentsAdmin/usuarios/usuarios.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { GraficasComponent } from './componentsAdmin/graficas/graficas.component';
import { ChartsModule } from 'ng2-charts';
import { AdminHotelComponent } from './componentsHotel/admin-hotel/admin-hotel.component';
import { InicioComponent } from './componentsHotel/inicio/inicio.component';
import { HabitacionesAdminComponent } from './componentsHotel/habitaciones-admin/habitaciones-admin.component';
import { RestUserService } from './services/restUser/rest-user.service';
import { ListHotelsComponent } from './componentsAdmin/hoteles/list-hotels/list-hotels.component';
import { EventosServiciosComponent } from './componentsHotel/eventos-servicios/eventos-servicios.component';
import { AgregarComponent } from './componentsHotel/eventos-servicios/agregar/agregar.component';
import { EventosAdminComponent } from './componentsHotel/eventos-servicios/eventos-admin/eventos-admin.component';
import { PipesPipe } from './pipes/pipes.pipe';
import { SearchPipe } from './pipes/pipeHotel/search.pipe';
import { ReservationByHotelComponent } from './componentsHotel/reservation-by-hotel/reservation-by-hotel.component';
import { SearchReservationPipe } from './pipes/pipeReservation/search-reservation.pipe';
import { SearchFacPipe } from './pipes/pipeFac/search-fac.pipe';
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    CarouselComponent,
    ImgFooterComponent,
    FooterComponent,
    HotelInicioComponent,
    HabitacionesComponent,
    EventosComponent,
    ServiciosComponent,
    LoginComponent,
    RegisterComponent,
    ReservacionComponent,
    MiCuentaComponent,
    ReservacionesComponent,
    EditarCuentaComponent,
    InicioAdminComponent,
    HotelesComponent,
    UsuariosComponent,
    HotelComponent,
    GraficasComponent,
    AdminHotelComponent,
    InicioComponent,
    HabitacionesAdminComponent,
    ListHotelsComponent,
    EventosServiciosComponent,
    AgregarComponent,
    EventosAdminComponent,
    PipesPipe,
    SearchPipe,
    ReservationByHotelComponent,
    SearchReservationPipe,
    SearchFacPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [RestUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
