import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../sessiervices/session.service';


export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const session = inject(SessionService);

  const adminData = session.verif("qrdashbord");

  if (!adminData) {
    router.navigate(['/auth/connexion']);
    return false;
  }

  return true;
};
