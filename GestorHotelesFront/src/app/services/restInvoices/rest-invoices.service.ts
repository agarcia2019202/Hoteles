import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CONNECTION } from "../global";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestInvoicesService {
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

  saveInvoice(userId, reservsId, invoice){
    let params = JSON.stringify(invoice);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })

    return this.http.post(this.uri+'saveInvoice/'+userId+'/'+reservsId,params,{headers:headers})
    .pipe(map(this.extractData));
  
  }

  getInvoice(userId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'invoiceGet/'+userId,{headers:headers})
    .pipe(map(this.extractData));
  }
  getInvoiceFeature(userId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'invoiceGetFeature/'+userId,{headers:headers})
    .pipe(map(this.extractData));
  }

  getInvoicebyHotel(hotelId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.get(this.uri+'invoiceByHotel/'+hotelId,{headers:headers})
    .pipe(map(this.extractData));
  }

  payInvoice(invoiceId, userId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })

    return this.http.put(this.uri+'payInvoice/'+userId+'/'+invoiceId,{},{headers:headers})
    .pipe(map(this.extractData))
  }
}
