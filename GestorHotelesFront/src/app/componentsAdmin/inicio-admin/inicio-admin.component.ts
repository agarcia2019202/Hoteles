import { Component, DoCheck, OnInit } from '@angular/core';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { NotifierService } from 'angular-notifier';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit, DoCheck {
  navbarStatus;
  private readonly notifier;
  public hotel1;
  public hotel2;
  public hotel3;
  public hotels:[];
  constructor(private resHotel:RestHotelService, private notifierService:NotifierService, private restUser: RestUserService, private restReservation:RestReservationService) {
    this.getHotel();
    notifier: notifierService;
    this.getHotels();
    this.getCountUsers();
    this.getCountReservation();
    this.getBestHotel();
    this.getUser();
    this.getCountUsers();
   }

  ngOnInit(): void {
    this.getHotels();
    this.getCountUsers();
    this.getCountReservation();
    this.getBestHotel();
    this.getUser();
    this.getCountUsers();
    this.navbarStatus=1
  }
  ngDoCheck(){
  }
  getHotels(){
    this.resHotel.getHotels().subscribe((res:any)=>{
      if(res.hotels){
        localStorage.setItem("hotels",JSON.stringify(res.hotels))
      }else{
        this.notifier.notify("warning",res.message);
      }
    },
      error=>{
        this.notifier.notify("error",error.error.message);
      }
    )
  }
  getHotel(){
    this.hotels = JSON.parse(localStorage.getItem("hotels"));
    
    if(this.hotels != null){
      this.hotels = JSON.parse(localStorage.getItem("hotels"));
      let x = 0;
      for(let option in this.hotels){
        if(x==0){
          this.hotel1 = this.hotels[option];
        }else if(x==1){
          this.hotel2 = this.hotels[option];
        }else{
          this.hotel3 = this.hotels[option];
          break;
        }
        x++;
      }

      localStorage.setItem("hotel1", this.hotel1.name);
      localStorage.setItem("hotel2", this.hotel2.name);
      localStorage.setItem("hotel3", this.hotel3.name);
      localStorage.setItem("hotel1Reservs", this.hotel1.cantReservs);
      localStorage.setItem("hotel2Reservs", this.hotel2.cantReservs);
      localStorage.setItem("hotel3Reservs", this.hotel3.cantReservs);
    }
    
    
  }
  getUser(){
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res.users){
          localStorage.setItem("users", JSON.stringify(res.users));
      }else{
        this.notifier.notify("warning", res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })
  }
  getCountUsers(){
    this.restUser.countUser().subscribe((res:any)=>{
      if(res.countUsers){
        localStorage.setItem("count", JSON.stringify(res.countUsers))
      }else{
        localStorage.setItem("count", "0");
      }
    })
  }

  getCountReservation(){
    if(this.hotels != null){
      this.restReservation.getCountReservation().subscribe((res:any)=>{
        if(res.countReservs){
          localStorage.setItem("countReservation",JSON.stringify(res.countReservs));
        }else{
          
        }
      }, error=>{
        this.notifier.notify("error", error.error.message);
      })
    }
  }

  getBestHotel(){
    if(this.hotels != null){
      this.resHotel.best1Hotel().subscribe((res:any)=>{
        if(res.hotelFind){
          localStorage.setItem("bestHotel", JSON.stringify(res.hotelFind.name));
        }else{
  
        }
      }, error=>{
        this.notifier.notify("error", error.error.message);
      })
    }
  }
  changeStatus(status){
    this.navbarStatus=status;
  }
}
