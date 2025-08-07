import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';


@Injectable({
  providedIn: 'root'
})
export class PushserviceService {

readonly VAPID_PUBLIC_KEY = "BLPWq1RQgiZjHm2e-hOSHCEcwQngRYENjX37WhVoYpzJ31eSEz-dH4L47nxIR70rN8_V7_otDivvRiDXO4KMoXE"
;

  constructor(private swPush: SwPush) {}

  subscribeToPush() {
    if (!this.swPush.isEnabled) {
      console.warn('Push non supporté');
      return;
    }
    return this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY,
    });
  }}
