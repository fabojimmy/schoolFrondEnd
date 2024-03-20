import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './userAuth/user-service.service';
import { Injectable } from '@angular/core';

// export const loginGuard: CanActivateFn = (route, state) => {


//   return true;
// };
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{
  constructor(private loginSer: UserServiceService, private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   

    // console.log("biennnnnn")
     if(this.loginSer.getRole().toLowerCase()==='Role_APPRENANT'.toLowerCase())
     {
      this.router.navigate(['/dashboard'])

     }
    return true;
  }

}
