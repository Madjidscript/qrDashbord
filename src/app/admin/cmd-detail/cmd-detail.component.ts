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
  distances:any
  plat:any
  alergit:any
  id:any
  num:any
  message:any
  statut:any
  statut2:any
  loading=false
  loc: any;
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

        this.verifierProximiteRestaurant()
        
        
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



  editstatut(statut:any){
    

    this.api.Editstatut(this.id,statut).subscribe({
      next:(res:any)=> {
       

        if (res?.status === 'success') {
         this.showSuccessToast("commande valier")
         console.log("mons data",res);
         this.statut = res
         this.singulcmd()
         
          
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


  calculerDistanceEnMetres(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Rayon de la Terre en mètres
  const toRad = (x: number) => x * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}



  verifierProximiteRestaurant(): void {
  const userLat = this.data.latitude;
  const userLng = this.data.longitude
;

  // Coordonnées fixes du restaurant
  const restauLat = 5.3536;
  const restauLng = -4.0012;

  const distance = this.calculerDistanceEnMetres(userLat, userLng, restauLat, restauLng);
  console.log('Distance entre l\'utilisateur et le restaurant :', distance, 'm');
  this.loc = '✅ Vous êtes dans le périmètre du restaurant.'
  this.distances = distance + 'm'


  if (distance <= 150) {
    this.loc = '✅ Vous êtes dans le périmètre du restaurant.'
    console.log('✅ Vous êtes dans le périmètre du restaurant.');
    // bonne réponse ici (ex: return true, ou set un état, etc.)
  } else {
    console.log('❌ Vous êtes trop loin du restaurant.');
    this.loc = '✅ Vous êtes trop loin du restaurant.'

    // mauvaise réponse ici (ex: return false, ou afficher un message)
  }
}



}
