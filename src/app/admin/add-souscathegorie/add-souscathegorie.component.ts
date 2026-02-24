import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environnement/environnement.prod';

declare const bootstrap: any;

@Component({
  selector: 'app-add-souscathegorie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-souscathegorie.component.html',
  styleUrls: ['./add-souscathegorie.component.css']
})
export class AddSouscathegorieComponent implements OnInit {
  sousCathegories: any[] = [];
  categories: any[] = [];
  loading: boolean = false;
  isEditMode: boolean = false;
  selectedId: string = '';
  previewUrl: string | null = null;
  file: File | null = null;
  private modalRef: any = null;
  readonly apiUrl = environment.apiUrl + '/';

  getImageUrl(path: string): string {
    if (!path) return '';
    return path.startsWith('http') ? path : this.apiUrl + path.replace(/\\/g, '/');
  }

  constructor(private api: AdminService) {}

  sousCathegorieData: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    id_cath: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.getAllSousCathegories();
    this.getAllCategories();
  }

  getAllSousCathegories() {
    this.loading = true;
    this.api.AllSousCathe().subscribe({
      next: (res: any) => {
        this.sousCathegories = res.recup || [];
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  getAllCategories() {
    this.api.AllCathe().subscribe({
      next: (res: any) => {
        this.categories = res.recup || [];
      },
      error: (err: any) => {
        console.log('Error fetching categories:', err);
      }
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.selectedId = '';
    this.previewUrl = null;
    this.file = null;
    this.sousCathegorieData.reset();
    this.showModal();
  }

  openEditModal(item: any) {
    this.isEditMode = true;
    this.selectedId = item._id;
    this.previewUrl = this.getImageUrl(item.image) || null;
    this.file = null;
    this.sousCathegorieData.patchValue({
      nom: item.nom,
      prix: item.prix,
      id_cath: item.id_cath?._id || item.id_cath
    });
    this.showModal();
  }

  private showModal() {
    const el = document.getElementById('sousCategorieModal');
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
    const input = document.getElementById('fileInputSous') as HTMLInputElement;
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
    if (this.sousCathegorieData.invalid) {
      this.showErrorToast('Veuillez remplir tous les champs');
      return;
    }
    if (!this.isEditMode && !this.file) {
      this.showErrorToast('Veuillez sélectionner une image');
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.sousCathegorieData.get('nom')?.value);
    formData.append('prix', this.sousCathegorieData.get('prix')?.value);
    formData.append('id_cath', this.sousCathegorieData.get('id_cath')?.value);
    if (this.file) formData.append('image', this.file);

    if (this.isEditMode) {
      this.api.UpdateSousCathe(this.selectedId, formData).subscribe({
        next: (res: any) => {
          if (res?.status === 'success') {
            this.getAllSousCathegories();
            this.hideModal();
            this.showSuccessToast('Sous-catégorie modifiée avec succès');
          }
        },
        error: () => this.showErrorToast('Erreur lors de la modification')
      });
    } else {
      this.api.AddSousCathe(formData).subscribe({
        next: (res: any) => {
          if (res?.status === 'success') {
            this.getAllSousCathegories();
            this.hideModal();
            this.showSuccessToast('Sous-catégorie créée avec succès');
          }
        },
        error: () => this.showErrorToast('Erreur lors de la création')
      });
    }
  }

  deleteSousCathegorie(id: string) {
    if (!confirm('Confirmer la suppression de cette sous-catégorie ?')) return;
    this.api.DeleteSousCathe(id).subscribe({
      next: () => {
        this.getAllSousCathegories();
        this.showSuccessToast('Sous-catégorie supprimée');
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
