import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestFeatureService } from 'src/app/services/restFeature/rest-feature.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import {fadeIn} from '../Animations/Animations';
import { RestInvoicesService } from 'src/app/services/restInvoices/rest-invoices.service';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  animations: [fadeIn]
})
export class EventosComponent implements OnInit {
  public features:[];
  public uri;
  public token;
  public user;
  public readonly notifier;
  constructor(private restReservation: RestReservationService, private restUser:RestUserService, private restFeature: RestFeatureService, private restNotifier:NotifierService, private restInvoice: RestInvoicesService) {
    this.token = restUser.getToken();
    this.user = restUser.getUser();
    this.notifier = restNotifier;
   }

  ngOnInit(): void {
    this.getFeatures()
  }

  getFeatures(){
    this.features = JSON.parse(localStorage.getItem("featureRoom"));
    this.uri = CONNECTION.URI;
  }

  saveFeature(idFeature){
    this.restFeature.setFeature(this.user._id, idFeature).subscribe((res:any)=>{
      if(res.pushFeature){
        this.notifier.notify("success", res.message);
        this.getReservationByUser(this.user._id);
        this.getInvoicesRes(this.user._id);
      }else{
        this.notifier.notify("warning", res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })
  }
  getReservationByUser(user){
    console.log("hola")
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

  getInvoicesRes(user){
    this.restInvoice.getInvoice(user).subscribe((res:any)=>{
      if(res.invoicesFind){
        localStorage.setItem("invoicesClient",JSON.stringify(res.invoicesFind));
      }else{
        this.notifier.notify("warning",res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })    
  }

}
