import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CONNECTION } from "../global";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestFeatureService {

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


  saveFeature(feature,idHotel){
    let params = JSON.stringify(feature);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+idHotel+'/setFeatureHotel',params,{headers:headers})
    .pipe(map(this.extractData));
  }

  setImageFeature(idFeature:string, params:Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject)=>{
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+idFeature+'/uploadImageFeature';
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

  editFeature(hotelId, featureId, feature){
    let params = JSON.stringify(feature);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+hotelId+'/updateFeature/'+featureId,params,{headers:headers})    
    .pipe(map(this.extractData));

  }
  getFeature(hotelId){
    
    
    return this.http.get(this.uri+hotelId+'/getFeatureByHotelHome',this.httpOptions)    
    .pipe(map(this.extractData));

  }

  setFeature(userId,featureId){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.put(this.uri+'updateInvoice/'+userId+'/'+featureId,{},{headers:headers})
    .pipe(map(this.extractData));
  }
}
