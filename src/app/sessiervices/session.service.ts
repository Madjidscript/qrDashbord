import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  // Fonction pour enregistrer une donnée dans le sessionStorage
  setItem(key: string, value: any): void {
    if (value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.removeItem(key);  // Si la valeur est null ou undefined, on supprime la clé.
    }
  }

  verif(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  } 


  // Fonction pour récupérer une donnée depuis le sessionStorage
  getItem<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Fonction pour vérifier si une donnée existe dans le sessionStorage
  hasItem(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }

  // Fonction pour supprimer une donnée depuis le sessionStorage
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Fonction pour vider tout le sessionStorage
  clear(): void {
    sessionStorage.clear();
  }
}
