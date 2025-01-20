import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  {path:"",component:AuthComponent,
    children:[
      {path:"",redirectTo:"connexion",pathMatch:"full"},
      {path:"connexion",component:ConnexionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
