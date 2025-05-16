import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../sessiervices/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const session = inject(SessionService);
  const userData = session.verif("qrdashbord");

  if (userData) {
    // Si connecté, rediriger vers /admin
    router.navigate(['/admin']);
    return false;
  }

  return true; // Sinon, accès autorisé
};
