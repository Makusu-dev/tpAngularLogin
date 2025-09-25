import { CanActivateFn, Router } from '@angular/router';
import { Userlogin } from '../services/userlogin';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(Userlogin)
  const router = inject(Router)
  const requiredRole = route.data['role'] ?? null;
  
  if(
    loginService.isLoggedIn &&
    loginService.hasRole(requiredRole) &&
    requiredRole !== null
  ){
    return true
  }
  else{
    router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url,
        message: 'Vous devez être connecté',
      },
    });
  }

  return false;
};
