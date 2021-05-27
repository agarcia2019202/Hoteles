import { Component, DoCheck, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { RestInvoicesService } from 'src/app/services/restInvoices/rest-invoices.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, DoCheck {
  public reservCount;
  public invoiceFac:[];
  public available;
  public reservations:[];
  public features:[];
  public guest;
  public hotel;
  public search;
  public rooms:[]= JSON.parse(localStorage.getItem("rooms"));
  public readonly notifier;
  constructor(private restIvoice: RestInvoicesService,restNotifier:NotifierService) { 
      this.notifier = restNotifier;
      this.getRooms();
      this.getHotel();
  }

  ngDoCheck(){
    this.getInvoices();
    this.getRooms();
  }
  ngOnInit(): void {
    this.getReservationCount();
    this.getAvailableRooms();
    this.getCountGuest();
    this.getInvoices();
    this.getRerservations();
    this.getHotel();
    this.getInvoiceByHotel();
    this.getRooms();
  }
  getReservationCount(){
    this.reservCount = localStorage.getItem("reservationCount");
  }
  getAvailableRooms(){
    this.available = localStorage.getItem("availableRoom");
  }

  getCountGuest(){
    this.guest = localStorage.getItem("guestCount");
  }

  getInvoices(){
    this.invoiceFac = JSON.parse(localStorage.getItem("invoiceHotel"));
  }
  getHotel(){
    this.hotel = JSON.parse(localStorage.getItem("hotel"));
  }
  getRerservations(){
    this.reservations = JSON.parse(localStorage.getItem("reservationsHotel"));
  }


  payInvoice(idInvoice, idUser){
    this.restIvoice.payInvoice(idInvoice,idUser).subscribe((res:any)=>{
      if(res.invoiceUpdate){
        this.notifier.notify("success", res.message);
        this.getInvoiceByHotel();
        this.getInvoices();
      }else{
        this.notifier.notify("warning", res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })

  }

  getRooms(){
    this.rooms = JSON.parse(localStorage.getItem("rooms"));
  }

  getInvoiceByHotel(){
    this.restIvoice.getInvoicebyHotel(this.hotel._id).subscribe((res:any)=>{
      if(res.invoiceFind){
        localStorage.setItem("invoiceHotel", JSON.stringify(res.invoiceFind))
      }else{

      }
    },error=>{
      this.notifier.notify("error",error.error.message);
    })
  }
}
