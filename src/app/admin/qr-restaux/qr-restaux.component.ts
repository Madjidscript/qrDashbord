import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-qr-restaux',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './qr-restaux.component.html',
  styleUrl: './qr-restaux.component.css'
})
export class QrRestauxComponent implements OnInit {
  data: any[] = [];
  loading: boolean = false;
  private modalRef: any = null;

  constructor(private api: AdminService) {}

  qrForm: FormGroup = new FormGroup({
    number: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.getallqr();
  }

  getallqr() {
    this.loading = true;
    this.api.AllQr().subscribe({
      next: (res: any) => {
        this.data = res.recup;
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openCreateModal() {
    this.qrForm.reset();
    const el = document.getElementById('createQrModal');
    if (el) {
      this.modalRef = new bootstrap.Modal(el);
      this.modalRef.show();
    }
  }

  createQr(event: Event) {
    event.preventDefault();
    if (this.qrForm.invalid) {
      this.showErrorToast('Veuillez saisir un numéro de table');
      return;
    }

    const body = { number: this.qrForm.get('number')?.value };

    this.api.AddQr(body).subscribe({
      next: (res: any) => {
        if (res?.status === 'success') {
          this.getallqr();
          if (this.modalRef) this.modalRef.hide();
          this.showSuccessToast('QR code créé avec succès');
        }
      },
      error: () => this.showErrorToast('Erreur lors de la création du QR')
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
