import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  private readonly notifier;
  public hotels:[];
  uri;
  public search;
  constructor(private restHotel:RestHotelService,private notifierService:NotifierService) { 
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
    this.getHotel();
  }

  getHotel(){
    this.hotels = JSON.parse(localStorage.getItem("hotelsHome"));
  }

}
