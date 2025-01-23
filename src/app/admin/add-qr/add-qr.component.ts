import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

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
          
            
          Swal.fire({
            title: 'Success!',
            text: 'stock update enregistrer',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.qrdata.reset()
            
          });
          
        } else {
          Swal.fire({
            title: 'Error!',
            text: res?.message || 'stock update failed',
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

}
