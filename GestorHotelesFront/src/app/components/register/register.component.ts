import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user:User;
  public status:boolean;
  public userSaved:String;
  public passwordC = "";
  private readonly notifier;

  constructor(private userService: RestUserService, private notifierService:NotifierService, private router:Router) { 
    this.user = new User('','','','','','','','ROLE_USER');
    this.notifier = notifierService;
  }

  ngOnInit(): void {
  }
  onSubmit(register){
    
    this.userService.register(this.user).subscribe((res:any)=>{
        if(res.userSaved){
          this.userSaved = res.userSaved.user;
          this.user = new User('','','','','','','','ROLE_USER');
          this.notifier.notify('success', res.message);
          register.reset();
          this.router.navigate(['/login'])
        }else{
          this.notifier.notify('warning', res.message);
        }
    },
    error=>{
      this.notifier.notify('error', error.error.message);
    })
  }
}
