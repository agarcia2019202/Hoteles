import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CONNECTION } from "../global";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestReservationService {
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

  getUser(){
    let user = JSON.parse(localStorage.getItem("user"));

    if(user != null || user != undefined){
      this.user = user;
    }else{
      this.user = null;
    }
    return this.user;
  }

  saveReservation(idHotel, idRoom,idUser, reservation){
      let params = JSON.stringify(reservation);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
      return this.http.post(this.uri+'saveReservation/'+idUser+'/'+idHotel+'/'+idRoom,params,{headers:headers})
      .pipe(map(this.extractData))
  }

  
  getCountReservation(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'countReserv',{headers:headers})
    .pipe(map(this.extractData));
  }

  getReservationCount(hotelId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'countReservByHotel/'+hotelId,{headers:headers})
    .pipe(map(this.extractData));
  }

  availableRoom(hotelId,roomId,data){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(data);

    this.http.put(this.uri+'availableRoom/'+hotelId+'/'+roomId,params,{headers:headers})
    .pipe(map(this.extractData));
    
  }

  cancelReservation(idReservation){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'cancerlarRevserv/'+idReservation,{},{headers:headers})
    .pipe(map(this.extractData));
  }

  updateReservation(idReservation, params){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'updateReservation/'+idReservation,params,{headers:headers})
    .pipe(map(this.extractData));
  }

  updateHotel(idHotel){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'reservsAddHotel/'+idHotel,{},{headers:headers})
    .pipe(map(this.extractData));
  }

  getReservationsByHotel(idHotel){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'reservsByHotel/'+idHotel,{headers:headers})
    .pipe(map(this.extractData));
  }

  getCountGuest(idHotel){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'usersByHotelCount/'+idHotel,{headers:headers})
    .pipe(map(this.extractData));
    
  }
}
