import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const token = localStorage.getItem('token')
  if(token != null){
    return true
  }else{
    router.navigate(['/login'])
    return false
  }

};

export const authGuardBack: CanActivateFn = (route, state) => {
  const router = inject(Router)

  const token = localStorage.getItem('token')

  if(token != null){
    return false
  }else{
    return true
  }
}
