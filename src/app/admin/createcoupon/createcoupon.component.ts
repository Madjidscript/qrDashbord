import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';


declare const bootstrap: any;
declare var $: any;
@Component({
  selector: 'app-createcoupon',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './createcoupon.component.html',
  styleUrl: './createcoupon.component.css'
})
export class CreatecouponComponent {
  constructor( private api:AdminService ) {}

  couponForm: FormGroup = new FormGroup({
    code: new FormControl(''),
    reduction: new FormControl(''),
    isPercentage: new FormControl(true),
    expirationDate: new FormControl(''),
    maxUsage: new FormControl('')
  })


  ngOnInit(): void {
    
  }

  createCoupon(event: Event) {
    event.preventDefault();

    if (this.couponForm.invalid) {
      this.showErrorToast("Veuillez remplir tous les champs correctement.");
      return;
    }

    this.api.createcoupon(this.couponForm.value).subscribe({
      next: (res) => {
        this.showSuccessToast("Coupon créé avec succès !");
        this.couponForm.reset({ isPercentage: true });
      },
      error: (err) => {
        this.showErrorToast("Erreur lors de la création du coupon.");
      }
    });
  }

  showSuccessToast(message: string) {
    const toastEl = document.getElementById('successToast');
    const toastBody = document.getElementById('successToastBody');
    if (toastEl && toastBody) {
      toastBody.innerText = message;
      new bootstrap.Toast(toastEl).show();
    }
  }

  showErrorToast(message: string) {
    const toastEl = document.getElementById('errorToast');
    const toastBody = document.getElementById('errorToastBody');
    if (toastEl && toastBody) {
      toastBody.innerText = message;
      new bootstrap.Toast(toastEl).show();
    }
  }
}
