import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr-restaux',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-restaux.component.html',
  styleUrl: './qr-restaux.component.css'
})
export class QrRestauxComponent implements OnInit {
  data:any
  constructor(private api:AdminService){}
  ngOnInit() {
    this.getallqr()
  }
  getallqr(){
    this.api.AllQr().subscribe({
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

}
