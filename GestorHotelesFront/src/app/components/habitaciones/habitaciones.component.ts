import { Component, OnInit } from '@angular/core';
import { CONNECTION } from 'src/app/services/global';
import {fadeIn} from '../Animations/Animations';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css'],
  animations: [fadeIn]
})
export class HabitacionesComponent implements OnInit {
  public rooms:[];
  uri;
  public hotel;
  
  public token;
  constructor() { 
    this.uri = CONNECTION.URI;
    
    this.getRooms();
    this.getToken();
    
  }

  ngOnInit(): void {
    this.getRooms();
    this.getToken();
    this.getHotel();
  }
  
  getRooms(){
    this.rooms = JSON.parse(localStorage.getItem("hotelRoom"));
   
  }

  setRoomSelect(room){
    localStorage.setItem("roomSelected",JSON.stringify(room));
  }

  getToken(){
    this.token = localStorage.getItem("token");
  }
  getHotel(){
    this.hotel = JSON.parse(localStorage.getItem("searchHotel"));
  }
}
