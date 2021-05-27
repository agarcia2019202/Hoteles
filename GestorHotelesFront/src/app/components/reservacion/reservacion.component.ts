import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { NotifierService } from 'angular-notifier';
import { RestFeatureService } from 'src/app/services/restFeature/rest-feature.service';
import { CONNECTION } from 'src/app/services/global';
import { Reservations } from 'src/app/models/Reservations';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';
import { RestInvoicesService } from 'src/app/services/restInvoices/rest-invoices.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {
  public id;
  public hotel;
  public notifier;
  public token;
  public roomId;
  public rooms:[];
  public roomName;
  public uri;
  public reservation;
  public user;
  public room;

  constructor(private rutaActiva: ActivatedRoute, private restHotel: RestHotelService, notifierService:NotifierService, private restFeature:RestFeatureService,private restUser:RestUserService, private restReservation: RestReservationService
    , private restInvoice: RestInvoicesService, private restRoom: RestRoomService) {
    this.user = restUser.getUser();
    this.rutaActiva.params.subscribe((params:Params)=>{
      this.id = params.idHotel;
      this.roomId = params.idRoom;
    })
    this.getHotel();
    this.getRooms();  
    
    this.getRoom();
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
    this.reservation = new Reservations('',null,null,null,'',null,null,null,'')
   }
  
   save(){
     if(this.reservation.countRoom > this.room.availableRoom){
        this.notifier.notify("warning","No hay tantas habitaciones disponibles");
     }else{
      this.restReservation.saveReservation(this.hotel._id,this.roomId,this.user._id,this.reservation).subscribe((res:any)=>{
        if(res.reservationComplete){
          this.notifier.notify("success","Se realizó la reservación");
          this.updateReservation();
          this.saveInvoice(res.reservationComplete._id);
          this.updateHotel();
          this.getReservationByUser(this.user._id);
          this.getInvoices(this.user._id);
          this.getInvoicesFeatures(this.user._id)
        }else{
          this.notifier.notify("warning",res.message);
        }
      }, error=>{
          this.notifier.notify("error",error.error.message);
      })
     }
      
   }
   saveInvoice(reserv){
    let date = this.reservation.dateExit;
    let params = {
      "date":date,
      "totalNet":(this.room.priceRoom*this.reservation.countRoom)/1.12,
      "total":this.room.priceRoom*this.reservation.countRoom,
      "hotel": this.hotel._id

    }
    this.restInvoice.saveInvoice(this.user._id,reserv,params).subscribe((res:any)=>{
      if(res.invoiceComplete){
        this.notifier.notify("success","Se generó tu factura, puedes verla en 'mi Cuenta'");
      }else{
        this.notifier.notify("warning",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
    
   }
   updateHotel(){
     this.restReservation.updateHotel(this.hotel._id).subscribe((res:any)=>{
       if(res.hotelUpdated){
       }else{
        this.notifier.notify("warning",res.message);
       }
     }, error=>{
        this.notifier.notify("error",error.error.message);
     })
   }
  updateReservation(){
      let status;
      if((this.room.availableRoom - this.reservation.countRoom) == 0){
        status = "No Disponible";
      }else{
        status = "Disponible";
      }

      let params = {
        "takeRoom": this.room.takeRoom + this.reservation.countRoom,
        "availableRoom": this.room.availableRoom - this.reservation.countRoom,
        "status": status
      }
      this.restRoom.editRoom(this.hotel._id, this.room._id,params).subscribe((res:any)=>{
        if(res.updateRoom){

        }else{
          this.notifier.notify("warning",res.message);
        }
      }, error=>{
        this.notifier.notify("error",error.error.message);
      })
  }
  getRooms(){
    this.rooms = JSON.parse(localStorage.getItem("hotelRoom"));
  }
  ngOnInit(): void {
    this.getHotel();
    this.getRooms();  
  }
  getToken(){
    this.token = localStorage.getItem("token");
  }
  getHotel(){
    this.hotel = JSON.parse(localStorage.getItem("searchHotel"));
  }
  getRoom(){
    this.room = JSON.parse(localStorage.getItem("roomSelected"));
  }

  getReservationByUser(user){
    this.restUser.getReservation(user).subscribe((res:any)=>{
      if(res.reservsFind){
        
        localStorage.setItem("reservationClient",JSON.stringify(res.reservsFind));
      }else{
        this.notifier.notify("warning",res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })
  }

  getInvoices(user){
    this.restInvoice.getInvoice(user).subscribe((res:any)=>{
      if(res.invoicesFind){
        localStorage.setItem("invoicesClient",JSON.stringify(res.invoicesFind));
      }else{

      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })    
  }
  getInvoicesFeatures (user){
    this.restInvoice.getInvoiceFeature(user).subscribe((res:any)=>{
      if(res.invoicesFind){
        localStorage.setItem("invoicesClientFeature",JSON.stringify(res.invoicesFind));
      }else{

      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })    
  }
}
