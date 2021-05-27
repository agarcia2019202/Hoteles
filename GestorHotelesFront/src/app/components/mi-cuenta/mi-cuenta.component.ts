import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Reservations } from 'src/app/models/Reservations';
import { RestInvoicesService } from 'src/app/services/restInvoices/rest-invoices.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

import { CONNECTION } from 'src/app/services/global';
import { RestReservationService } from 'src/app/services/restReservation/rest-reservation.service';
import { fadeIn } from '../Animations/Animations';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  navStatus;
  public reservations:[];
  public Invoices:[];
  public reservationSelected;
  public uri;
  public user;
  public features;
  public invoicesFeatures;
  private readonly notifier;
  constructor(private restReservation: RestReservationService, private restNotifier: NotifierService, private restUserService: RestUserService,  private restInvoice: RestInvoicesService) {
    this.notifier = restNotifier;
    this.user = restUserService.getUser();
    this.getInvoicesFeature();
  }

  ngOnInit(): void {
    this.navStatus = 1;
    this.uri = CONNECTION.URI;
    this.getReservations();
    this.getInvoices();
    this.getInvoicesFeature();
  }

  changeNav(status){
    this.navStatus = status;
  }
  getReservations(){
    this.reservations = JSON.parse(localStorage.getItem("reservationClient"))
  }
  getInvoices(){
    this.Invoices = JSON.parse(localStorage.getItem("invoicesClient"))
  }
  getInvoicesFeature(){
    this.invoicesFeatures = JSON.parse(localStorage.getItem("invoicesClientFeature"))
  }
  cancelReservation(){
    this.restReservation.cancelReservation(this.reservationSelected).subscribe((res:any)=>{
      if(res.reservUpdated){
        this.notifier.notify("warning", res.message);
        this.getReservationByUser(this.user._id);
        this.getInvoicesRes(this.user._id);
        
      }else{
        this.notifier.notify("warning", res.message)
      }
    }, error=>{
      this.notifier.notify("error", error.error.message)
    })      
  }
  getReservationByUser(user){
    console.log("hola")
    this.restUserService.getReservation(user).subscribe((res:any)=>{
      if(res.reservsFind){
        this.notifier.notify("success",res.message);
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
        this.notifier.notify("success",res.message);
        localStorage.setItem("invoicesClient",JSON.stringify(res.invoicesFind));
        this.getReservations();
        this.getInvoices();
      }else{
        this.notifier.notify("warning",res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })    
  }
  changeSelect(optionId){
    this.reservationSelected = optionId;
  }

  
}
