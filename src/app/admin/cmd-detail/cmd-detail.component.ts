import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'util';

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
        this.data = res
        this.plat = res.data
        this.alergit = res.alergit
        this.statut2 = res.statut
        
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
        console.log("mon data",res);
        this.statut = res
        
        
      },
      error:(err:any)=> {
        console.log("mon erreur",err);
        
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
