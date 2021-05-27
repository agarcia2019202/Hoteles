import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CONNECTION } from "../global";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestRoomService {
    public uri: string;
    public token;
    public user;
    public status;
  
    public httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  
    public httpOptionsAuth = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
    }
  
    private extractData(res:Response){
      let body = res;
      return body || [] || {};
    }
  
    constructor(private http:HttpClient) { 
      this.uri = CONNECTION.URI;
    }
  
    getToken(){
      let token = localStorage.getItem('token')
      if(token != null || token != undefined){
        this.token = token;
      }else{
        this.token = null;
      }
      return this.token;
    }

    getRoomsHotel(hotelId){
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })

      return this.http.get(this.uri+hotelId+'/getRoomByHotel',{headers:headers})
      .pipe(map(this.extractData));
    }

    setRoomHotel(idHotel,room){
      let params = JSON.stringify(room);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
      return this.http.put(this.uri+idHotel+'/setRoomHotelAdmin',params,{headers:headers})
      .pipe(map(this.extractData))
    }

    editRoom(hotelId, roomId, room){
      let params = JSON.stringify(room);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
      return this.http.put(this.uri+hotelId+'/updateRoomClient/'+roomId,params,{headers:headers})
      .pipe(map(this.extractData));
    }
}
