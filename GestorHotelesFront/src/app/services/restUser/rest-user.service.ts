import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CONNECTION } from "../global";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class RestUserService {
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

  register(user){
    let params = JSON.stringify(user);
    
    return  this.http.post(this.uri+'saveUser',params,this.httpOptions)
    .pipe(map(this.extractData));
  }

  login(user, getToken){
    user.getToken = getToken;
    let params = JSON.stringify(user);

    return this.http.post(this.uri+'login', params, this.httpOptions)
    .pipe(map(this.extractData));
  }

  saveUserbyAdmin(user){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    let params = JSON.stringify(user);

    return this.http.post(this.uri+'saveUserAdmin',params, {headers:headers})
    .pipe(map(this.extractData));
  }


  getUsers(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.get(this.uri+'getUsers',{headers:headers})
    .pipe(map(this.extractData));
    
  }

  countUser(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.get(this.uri+'/countUser',{headers:headers})
    .pipe(map(this.extractData));
  }

  updateUser(idUser, data){
    let params = JSON.stringify(data);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    console.log(this.uri+'updateUser/'+idUser)
    return this.http.put(this.uri+'updateUser/'+idUser,params, {headers:headers})
    .pipe(map(this.extractData));
  }
  findHotelAdmin(userId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    console.log(this.uri+'findUserByHotel/'+userId);
    return this.http.put(this.uri+'findUserByHotel/'+userId,{},{headers:headers})
    .pipe(map(this.extractData));
  }

  getReservation(userId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    console.log(this.uri+'reservsByUser/'+userId)
    return this.http.get(this.uri+'reservsByUser/'+userId, {headers:headers})
    .pipe(map(this.extractData));
  }
}
