import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-stock-update',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './stock-update.component.html',
  styleUrl: './stock-update.component.css'
})
export class StockUpdateComponent {
  data:any
  stockData:FormGroup= new FormGroup({
    nombre: new FormControl("",Validators.required),
    id_Souscat: new FormControl("",Validators.required)
  })
  constructor(private api:AdminService){}
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

     this.api.UpdateStock(this.stockData.value).subscribe({
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
            this.stockData.reset()
            
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
