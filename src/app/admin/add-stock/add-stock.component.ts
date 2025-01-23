import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';

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
          
            
          Swal.fire({
            title: 'Success!',
            text: 'stock add enregistrer',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.stockData.reset()
            
          });
          
        } else {
          Swal.fire({
            title: 'Error!',
            text: res?.message || 'stock add failed',
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
