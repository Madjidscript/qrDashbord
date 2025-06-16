import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';


declare const bootstrap: any;
declare var $: any;
@Component({
  selector: 'app-getcoupon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './getcoupon.component.html',
  styleUrl: './getcoupon.component.css'
})
export class GetcouponComponent {

  coupons: any[] = [];
  couponToDeleteId: string | null = null;
  modalInstance: any;
  loading = false;



  constructor(private api: AdminService) {}

  ngOnInit(): void {
    this.loadCoupons();

    const modalEl = document.getElementById('confirmDeleteModal');
    if (modalEl) {
      this.modalInstance = new bootstrap.Modal(modalEl);
    }
  }

  askDeleteCoupon(id: string) {
    this.couponToDeleteId = id;
    this.modalInstance.show();
  }

  loadCoupons() {
    this.loading =true
    this.api.getcoupon().subscribe({
      next: (res: any) => {
        this.coupons = res.coupons || [];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des coupons', err);
    this.loading =false

      },
      complete:()=>  {
            this.loading =false

      },
    });
  }

   confirmDelete() {
    if (!this.couponToDeleteId) return;

    this.api.deletecoupon(this.couponToDeleteId).subscribe({
      next: () => {
        this.coupons = this.coupons.filter(c => c._id !== this.couponToDeleteId);
        this.modalInstance.hide();
        this.couponToDeleteId = null;
      },
      error: (err) => {
        console.error('Erreur suppression', err);
        this.modalInstance.hide();
        this.couponToDeleteId = null;
        this.loadCoupons()
      }
    });
  }

  isExpired(dateStr: string): boolean {
  const now = new Date();
  const expireDate = new Date(dateStr);
  return expireDate < now;
}
}
