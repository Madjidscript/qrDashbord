import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environnement/environnement.prod';

declare const bootstrap: any;

@Component({
  selector: 'app-add-cathegorie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-cathegorie.component.html',
  styleUrls: ['./add-cathegorie.component.css']
})
export class AddCathegorieComponent implements OnInit {
  categories: any[] = [];
  loading: boolean = false;
  isEditMode: boolean = false;
  selectedId: string = '';
  previewUrl: string | null = null;
  file: File | null = null;
  private modalRef: any = null;
  readonly apiUrl = environment.apiUrl+'/';

  getImageUrl(path: string): string {
    if (!path) return '';
    return path.startsWith('http') ? path : this.apiUrl + path.replace(/\\/g, '/');
  }

  // formatImagePath(path: string): string {
  //   return this.baseUrl + path.replace(/\\/g, '/');
  // }

  constructor(private api: AdminService) {}

  cathegorieData: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.getAllCategories();
  }

  getAllCategories() {
    this.loading = true;
    this.api.AllCathe().subscribe({
      next: (res: any) => {
        this.categories = res.recup || [];
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
    this.isEditMode = false;
    this.selectedId = '';
    this.previewUrl = null;
    this.file = null;
    this.cathegorieData.reset();
    this.showModal();
  }

  openEditModal(item: any) {
    this.isEditMode = true;
    this.selectedId = item._id;
    this.previewUrl = item.image || null;
    this.file = null;
    this.cathegorieData.patchValue({ nom: item.nom });
    this.showModal();
  }

  private showModal() {
    const el = document.getElementById('categorieModal');
    if (el) {
      this.modalRef = new bootstrap.Modal(el);
      this.modalRef.show();
    }
  }

  private hideModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  triggerFileInput() {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    if (input) input.click();
  }

  onFileChange(event: any) {
    const f = event.target.files[0];
    if (f) {
      this.file = f;
      const reader = new FileReader();
      reader.onload = () => { this.previewUrl = reader.result as string; };
      reader.readAsDataURL(f);
    }
  }

  validation(event: Event) {
    event.preventDefault();
    if (this.cathegorieData.invalid) {
      this.showErrorToast('Veuillez saisir le nom de la catégorie');
      return;
    }
    if (!this.isEditMode && !this.file) {
      this.showErrorToast('Veuillez sélectionner une image');
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.cathegorieData.get('nom')?.value);
    if (this.file) formData.append('image', this.file);

    if (this.isEditMode) {
      this.api.UpdateCathe(this.selectedId, formData).subscribe({
        next: (res: any) => {
          if (res?.status === 'success') {
            this.getAllCategories();
            this.hideModal();
            this.showSuccessToast('Catégorie modifiée avec succès');
          }
        },
        error: () => this.showErrorToast('Erreur lors de la modification')
      });
    } else {
      this.api.AddCathe(formData).subscribe({
        next: (res: any) => {
          if (res?.status === 'success') {
            this.getAllCategories();
            this.hideModal();
            this.showSuccessToast('Catégorie créée avec succès');
          }
        },
        error: () => this.showErrorToast('Erreur lors de la création')
      });
    }
  }

  deleteCategorie(id: string) {
    if (!confirm('Confirmer la suppression de cette catégorie ?')) return;
    this.api.DeleteCathe(id).subscribe({
      next: () => {
        this.getAllCategories();
        this.showSuccessToast('Catégorie supprimée');
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
