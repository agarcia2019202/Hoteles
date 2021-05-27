import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CONNECTION } from "../global";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestHotelService {
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
  
  saveHotel(hotel){
    let params = JSON.stringify(hotel);
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    
    return this.http.post(this.uri+'saveHotel',params,{headers:headers})
    .pipe(map(this.extractData));

  }
  getHotels(){
    this.token = this.getToken();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })

    return this.http.get(this.uri+'getHotelsRooms',{headers: headers})
    .pipe(map(this.extractData));

  }

  getUsersHotel(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'getUsersAdminHotel',{headers:headers})
    .pipe(map(this.extractData));
  }

  setUserHotel(idHotel, userSelected){
    
    let params = JSON.stringify(userSelected);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+idHotel+'/setUserHotel',params,{headers:headers})
    .pipe(map(this.extractData));
  }
  
  setImage(idHotel:string, params:Array<string>, files: Array<File>, token:string, name:string){
      return new Promise((resolve, reject)=>{
        var formData:any = new FormData();
        var xhr = new XMLHttpRequest();
        let uri = this.uri+idHotel+'/uploadImageHotel';
        for(var i=0; i<files.length; i++){
          formData.append(name, files[i], files[i].name);
        }
        xhr.onreadystatechange = () =>{
          if(xhr.readyState ==4){
            if(xhr.status == 2){
              resolve(JSON.parse(xhr.response));
            }else{
              reject(xhr.response);
            }
          }
        }
        xhr.open('PUT', uri, true);
        xhr.setRequestHeader('Authorization',token);
        xhr.send(formData);
      })
  }

  editHotel(idHotel, hotel){
      let params = JSON.stringify(hotel);
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getToken()
      })
      return this.http.put(this.uri+'updateHotel/'+idHotel,params,{headers:headers})
      .pipe(map(this.extractData));
  }
  

  setRoomHotel(idHotel,room){
    let params = JSON.stringify(room);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+idHotel+'/setRoomHotel',params,{headers:headers})
    .pipe(map(this.extractData))
  }

  setImageRoom(idRoom:string, params:Array<string>, files: Array<File>, token:string, name:string){
    
    return new Promise((resolve, reject)=>{
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+idRoom+'/uploadImageRoom';
      console.log(uri)
      for(var i=0; i<files.length; i++){
        formData.append(name, files[i], files[i].name);
      }
      xhr.onreadystatechange = () =>{
        if(xhr.readyState ==4){
          if(xhr.status == 2){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response);
          }
        }
      }
      xhr.open('PUT', uri, true);
      xhr.setRequestHeader('Authorization',token);
      xhr.send(formData);
    })
  }


  best3Hotel(){
    return this.http.get(this.uri+'/best3Hotel',this.httpOptions)
    .pipe(map(this.extractData));
  }
  best1Hotel(){
    return this.http.get(this.uri+'/best1Hotel',this.httpOptions)
    .pipe(map(this.extractData));
  }
  
  getHotelsHome(){
    return this.http.get(this.uri+'/getHotels',this.httpOptions)
    .pipe(map(this.extractData));
  }
  
  searchHotel(id){
    return this.http.get(this.uri+'/searchHotel/'+id,this.httpOptions)
    .pipe(map(this.extractData));
  }
}