import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


declare const feather: any;
declare var $: any;
@Component({
  selector: 'app-stock-nbre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-nbre.component.html',
  styleUrl: './stock-nbre.component.css'
})
export class StockNbreComponent implements OnInit {

  data:any
  loading=false

  constructor(private api:AdminService,private router:Router){}
  ngOnInit(){
    this.datatable()
    console.log("ma page hooo");
    
  }
  datatable(){
   this.getallstock()
  }

  getallstock(){
    this.loading=true
    this.api.AllStock().subscribe({
     
        next:(res:any)=> {
          this.data = res
          console.log("mais stock",this.data);

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
        },
        error:(err:any)=> {
          console.log("mon erreur",err);
          this.loading=false
          
        },
        complete:()=> {
          console.log("mon api youpi");
          this.loading=false
        },
      
    })
  }

  nav(){
   this.router.navigate(["/admin/updatestock"])
  }

}
