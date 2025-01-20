import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


declare const bootstrap: any;
declare var $: any;
@Component({
  selector: 'app-add-cathegorie',
  standalone: true,
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './add-cathegorie.component.html',
  styleUrl: './add-cathegorie.component.css'
})
export class AddCathegorieComponent implements OnInit{
  @ViewChild('preview') previewImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  file:File|null = null

  cathegorieData:FormGroup = new FormGroup({
    nom:new FormControl("",Validators.required),
    image:new FormControl(null)
  })
  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    $('.dropify').dropify();
  
    $('.dropify').on('change', (event: any) => {
      this.onFileChange(event);
    });

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
    this.file = file;
    return file;
  }

  validation(event:Event){
    event.preventDefault()

    const formData:FormData = new FormData()
    formData.append("nom",this.cathegorieData.get("nom")?.value)
    formData.append("image",this.file as File)
    console.log("mon data1",this.cathegorieData.valid);
    
    
    
  }

}
