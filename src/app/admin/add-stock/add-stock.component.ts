import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AdminService } from '../../services/admin.service';


declare const bootstrap: any;
declare var $: any;
@Component({
  selector: 'app-add-stock',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.css'
})
export class AddStockComponent implements OnInit {

  constructor(private api:AdminService){}
   data:any
   data2:any
  stockData:FormGroup= new FormGroup({
    nombre: new FormControl("",Validators.required),
    id_Souscat: new FormControl("",Validators.required)
  })
  ngOnInit() {
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

     this.api.AddStock(this.stockData.value).subscribe({
      next:(res:any)=> {
        console.log("ma reponse",res);

        if (res?.status === 'success') {
         this.data2=res
         this.showSuccessToast("creation de stock valider")
      
        }
         
      },

      error:(err:any)=> {
        console.log("mon erreur",err);
       this.showErrorToast("erreur lors de la creation de stock")
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
