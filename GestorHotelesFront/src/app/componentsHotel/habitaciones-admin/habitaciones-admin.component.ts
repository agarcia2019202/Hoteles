import { Component, DoCheck, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Hotel } from 'src/app/models/Hotel';
import { Room } from 'src/app/models/room';
import { User } from 'src/app/models/user';
import { CONNECTION } from 'src/app/services/global';
import { RestHotelService } from 'src/app/services/restHotel/rest-hotel.service';
import { RestRoomService } from 'src/app/services/restRoom/rest-room.service';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-habitaciones-admin',
  templateUrl: './habitaciones-admin.component.html',
  styleUrls: ['./habitaciones-admin.component.css']
})
export class HabitacionesAdminComponent implements OnInit,DoCheck {
  sidebarStatus;
  public rooms:[];
  public hotel;
  public fileRoom:Array<File>;
  public room;
  public token;
  public readonly notifier;
   search;
  uri;
  public roomSelected;
  constructor(private restUser:RestUserService, private restHotel: RestHotelService, private notifierService:NotifierService, private restRoom:RestRoomService) {
    this.sidebarStatus =1;
    this.notifier= notifierService;
    this.getRooms();

    this.token = restUser.getToken();
    this.hotel = new Hotel('','',null,'','','','',null,null,null, null, null)
    this.room= new Room('','',null,'','','','','0','','Disponible');
    this.roomSelected= new Room('','',null,'','','','','','','');
    this.uri = CONNECTION.URI;
    this.getHotels();
  }

  ngOnInit(): void {
    this.getRooms();
    this.getHotels();
  }
  ngDoCheck(){
    this.getRooms();
  }
  status(status){
    this.sidebarStatus = status;
    document.getElementById("navbarNav2").classList.remove("show");
  }

  getRooms(){
    this.rooms = JSON.parse(localStorage.getItem("rooms"));
  }
  getHotels(){
    this.hotel = JSON.parse(localStorage.getItem("hotel"));
  }
  onSubmit(form){
    this.room.takeRoom = '0';
    console.log(this.room)
    this.restRoom.setRoomHotel(this.hotel._id, this.room).subscribe((res:any)=>{
      if(res.roomSaved){
        this.notifier.notify("success",res.message);
        this.setImageRoom(res.roomSaved._id,this.fileRoom);
        
        form.reset();
      }else{
        this.notifier.notify("warning",res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
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

    this.getRoomsRes();
    this.getRooms();
  }
  
  editRoom(){
    let roomId = this.roomSelected._id;
    delete this.roomSelected._id;
    this.restRoom.editRoom(this.hotel._id, roomId, this.roomSelected).subscribe((res:any)=>{
      if(res.updateRoom){
        this.notifier.notify("success",res.message);
        this.getRoomsRes();
        this.getRooms();
      }else{
        this.notifier.notify("warning",res.message);
      }
    },error=>{
      this.notifier.notify("error",error.error.message);
    })
  }

  select(room){
    this.roomSelected = room;
  }

  getRoomsRes(){
    this.restRoom.getRoomsHotel(this.hotel._id).subscribe((res:any)=>{
      if(res.hotels){
        console.log("hoola")
       localStorage.setItem("rooms",JSON.stringify(res.hotels.rooms));
      }else{
         this.notifier.notify("error",res.message);
      }
    }, error=>{
       this.notifier.notify("error",error.error.message);
    })
  }
  fileChange4(fileInput){
    this.fileRoom = <Array<File>>fileInput.target.files;
  }
}
