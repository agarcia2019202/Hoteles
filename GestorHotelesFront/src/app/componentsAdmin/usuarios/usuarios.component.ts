import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/user';
import { RestUserService } from 'src/app/services/restUser/rest-user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  sidebarStatus;
  user:User;
  users:[];
  private readonly notifier;
  roles=['ROLE_ADMIN', 'ROLE_ADMINHOTEL', 'ROLE_USER'];
  constructor(private restUser: RestUserService, private notifierService: NotifierService) {
    this.sidebarStatus=1;
    this.user = new User('','','','','','','','');
    this.notifier = notifierService;
   }

  ngOnInit(): void {
    this.getUser();
  }
  status(status){
    this.sidebarStatus= status;
  }

  onSubmit(form){
    console.log("hola")
    this.restUser.saveUserbyAdmin(this.user).subscribe((res:any)=>{
      if(res.userSaved){
        this.notifier.notify("success", res.message);
        form.reset();
        this.getUserUp();
        this.getUser();
        this.getCountUsers();
      }else{
        this.notifier.notify("warning", res.message);
      }
    },
      error=>{
        this.notifier.notify("error", error.error.message);
      }
    )
  }
  getUser(){
    this.users = JSON.parse(localStorage.getItem("users"));
  }
  getUserUp(){
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res.users){
        this.users = res.users;
      }else{
        this.notifier.notify("warning", res.message);
      }
    }, error=>{
      this.notifier.notify("error", error.error.message);
    })
  }
  getCountUsers(){
    this.restUser.countUser().subscribe((res:any)=>{
      if(res.countUsers){
        localStorage.setItem("count", JSON.stringify(res.countUsers))
      }else{
        localStorage.setItem("count", "0");
      }
    })
  }
}
