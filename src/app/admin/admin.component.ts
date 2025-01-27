import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeidbarComponent } from './include/seidbar/seidbar.component';
import { HearderComponent } from './include/hearder/hearder.component';


declare var $: any;

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SeidbarComponent, HearderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  

}
