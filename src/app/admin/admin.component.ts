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
    ["notification", "notifications"].forEach(event =>
      this.socket.onMessage(event, data => {
        console.log("Message reçu via socket :", data);
        this.message = data.message;
    
        // Vérifie si la synthèse vocale est disponible
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(this.message);
          utterance.lang = 'fr-FR';
    
          // Annule toute lecture en cours
          speechSynthesis.cancel();
    
          // Répéter la lecture toutes les secondes pendant 3 secondes
          
          const duration = 3000;
          const intervalTime = 1000;
          const startTime = Date.now();
    
          const speakMessage = () => {
            const now = Date.now();
            if (now - startTime < duration) {
              const u = new SpeechSynthesisUtterance(this.message);
              u.lang = 'fr-FR';
              speechSynthesis.speak(u);
    
              setTimeout(speakMessage, intervalTime);
            }
          };
    
          speakMessage(); // Commence à parler
        } else {
          console.warn("Synthèse vocale non supportée sur ce navigateur.");
        }
      })
    );
  }
  

}
