import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-qr',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-qr.component.html',
  styleUrl: './add-qr.component.scss'
})
export class AddQrComponent implements OnInit {

  qrdata:FormGroup= new FormGroup({
    number: new FormControl("",Validators.required)
  })
  ngOnInit() {
   
  }

  validation(event:Event){
    console.log("mon data",this.qrdata.value);
    
  }

}
