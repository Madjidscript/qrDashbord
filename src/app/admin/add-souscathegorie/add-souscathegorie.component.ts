import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';


declare const bootstrap: any;
declare var $: any;

@Component({
  selector: 'app-add-souscathegorie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-souscathegorie.component.html',
  styleUrls: ['./add-souscathegorie.component.css']
})
export class AddSouscathegorieComponent implements OnInit {
  @ViewChild('preview') previewImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  file: File | null = null;
  data: any;

  constructor(private api: AdminService) { }

  sousCathegorieData: FormGroup = new FormGroup({
    nom: new FormControl("", Validators.required),
    prix: new FormControl("", Validators.required),
    id_cath: new FormControl("", Validators.required),
    image: new FormControl(null)
  });

  ngOnInit() {
    this.getAllCathegories();
  }

  ngAfterViewInit(): void {
    if (typeof $ !== 'undefined') {
      $('.dropify').dropify();
      $('.dropify').on('change', (event: any) => {
        this.onFileChange(event);
      });
    }

    console.log('File input initialized:', this.fileInput);
  }

  openFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('fileInput is not available yet');
    }
  }

  onFileChange(event: any) {
    console.log(event);
    let file = event.target.files[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        if (this.previewImage) {
          this.previewImage.nativeElement.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  getAllCathegories() {
    this.api.AllCathe().subscribe({
      next: (res: any) => {
        this.data = res.recup;
        console.log("Categories fetched:", this.data);
      },
      error: (err: any) => {
        console.log("Error fetching categories:", err);
      },
      complete: () => {
        console.log("API request completed");
      }
    });
  }

  validation(event: Event) {
    event.preventDefault();

    if (this.sousCathegorieData.invalid || !this.file) {
        
      return;
    }

    const formData: FormData = new FormData();
    formData.append("nom", this.sousCathegorieData.get("nom")?.value);
    formData.append("prix", this.sousCathegorieData.get("prix")?.value);
    formData.append("id_cath", this.sousCathegorieData.get("id_cath")?.value);
    formData.append("image", this.file as File);
    console.log("my file",this.file);


    console.log("Form validation status:", this.sousCathegorieData.valid);

    this.api.AddSousCathe(formData).subscribe({
      next: (res: any) => {
        console.log("Response:", res);

        if (res?.status === 'success') {
          this.data = res;

          this.showSuccessToast("creation de souscath valider")

        }
      },

      error: (err: any) => {
       this.showErrorToast("erreur lor de la creation de soucath")
      },

      complete: () => {
        console.log("API request completed");
      }
    });
  }










   //  fonction pour les toast

   showSuccessToast(message: string) {
    const toastBody = document.getElementById('successToastBody');
    if (toastBody) { 
        toastBody.textContent = message; 
        this.sousCathegorieData.reset()
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
