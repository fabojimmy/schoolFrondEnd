import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InactivityServiceService {
  private inactivityTimeout: any;
  private readonly inactivityDuration=10*60*1000

  constructor(private route:Router) { 
    this.initInactivityTime()
  }


   initInactivityTime(){
    this.resetInactivityTime();

    // console.log(this.resetInactivityTime())
    window.addEventListener('mousemove',this.resetInactivityTime.bind(this));
    window.addEventListener('scroll',this.resetInactivityTime.bind(this));
    
  }
  private resetInactivityTime(){

      clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout =setTimeout(()=>{
        alert("l'utilisateur est inactif depuis 1minutes")
        this.route.navigate(["/login"])
      },this.inactivityDuration)
  }
}
