import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';



declare const bootstrap: any;
declare var $: any;
@Component({
  selector: 'app-add-qr',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-qr.component.html',
  styleUrl: './add-qr.component.scss'
})
export class AddQrComponent implements OnInit {
   constructor(private api:AdminService){}
   data:any
  qrdata:FormGroup= new FormGroup({
    number: new FormControl("",Validators.required)
  })
  ngOnInit() {
   
  }

  validation(event:Event){
    console.log("mon data",this.qrdata.value);

    this.api.AddQr(this.qrdata.value).subscribe({
      next:(res:any)=> {
        console.log("ma reponse",res);

        if (res?.status === 'success') {
         this.data=res
         this.showSuccessToast("creation des qr validée")
          
        } 
   
       },

      error:(err:any)=> {
        console.log("mon erreur",err);
       this.showSuccessToast("creation des qr echouer")
        
        
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
        this.qrdata.reset()
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
