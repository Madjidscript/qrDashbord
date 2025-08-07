import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environnement/environnement.prod'; // Assure-toi que ce fichier existe



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(withFetch()), provideClientHydration(),
     importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // registrationStrategy: 'registerWhenStable:30000' // optionnel, tu peux activer si tu veux
      })
       )
  ]
};
// withHashLocation()