import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {

  const authStatus = inject(AuthserviceService)
  const router = inject(Router)

  if(authStatus.islogged()){
    return true;
    
  }else{
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "Please Login ",

    });
    router.navigateByUrl("")
    return false;
  }

  
};
