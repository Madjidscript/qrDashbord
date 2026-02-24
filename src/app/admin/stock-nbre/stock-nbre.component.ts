import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-stock-nbre',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stock-nbre.component.html',
  styleUrls: ['./stock-nbre.component.css']
})
export class StockNbreComponent implements OnInit {
  stocks: any[] = [];
  sousCathegories: any[] = [];
  loading: boolean = false;
  isEditMode: boolean = false;
  selectedId: string = '';
  private modalRef: any = null;

  constructor(private api: AdminService) {}

  stockForm: FormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    id_Souscat: new FormControl('', Validators.required)
  });

  ngOnInit() {
    this.getAllStock();
    this.getAllSousCath();
  }

  getAllStock() {
    this.loading = true;
    this.api.AllStock().subscribe({
      next: (res: any) => {
        this.stocks = res || [];
      },
      error: () => { this.loading = false; },
      complete: () => { this.loading = false; }
    });
  }

  getAllSousCath() {
    this.api.AllSousCathe().subscribe({
      next: (res: any) => {
        this.sousCathegories = res.recup || [];
      }
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.selectedId = '';
    this.stockForm.reset();
    this.showModal();
  }

  openEditModal(item: any) {
    this.isEditMode = true;
    this.selectedId = item._id;
    this.stockForm.patchValue({
      nombre: item.nombre,
      id_Souscat: item.id_Souscat?._id || item.id_Souscat
    });
    this.showModal();
  }

  private showModal() {
    const el = document.getElementById('stockModal');
    if (el) {
      this.modalRef = new bootstrap.Modal(el);
      this.modalRef.show();
    }
  }

  private hideModal() {
    if (this.modalRef) this.modalRef.hide();
  }

  validation(event: Event) {
    event.preventDefault();
    if (this.stockForm.invalid) {
      this.showErrorToast('Veuillez remplir tous les champs');
      return;
    }

    if (this.isEditMode) {
      const body = {
        _id: this.selectedId,
        nombre: this.stockForm.get('nombre')?.value,
        id_Souscat: this.stockForm.get('id_Souscat')?.value
      };
      this.api.UpdateStock(body).subscribe({
        next: (res: any) => {
          if (res?.status === 'success') {
            this.getAllStock();
            this.hideModal();
            this.showSuccessToast('Stock modifié avec succès');
          }
        },
        error: () => this.showErrorToast('Erreur lors de la modification')
      });
    } else {
      const body = {
        nombre: this.stockForm.get('nombre')?.value,
        id_Souscat: this.stockForm.get('id_Souscat')?.value
      };
      this.api.AddStock(body).subscribe({
        next: (res: any) => {
          if (res?.status === 'success') {
            this.getAllStock();
            this.hideModal();
            this.showSuccessToast('Stock ajouté avec succès');
          }
        },
        error: () => this.showErrorToast('Erreur lors de la création')
      });
    }
  }

  deleteStock(id: string) {
    if (!confirm('Confirmer la suppression de ce stock ?')) return;
    this.api.DeleteStock(id).subscribe({
      next: () => {
        this.getAllStock();
        this.showSuccessToast('Stock supprimé');
      },
      error: () => this.showErrorToast('Erreur lors de la suppression')
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
