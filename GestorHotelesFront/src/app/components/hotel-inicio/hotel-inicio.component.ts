import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { NotifierService } from 'angular-notifier';
import { RestFeatureService } from 'src/app/services/restFeature/rest-feature.service';
import { CONNECTION } from 'src/app/services/global';

@Component({
  selector: 'app-hotel-inicio',
  templateUrl: './hotel-inicio.component.html',
  styleUrls: ['./hotel-inicio.component.css']
})
export class HotelInicioComponent implements OnInit {
  navbarStatus;
  public id;
  public hotel;
  public notifier;
  public uri;

  constructor(private rutaActiva: ActivatedRoute, private restHotel: RestHotelService, notifierService:NotifierService, private restFeature:RestFeatureService){ 
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    
    this.rutaActiva.params.subscribe((params:Params)=>{
      this.id = params.idHotel;
    })
    
    this.getHotel();
    this.navbarStatus =1;
  }

  getHotel(){
    this.restHotel.searchHotel(this.id).subscribe((res:any)=>{
      if(res.hotelFind){
        this.hotel = res.hotelFind;
        localStorage.setItem("searchHotel",JSON.stringify(this.hotel));
        localStorage.setItem("hotelRoom",JSON.stringify(this.hotel.rooms));
        this.getFeatures();
      }else{
        this.notifier.notify("error", res.message);
      } 
    })
  }

  getFeatures(){
    this.restFeature.getFeature(this.hotel._id).subscribe((res:any)=>{
      if(res.hotels){
        localStorage.setItem("featureRoom",JSON.stringify(res.hotels.features));
      }else{
        this.notifier.notify("error", res.message);
      }
    })
  }
  changeStatus(status){
    this.navbarStatus = status;
  }

  
}
