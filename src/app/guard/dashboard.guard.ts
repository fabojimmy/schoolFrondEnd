import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../userAuth/user-service.service';

export const dashboardGuard: CanActivateFn = (route, state) => {

  const router =inject(Router)
  const userSer =inject(UserServiceService)

  
  console.log(userSer.isLoggedInte()+""+userSer.DateExpiration())
  if(userSer.isLoggedInte()&&userSer.DateExpiration()){
         
         return true;
    }
    else
    {
      console.log("biennoooooojiidsjdk")
      router.navigate(["/login"])
    }
  return true;
};
