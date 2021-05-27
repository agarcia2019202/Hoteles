import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-editar-cuenta',
  templateUrl: './editar-cuenta.component.html',
  styleUrls: ['./editar-cuenta.component.css']
})
export class EditarCuentaComponent implements OnInit {
  public user;
  public userRegister;
  public readonly notifier;
  constructor(private restUser:RestUserService, private restNotifier:NotifierService) { 
    this.userRegister = new User('','','','','','','','ROLE_USER');
    this.userRegister = restUser.getUser();
    this.user = restUser.getUser();
    this.notifier = restNotifier;
  }

  ngOnInit(): void {
  }
  updateUser(){
    delete this.userRegister.password;
    delete this.userRegister.role;
    this.restUser.updateUser(this.user._id, this.userRegister).subscribe((res:any)=>{
      if(res.userUpdated){
        this.notifier.notify("success",res.message);
        localStorage.setItem("user",JSON.stringify(res.userUpdated))
      }else{
        this.notifier.notify("warning",res.message);
      }
    },error=>{
      this.notifier.notify("error", error.error.message);
    })
  }
}
