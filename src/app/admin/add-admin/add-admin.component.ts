import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent implements OnInit{

  constructor(private api:AdminService){}
  data:any
  adddata:FormGroup =new FormGroup({
    
  })
  ngOnInit() {
    
  }

} 
