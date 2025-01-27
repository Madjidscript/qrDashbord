import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cmd-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cmd-detail.component.html',
  styleUrl: './cmd-detail.component.scss'
})
export class CmdDetailComponent implements OnInit {
  data:any
  plat:any
  alergit:any
  id:any
  statut:any
  statut2:boolean =true
  loading=false
  constructor(private api:AdminService, private router:Router, private active:ActivatedRoute){}

  ngOnInit() {
    
    this.singulcmd()
  }
  singulcmd(){
    this.loading=true
    this.id = this.active.snapshot.paramMap.get("id")
    console.log("mon id",this.id);

    this.api.DetailCommande(this.id).subscribe({
      next:(res:any)=> {
        console.log("mon data",res);
        this.data = res.commandes
        this.plat = res.commandes.data
        this.alergit = res.commandes.alergit
        this.statut2 = res.commandes.statut
        
        
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



  editstatut(){
    

    this.api.Editstatut(this.id).subscribe({
      next:(res:any)=> {
        console.log("mons data",res);
        this.statut = res

        if (res?.status === 'success') {
          Swal.fire({
            title: 'Success!',
            text: 'commende valider',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.router.navigate(["/admin/cmd-valider"])
          });
          
        } else {
          Swal.fire({
            title: 'Error!',
            text: res?.message || 'commende non valider',
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#ff6c2f'
          });
         
        }
        
        
      },
      error:(err:any)=> {
        console.log("mon erreur",err);

        Swal.fire({
          title: 'Error!',
          text: err.error_description || 'An error occurred',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#ff6c2f'
        });
        
      },
      complete:()=> {
        console.log("mon api youpi");
        
      },
    })

  }

  nav(){
    this.router.navigate(["/admin/commande"])
  }

}
