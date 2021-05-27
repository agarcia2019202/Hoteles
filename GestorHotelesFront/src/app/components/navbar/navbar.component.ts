import { Component, DoCheck, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  show = true;
  showFixed = false;
  public user:User;
  public token:string;
  public role;
  uri;
  constructor(private router: Router, private restUser: RestUserService) { 
      this.user = new User('','','','','','','','');
  }

  ngOnInit(): void {
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
    this.getRole();
  }
  
  ngDoCheck(){
    this.token = this.restUser.getToken();
    this.user = this.restUser.getUser();
    this.getRole();
  }

  getRole(){
    if(this.user == null){
      this.role = null;
    }else{
      this.role = this.user.role;
    }
  }
  logOut(){
    this.token = "";
    localStorage.clear();
    this.router.navigateByUrl("");
  }

  changeClass(){

    let scrollPosition = window.pageYOffset;
    if(scrollPosition != 0){
      if(this.showFixed == false ){
        this.showFixed = true;
        this.show = false;
      }
    }else{
      if(this.show == false ){
        this.show = true;
        this.showFixed = false;
      }
    }

    
  }
  quitarClase(){
    document.getElementById("navbarNav").classList.remove("show");
  }
}
