import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


declare const feather: any;
declare var $: any;
@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent implements OnInit {
  

  constructor(private api: AdminService,private router:Router){}
  data:any
  data2:any
  loading=false

  ngOnInit(){
   
    this.getallcmd()
    console.log("ma page hooo");
    
  }
  

  getallcmd(){
    this.loading=true
    this.api.AllCommande().subscribe({
      next:(res:any)=> {
        this.data=res
        this.data2 = this.data.filter((item:any) => item.statut == true);
        console.log("mais commande",res);

        setTimeout(() => {
          if (typeof $ !== 'undefined') {
            $('table').DataTable({
              dom: '<"d-flex justify-content-between"<"btn-group"B><"search-box"f>>t<"d-flex justify-content-between"ip>',
                          buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
            });
            console.log('jQuery is  availables');
          } else {
            console.log('jQuery is not availables');
          }
      } , 200);
      },
      error:(err:any)=> {
        console.log("mon erreur",err);
        this.loading = false
        
      },
      complete:()=> {
        console.log("mon api youpi");
        this.loading = false
      },
    })

  }

  nav(id: any) {
    this.router.navigate([`/admin/cmd-detail/${id}`]);
  }
}
