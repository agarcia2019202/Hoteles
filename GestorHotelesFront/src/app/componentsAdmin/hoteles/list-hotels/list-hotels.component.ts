import { Component, DoCheck, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/Hotel';
import { User } from 'src/app/models/user';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import { NotifierService } from 'angular-notifier';
import { CONNECTION } from 'src/app/services/global';
import { Room } from 'src/app/models/room';


@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.css']
})
export class ListHotelsComponent implements OnInit, DoCheck {
  hotel:Hotel;
  user:User;
  token:string;
  hotels:Hotel[];
  usersAdmin:[];
  private readonly notifier;
  uri;
  public hotelSelected;
  public fileRoom:Array<File>;
  public  room;
  userSelected:User;
  constructor(private restHotel: RestHotelService, private restUser: RestUserService, private notifierService:NotifierService,) { 
     
    this.hotel = new Hotel('','',null,'','','','',null,[],[],[],[]);
    this.hotelSelected = new Hotel('','',null,'','','','',null,[],[],[],[]);
    this.user = restUser.getUser();
    this.token = restUser.getToken();
    this.userSelected = new User('','','','','','','','');
    this.notifier = notifierService;
    this.uri = CONNECTION.URI;
    this.room = new Room('','',null,'','','','','','','');
    this.getHotels();
  }

  ngOnInit(): void {
    this.getHotelsRes();
    this.getHotels();
  }

  ngDoCheck(){
    this.getHotels();
  }
  getHotels(){
    this.hotels = JSON.parse(localStorage.getItem("hotels"));
  }

  getHotelsRes(){
    this.restHotel.getHotels().subscribe((res:any)=>{
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
  selectHotel(hotel){
    this.hotelSelected = hotel;
  }


  editHotel(){
    this.restHotel.editHotel(this.hotelSelected._id,this.hotelSelected).subscribe((res:any)=>{
      if(res.hotelUpdate){
        this.notifier.notify("success",res.message);
      
        this.getHotelsRes();
        this.getHotels();
      }else{
        this.notifier.notify("warning",res.message);
        this.getHotels();
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
      this.getHotels();
    })
  }

  setRoom(){
    this.room.status = "Disponible";
    this.restHotel.setRoomHotel(this.hotelSelected._id,this.room).subscribe((res:any)=>{
      if(res.roomSaved){
        this.notifier.notify("success",res.message);
        this.setImageRoom(res.roomSaved._id,this.fileRoom);
        this.getHotelsRes();
        this.getHotels();
        this.getHotelsHome();
      }else{
        this.notifier.notify("warning",res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
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
  setImageRoom(idRoom, files){
    this.restHotel.setImageRoom(idRoom,[],files,this.token, 'image')
    .then((res:any)=>{
      if(res.roomUpdate){

      }else{
        this.notifier.notify("error",res.message);
      }
    })
  }
  fileChange4(fileInput){
    this.fileRoom = <Array<File>>fileInput.target.files;
  }

}
