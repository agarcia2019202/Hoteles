import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private readonly notifier;
  public hotels:[];
  uri;
  public user;

  public best;

  constructor(private restHotel:RestHotelService,private notifierService:NotifierService) { 
    this.notifier = notifierService;
    
    this.getBest();
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.getHotels();
    this.getBest();
    this.getHotelsHome();
  }
  
  getHotels(){
    this.restHotel.best3Hotel().subscribe((res:any)=>{
      if(res.hotelFind){
        this.hotels = res.hotelFind;
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }

  getBest(){
    this.restHotel.best1Hotel().subscribe((res:any)=>{
      if(res.hotelFind){
        this.best = res.hotelFind;
        console.log(this.best);
      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
  
  getHotelsHome(){
    this.restHotel.getHotelsHome().subscribe((res:any)=>{
      if(res.hotelFind){
        localStorage.setItem("hotelsHome",JSON.stringify(res.hotelFind));

      }else{
        this.notifier.notify("error",res.message);
      }
    }, error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
  getUser(){
    this.user = JSON.parse(localStorage.getItem("user"))
  }
}
