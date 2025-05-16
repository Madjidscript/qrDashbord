import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { SessionService } from '../../sessiervices/session.service';


declare const bootstrap: any;
declare var $: any;
@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent implements OnInit {
  constructor(private api:AdminService,private router:Router,private storage:SessionService){}

  formdata:FormGroup = new FormGroup({
    email:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required)
  })
  ngOnInit(): void {
   
  }

  login(){
    // if (res.admin_infos) {
    //   this.storage.setItem('admin_appolo', JSON.stringify(res.admin_infos))
    //   // sessionStorage.setItem('admin_infos', JSON.stringify(res.admin_infos));
    // } else {
    //   console.error('admin_infos is missing in the response');
    // }

    this.api.Connexion(this.formdata.value).subscribe({
      next:(res:any)=> {
        console.log("res",res);
        this.showSuccessToast("connexion reuissit avec success")

        if (res.data) {
      // this.storage.setItem('qrdashbord', JSON.stringify(res.data))
      sessionStorage.setItem('qrdashbord', JSON.stringify(res.data));
      this.router.navigate(["/admin"])
    } else {
      console.error('qrdashbord is missing in the response');
    }
        
      },
      error:(err:any)=> {
        console.log("err",err);
        this.showErrorToast("error de connexion")
        
      },
      complete:()=> {
        console.log("super");
        
      },
    })

  }



  //  fonction pour les toast

  showSuccessToast(message: string) {
    const toastBody = document.getElementById('successToastBody');
    if (toastBody) { 
        toastBody.textContent = message; 
        this.formdata.reset()
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
