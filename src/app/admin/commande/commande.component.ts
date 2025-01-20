import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';


declare const feather: any;
declare var $: any;
@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit {
  

    constructor(private api: AdminService){}
  ngOnInit(){
    this.datatable()
    this.getallcmd()
    console.log("ma page hooo");
    
  }
  datatable(){
    setTimeout(() => {
      $('table').DataTable(
        {
          dom: '<"d-flex justify-content-between"<"btn-group"B><"search-box"f>>t<"d-flex justify-content-between"ip>',
          buttons: [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ]
        }
      )
    }, 200);
  }

  getallcmd(){
    this.api.AllCommande().subscribe({
      next:(res:any)=> {
        console.log("mais commande",res);
      },
      error:(err:any)=> {
        console.log("mon erreur",err);
        
      },
      complete() {
        console.log("mon api youpi");
      },
    })

  }
}
