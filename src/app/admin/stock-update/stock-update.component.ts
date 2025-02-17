import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';




declare const bootstrap: any;
declare var $: any;
@Component({
  selector: 'app-stock-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './stock-update.component.html',
  styleUrl: './stock-update.component.css'
})
export class StockUpdateComponent {
  data:any
  name:any
  stockData:FormGroup= new FormGroup({
    nombre: new FormControl("",Validators.required),
    id_Souscat: new FormControl("",Validators.required)
  })
  constructor(private api:AdminService, private activate:ActivatedRoute){}
  ngOnInit() {
    this.name = this.activate.snapshot.paramMap.get("name")
    this.getallsouscath()
  }
  getallsouscath(){
    this.api.AllSousCathe().subscribe({
      next:(res:any)=> {
        
        this.data = res.recup
        console.log("mais souscathe",this.data);
      },
      error:(err:any)=> {
        console.log("mon erreur",err);
        
      },
      complete() {
        console.log("mon api youpi");
      },
    })
  }

  validation(event:Event){
     event.preventDefault()
     console.log("mon data",this.stockData.value);

     this.api.UpdateStock(this.stockData.value).subscribe({
      next:(res:any)=> {
        console.log("ma reponse",res);

        if (res?.status === 'success') {
         this.data=res
          this.showSuccessToast("mise a jour de stock reuissit avec success")
         
          
        } 
        
      },

      error:(err:any)=> {
        console.log("mon erreur",err);

        this.showErrorToast("erreur de mise a jour de stock")
      },
      complete:()=> {
        console.log("mon api youpi");
        
        
      },
    })
     
  }



  //  fonction pour les toast

  showSuccessToast(message: string) {
    const toastBody = document.getElementById('successToastBody');
    if (toastBody) { 
        toastBody.textContent = message; 
        this.stockData.reset()
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
