import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeidbarComponent } from './include/seidbar/seidbar.component';
import { HearderComponent } from './include/hearder/hearder.component';
import { SocketService } from '../services/socket.services.service';


declare var $: any;

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SeidbarComponent, HearderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  implements OnInit{
  message: any;
  constructor(private socket:SocketService){}
  ngOnInit(): void {
    this.socket.onMessage("notification", data => {
      console.log("mon message depuis le socket backend", data);
      this.message = data.message;
    
      // Durée totale de vocalisation (en millisecondes)
      const duration = 3000;
      const intervalTime = 1000; // délai entre chaque répétition
      const startTime = Date.now();
    
      const speakMessage = () => {
        const now = Date.now();
        if (now - startTime < duration) {
          const utterance = new SpeechSynthesisUtterance(this.message);
          utterance.lang = 'fr-FR';
          speechSynthesis.speak(utterance);
    
          // Planifie la prochaine lecture
          setTimeout(speakMessage, intervalTime);
        }
      };
    
      speakMessage(); // Démarrer la lecture
    });
  }
  

}
