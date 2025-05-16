import { Routes } from '@angular/router';
import { authGuard } from './guard/auth/auth.guard';
import { adminGuard } from './guard/admin/admin.guard';

export const routes: Routes = [
    
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'admin', canActivate: [adminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'auth', canActivate: [authGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '**', redirectTo: '/auth', pathMatch: 'full' }

    // canActivate: [AuthGuard],

];
