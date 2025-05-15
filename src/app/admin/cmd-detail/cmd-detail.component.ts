import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../services/socket.services.service';


declare const bootstrap: any;
declare var $: any;
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
  num:any
  message:any
  statut:any
  statut2:boolean =true
  loading=false
  constructor(private api:AdminService, private router:Router, private active:ActivatedRoute,private socket:SocketService){}

  ngOnInit() {
    
    this.singulcmd()

  
  }
  singulcmd(){
    this.loading=true
    this.id = this.active.snapshot.paramMap.get("id")
    this.num = this.active.snapshot.paramMap.get("num")
    console.log("mon id",this.id,"mon num",this.num);

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
         this.showSuccessToast("commande valier")
         
          
        } 
         
  
      },
      error:(err:any)=> {
        console.log("mon erreur",err);
       this.showErrorToast("erreur de validation")
        
        
      },
      complete:()=> {
        console.log("mon api youpi");
        
      },
    })

  }

   

  annule(){
    

    this.api.annulecmd(this.id,this.num).subscribe({
      next:(res:any)=> {
        console.log("mons data",res);
        this.statut = res

        if (res?.status === 'success') {
         this.showSuccessToast("commande annuler")
        //  setTimeout(() => {
        //   this.nav()
        //  }, 3000);

        
          
        } 
         
  
      },
      error:(err:any)=> {
        console.log("mon erreur",err);
       this.showErrorToast("erreur de annulation")
        
        
      },
      complete:()=> {
        console.log("mon api youpi");
        
      },
    })

  }
  

  nav(){
    this.router.navigate(["/admin/commande"])
  }




  //  fonction pour les toast

  showSuccessToast(message: string) {
    const toastBody = document.getElementById('successToastBody');
    if (toastBody) { 
        toastBody.textContent = message; 
      
    } else {
        console.warn('Success toast body element not found.');
    }
    
    const toastElement = document.getElementById('successToast');
    const toast = new bootstrap.Toast(toastElement, { delay: 2000 });
    toast.show();
  }
  
  showErrorToast(message: string) {
    const toastBody = document.getElementById('errorToastBody');
    if (toastBody) { 
        toastBody.textContent = message; 
    } else {
        console.warn('Error toast body element not found.');
    }
    
    const toastElement = document.getElementById('errorToast');
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
  }


}
