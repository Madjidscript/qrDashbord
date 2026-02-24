import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-getcoupon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './getcoupon.component.html',
  styleUrl: './getcoupon.component.css'
})
export class GetcouponComponent implements OnInit {
  coupons: any[] = [];
  loading = false;
  couponToDeleteId: string | null = null;
  private deleteModalRef: any = null;
  private createModalRef: any = null;

  constructor(private api: AdminService) {}

  couponForm: FormGroup = new FormGroup({
    code: new FormControl(''),
    reduction: new FormControl(''),
    isPercentage: new FormControl(true),
    expirationDate: new FormControl(''),
    maxUsage: new FormControl('')
  });

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons() {
    this.loading = true;
    this.api.getcoupon().subscribe({
      next: (res: any) => {
        this.coupons = res.coupons || [];
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }
    });
  }

  openCreateModal() {
    this.couponForm.reset({ isPercentage: true });
    const el = document.getElementById('createCouponModal');
    if (el) {
      this.createModalRef = new bootstrap.Modal(el);
      this.createModalRef.show();
    }
  }

  createCoupon(event: Event) {
    event.preventDefault();
    if (!this.couponForm.get('code')?.value) {
      this.showErrorToast('Veuillez saisir un code coupon');
      return;
    }

    this.api.createcoupon(this.couponForm.value).subscribe({
      next: () => {
        this.loadCoupons();
        if (this.createModalRef) this.createModalRef.hide();
        this.showSuccessToast('Coupon créé avec succès');
      },
      error: () => this.showErrorToast('Erreur lors de la création du coupon')
    });
  }

  askDeleteCoupon(id: string) {
    this.couponToDeleteId = id;
    const el = document.getElementById('confirmDeleteModal');
    if (el) {
      this.deleteModalRef = new bootstrap.Modal(el);
      this.deleteModalRef.show();
    }
  }

  confirmDelete() {
    if (!this.couponToDeleteId) return;
    this.api.deletecoupon(this.couponToDeleteId).subscribe({
      next: () => {
        this.coupons = this.coupons.filter(c => c._id !== this.couponToDeleteId);
        this.couponToDeleteId = null;
        if (this.deleteModalRef) this.deleteModalRef.hide();
        this.showSuccessToast('Coupon supprimé');
      },
      error: () => {
        if (this.deleteModalRef) this.deleteModalRef.hide();
        this.couponToDeleteId = null;
        this.loadCoupons();
      }
    });
  }

  showSuccessToast(message: string) {
    const body = document.getElementById('successToastBody');
    if (body) body.textContent = message;
    const el = document.getElementById('successToast');
    if (el) new bootstrap.Toast(el, { delay: 2500 }).show();
  }

  showErrorToast(message: string) {
    const body = document.getElementById('errorToastBody');
    if (body) body.textContent = message;
    const el = document.getElementById('errorToast');
    if (el) new bootstrap.Toast(el, { delay: 3000 }).show();
  }
}
