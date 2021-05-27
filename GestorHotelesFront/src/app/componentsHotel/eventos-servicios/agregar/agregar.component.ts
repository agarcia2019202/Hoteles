import { Component, OnInit } from '@angular/core';
import { Feautures } from 'src/app/models/Feautures';
import { RestFeatureService } from 'src/app/services/restFeature/rest-feature.service';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { NotifierService } from 'angular-notifier';
import { Hotel } from 'src/app/models/Hotel';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  public feature: Feautures;
  public hotel;
  public token;
  public user;
  public fileFeature:Array<File>;
  private readonly notifier;
  constructor(private restHotel: RestHotelService, private restFeature:RestFeatureService, private restUser:RestUserService,private notifierService:NotifierService) { 
    this.feature = new Feautures('','','','','','','',null);
    this.hotel = new Hotel('','',null,'','','','',null,null,null,null,null);
    this.getHotel();
    this.user = restUser.getUser();
    this.token = restUser.getToken();
    this.notifier= notifierService;
  }

  getHotel(){
    this.hotel = JSON.parse(localStorage.getItem("hotel"));
    this.getFeatures();
  }
  getHotelRes(){
   
    this.restUser.findHotelAdmin(this.user._id).subscribe((res:any)=>{
      if(res.hotelFind){
        localStorage.setItem("hotel", JSON.stringify(res.hotelFind));
        this.hotel = res.hotelFind;
      }else{
        this.notifier.notify("warning",res.message);
      }
    },error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
  ngOnInit(): void {
    this.getHotel();
  }
  onSubmit(form){
      this.restFeature.saveFeature(this.feature,this.hotel._id).subscribe((res:any)=>{
        if(res.featureSaved){
          this.notifier.notify("success",res.message);
          form.reset();
          this.setImageFeature(res.featureSaved._id,this.fileFeature);
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
  setImageFeature(idFeature, files){
    this.restFeature.setImageFeature(idFeature,[],files,this.token, 'image')
    .then((res:any)=>{
      if(res.roomUpdate){
      }else{
        this.notifier.notify("error",res.message);
      }
    })
    this.getHotelRes();
    this.getHotel();
  }
  fileChange4(fileInput){
    this.fileFeature = <Array<File>>fileInput.target.files;
  }
}
