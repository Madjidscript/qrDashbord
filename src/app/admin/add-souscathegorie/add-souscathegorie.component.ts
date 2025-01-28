import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields and select an image.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff6c2f'
      });
      return;
    }

    const formData: FormData = new FormData();
    formData.append("nom", this.sousCathegorieData.get("nom")?.value);
    formData.append("prix", this.sousCathegorieData.get("prix")?.value);
    formData.append("id_cath", this.sousCathegorieData.get("id_cath")?.value);
    formData.append("image", this.file as File);

    console.log("Form validation status:", this.sousCathegorieData.valid);

    this.api.AddSousCathe(formData).subscribe({
      next: (res: any) => {
        console.log("Response:", res);

        if (res?.status === 'success') {
          this.data = res;

          Swal.fire({
            title: 'Success!',
            text: 'Sous-categorie successfully registered',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6c2f'
          }).then(() => {
            this.sousCathegorieData.reset();
            this.file = null;
            this.previewImage.nativeElement.src = ''; // Reset the preview image
          });

        } else {
          Swal.fire({
            title: 'Error!',
            text: res?.message || 'Sous-categorie registration failed',
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#ff6c2f'
          });
        }
      },

      error: (err: any) => {
        console.log("Error:", err);

        Swal.fire({
          title: 'Error!',
          text: err.error_description || 'An error occurred',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#ff6c2f'
        });
      },

      complete: () => {
        console.log("API request completed");
      }
    });
  }
}
