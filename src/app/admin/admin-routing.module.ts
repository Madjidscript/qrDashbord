import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AddCathegorieComponent } from './add-cathegorie/add-cathegorie.component';

import { AddSouscathegorieComponent } from './add-souscathegorie/add-souscathegorie.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { StockUpdateComponent } from './stock-update/stock-update.component';
import { CommandeComponent } from './commande/commande.component';
import { StockNbreComponent } from './stock-nbre/stock-nbre.component';
import { QrRestauxComponent } from './qr-restaux/qr-restaux.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { CmdDetailComponent } from './cmd-detail/cmd-detail.component';
import { CmdValiderComponent } from './cmd-valider/cmd-valider.component';

const routes: Routes = [
  {path:"",component:AdminComponent,
    children:[
      {path:"",redirectTo:"dashbord",pathMatch:"full"},
      {path:"dashbord",component:DashbordComponent},
      {path:"addAdmin",component:AddAdminComponent},
      {path:"addcathegorie",component:AddCathegorieComponent},
      {path:"addsouscathegorie",component:AddSouscathegorieComponent},
      {path:"addstock",component:AddStockComponent},
      {path:"updatestock",component:StockUpdateComponent},
      {path:"stocknbre",component:StockNbreComponent},
      // {path:"addsouscathegorie",component:AddSouscathegorieComponent},
      {path:"commande",component:CommandeComponent},
      {path:"cmd-detail/:id",component:CmdDetailComponent},
      {path:"cmd-valider",component:CmdValiderComponent},
      {path:"restauxqr",component:QrRestauxComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
