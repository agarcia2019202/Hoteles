import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import { fadeIn } from '../../Animations/Animations';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  animations: [fadeIn],
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {
  public reservations:[];
  public uri;
  
  constructor() { 
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.reservations = JSON.parse(localStorage.getItem("reservationClient"))
  }

}
