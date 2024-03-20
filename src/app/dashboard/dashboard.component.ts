import { Component } from '@angular/core';
import { InactivityServiceService } from '../inactivity-service.service';
import { UserServiceService } from '../userAuth/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private inactivi:InactivityServiceService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.inactivi.initInactivityTime();
    
  }

  statusd = false;
addToggle()
{
  // this.statusd = !this.statusd;       
}



}
