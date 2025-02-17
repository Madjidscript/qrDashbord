import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';




declare const bootstrap: any;
declare var $: any;

@Component({
  selector: 'app-add-cathegorie',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-cathegorie.component.html',
  styleUrls: ['./add-cathegorie.component.css']
})
export class AddCathegorieComponent implements OnInit {
  @ViewChild('preview') previewImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  file: File | null = null;
  data: any;

  constructor(private api: AdminService) { }

  cathegorieData: FormGroup = new FormGroup({
    nom: new FormControl("", Validators.required),
    image: new FormControl(null)
  });

  ngOnInit() { }

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

  validation(event: Event) {
    event.preventDefault();

    if (this.cathegorieData.invalid || !this.file) {
      this.showErrorToast("selectionner une image")
      return;
    }

    const formData: FormData = new FormData();
    formData.append("nom", this.cathegorieData.get("nom")?.value);
    formData.append("image", this.file as File);

    console.log("Form validation status:", this.cathegorieData.valid);

    this.api.AddCathe(formData).subscribe({
      next: (res: any) => {
        console.log("Response:", res);

        if (res?.status === 'success') {
          this.data = res    
          this.showSuccessToast("cathegorie creer avec success")
        } 
     },

      error: (err: any) => {
        console.log("Error:", err);
        this.showErrorToast("erreur lors de la creation")
       
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
        this.cathegorieData.reset()
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
