import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Hotel } from 'src/app/models/Hotel';
import { User } from 'src/app/models/user';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestInvoicesService } from 'src/app/services/restInvoices/rest-invoices.service';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-admin-hotel',
  templateUrl: './admin-hotel.component.html',
  styleUrls: ['./admin-hotel.component.css']
})
export class AdminHotelComponent implements OnInit {
  navbarStatus;
  public user:User;
  public hotel;
  public room:[];
  public available;
  valor=0;
  public readonly notifier;
  public guest:[];
  public guFount;
  public valueGuest=0;
  constructor(private restUser:RestUserService, private restHotel: RestHotelService, private notifierService:NotifierService, private restRoom:RestRoomService, private restReservation: RestReservationService, private restInvoice: RestInvoicesService) { 
    this.navbarStatus = 1;
    this.user = restUser.getUser();
    this.hotel = new Hotel('','',null,'','','','',null,[],[],[],[]);
    this.notifier = notifierService;
    this.getHotel();
  }

  ngOnInit(): void {
    this.getHotel();
  }
  changeStatus(status){
    this.navbarStatus = status;
  }
  
  getHotel(){
    this.restUser.findHotelAdmin(this.user._id).subscribe((res:any)=>{
      if(res.hotelFind){
        localStorage.setItem("hotel", JSON.stringify(res.hotelFind));
        this.hotel = res.hotelFind;        
        this.getRooms();
        this.getReservationCount();
        this.getInvoiceByHotel();
        this.getReservationsHotel();
        this.getFeatures();
        this.getGuestCount();
      }else{
        this.notifier.notify("warning",res.message);
      }
    },error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
  getFeatures(){
    let features = this.hotel.features;
    localStorage.setItem("features", JSON.stringify(features));
  }
  
  getRooms(){
     this.restRoom.getRoomsHotel(this.hotel._id).subscribe((res:any)=>{
       if(res.hotels){
        this.room = res.hotels.rooms;
        this.getRoomAvailable();
        localStorage.setItem("rooms",JSON.stringify(res.hotels.rooms));
       }else{
          this.notifier.notify("error",res.message);
       }
     }, error=>{
        this.notifier.notify("error",error.error.message);
     })
  }

  getRoomAvailable(){
    this.valor=0;
    for(let room in this.room){
      this.available =  this.room[room];
      this.valor = this.valor + +this.available.availableRoom;
    }
    localStorage.setItem("availableRoom", JSON.stringify(this.valor));
  }

  getReservationCount(){
    
    this.restReservation.getReservationCount(this.hotel._id).subscribe((res:any)=>{
      if(res.countReservs){
        
        localStorage.setItem("reservationCount", JSON.stringify(res.countReservs))
      }else{
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })    
  }
  getGuestCount(){
    
    this.restReservation.getCountGuest(this.hotel._id).subscribe((res:any)=>{
      if(res.huspedes){
        this.guest = res.huspedes;
        this.getGuest();
      }else{
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })    
  }
  getGuest(){
    this.valueGuest=0;
    for(let gu in this.guest){
      this.guFount =  this.guest[gu];
      this.valueGuest = this.valueGuest + +this.guFount.countGuest;
    }
    localStorage.setItem("guestCount", JSON.stringify(this.valueGuest));
  }
  getReservationsHotel(){
    
    this.restReservation.getReservationsByHotel(this.hotel._id).subscribe((res:any)=>{
      if(res.reservsFind){
        
        localStorage.setItem("reservationsHotel", JSON.stringify(res.reservsFind))
      }else{
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })    
  }


  getInvoiceByHotel(){
    this.restInvoice.getInvoicebyHotel(this.hotel._id).subscribe((res:any)=>{
      if(res.invoiceFind){
        localStorage.setItem("invoiceHotel", JSON.stringify(res.invoiceFind))
      }else{

      }
    },error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
}
