import { Component, DoCheck, OnInit } from '@angular/core';
import { Feautures } from 'src/app/models/Feautures';
import { RestFeatureService } from 'src/app/services/restFeature/rest-feature.service';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { NotifierService } from 'angular-notifier';
import { Hotel } from 'src/app/models/Hotel';
import { CONNECTION } from 'src/app/services/global';

@Component({
  selector: 'app-eventos-admin',
  templateUrl: './eventos-admin.component.html',
  styleUrls: ['./eventos-admin.component.css']
})
export class EventosAdminComponent implements OnInit, DoCheck {
  features:[];
  uri;
  featureSelected;
  hotel;
  public user;
  private readonly notifier;
  constructor(private restHotel: RestHotelService, private restFeature:RestFeatureService, private restUser:RestUserService,private notifierService:NotifierService){ 
    this.getFeatures();
    this.user = restUser.getUser();
    this.featureSelected = new Feautures('','','','','','','',null);
    this.uri = CONNECTION.URI;
    this.hotel = new Hotel('','',null,'','','','',null,null,null,null,null);
    this.getHotel();
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.getFeatures();
    this.getHotel();
  }

  ngDoCheck(){
    this.getHotel();
    this.getFeatures()
  }
  setFeatures(){
    let features = this.hotel.features;
    localStorage.setItem("features", JSON.stringify(features));
  }
  getFeatures(){
    this.features = JSON.parse(localStorage.getItem("features"));
  }
  getHotel(){
      this.hotel = JSON.parse(localStorage.getItem("hotel"));
  }
  getHotelRes(){
    this.restUser.findHotelAdmin(this.user._id).subscribe((res:any)=>{
      if(res.hotelFind){
        localStorage.setItem("hotel", JSON.stringify(res.hotelFind));
        this.hotel = res.hotelFind;
        this.setFeatures();
      }else{
        this.notifier.notify("warning",res.message);
      }
    },error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
  selectFeature(feature){
    this.featureSelected = feature;
  }

  editFeature(){
    let hotelId = this.hotel._id;
    let featureId = this.featureSelected._id;
    delete this.featureSelected._id;
    this.restFeature.editFeature(hotelId,featureId,this.featureSelected).subscribe((res:any)=>{
      if(res.updateFeature){
        this.notifier.notify("success", res.message);
        this.getHotelRes();
      }else{
        this.notifier.notify("success",res.message);
      }
    }, error=>{
        this.notifier.notify("error",error.error.message);
    })
  }
}
