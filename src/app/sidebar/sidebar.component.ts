import { Component, Input } from '@angular/core';
import { UserServiceService } from '../userAuth/user-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  private tokenKey:string="token";
  constructor(private userService:UserServiceService){

  }

  @Input() status: boolean=true;
  //   public status = false;
  //   addToggle()
  //   {
  //     this.status = !this.status;       
  // }

  removeToken(){
    console.log("remove supp")
    const token:string|null = localStorage.getItem("token")
    console.log("LaBo: "+token)
    this.userService.removeToken(token);
  }

}
