import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';


declare const bootstrap: any;
declare var $: any;

@Component({
  selector: 'app-add-souscathegorie',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-souscathegorie.component.html',
  styleUrl: './add-souscathegorie.component.css'
})
export class AddSouscathegorieComponent implements OnInit {
  @ViewChild('preview') previewImage!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  sousCath:FormGroup=new FormGroup({
    nom:new FormControl("",Validators.required),
    prix:new FormControl("",Validators.required),
    id_cath:new FormControl("",Validators.required),
    image:new FormControl(null),
  })

  file:File|null = null
  data:any
  constructor(private api:AdminService){}
  ngOnInit(){
    console.log("mon ppapap");
    this.getallcathe()
    
    
  }

  ngAfterViewInit() {
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

  getallcathe(){
    this.api.AllCathe().subscribe({
      next:(res:any)=> {
        
        this.data = res.recup
        console.log("mais cathe",this.data);
      },
      error:(err:any)=> {
        console.log("mon erreur",err);
        
      },
      complete() {
        console.log("mon api youpi");
      },
    
    })

  }

  validation(event:Event){
    event.preventDefault()
    const formData:FormData=new FormData()
    formData.append("nom",this.sousCath.get("nom")?.value)
    formData.append("prix",this.sousCath.get("prix")?.value)
    formData.append("id_cath",this.sousCath.get("id_cath")?.value)
    formData.append("image",this.file as File)

    if(this.sousCath.valid){
      console.log("mon data",this.sousCath.value,"mon file",this.file);

      
    }
  }


}
