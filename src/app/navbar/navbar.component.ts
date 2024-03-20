import { Component, Input } from '@angular/core';
// import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() addtoggle: any;
  // private sidebar:SidebarComponent  = new SidebarComponent();
  // constructor(private SidebarComponent: SidebarComponent){}


  addToggle(){
    // this.SidebarComponent.addToggle();
    this.addtoggle=!this.addtoggle

    console.log(this.addtoggle);
  }

}
