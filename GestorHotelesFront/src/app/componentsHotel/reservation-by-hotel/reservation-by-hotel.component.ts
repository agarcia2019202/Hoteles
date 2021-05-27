import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';

@Component({
  selector: 'app-reservation-by-hotel',
  templateUrl: './reservation-by-hotel.component.html',
  styleUrls: ['./reservation-by-hotel.component.css']
})
export class ReservationByHotelComponent implements OnInit {
  public reservations:[];
  public rooms:[];
  public hotel;
  public search;
  public readonly notifier;
  constructor(private restReservation:RestReservationService, private restNotifier: NotifierService) { 
    this.getReservation();
    this.getRooms();
    this.notifier = restNotifier;
  }

  ngOnInit(): void {
    this.getHotel();
    this.getReservationsHotel();
  }
  getReservation(){
    this.reservations = JSON.parse(localStorage.getItem("reservationsHotel"));
  }

  updateReservation(updateId){
    let params = {
      "status": "EN CURSO"
    }
    this.restReservation.updateReservation(updateId,params).subscribe((res:any)=>{
      if(res.reservUpdated){
        this.notifier.notify("warning",res.message);
        this.getReservationsHotel();
        
      }else{
        this.notifier.notify("warning",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }

  getReservationsHotel(){
    this.restReservation.getReservationsByHotel(this.hotel._id).subscribe((res:any)=>{
      if(res.reservsFind){
        
        localStorage.setItem("reservationsHotel", JSON.stringify(res.reservsFind))
        this.getReservation();
      }else{
      }
    }, error=>{
      console.log(error)
      this.notifier.notify("error",error.error.message);
    })    
  }

  getRooms(){
    this.rooms = JSON.parse(localStorage.getItem("rooms"));
  }
  getHotel(){
    this.hotel = JSON.parse(localStorage.getItem("hotel"))
  }
}
