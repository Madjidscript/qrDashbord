import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environnement/environnement.prod';




@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  api_url= environment.apiUrl

  AllCommande() {
    return this.http.get(this.api_url+"/admin/commandes", );
  }

  AllCathe() {
    return this.http.get(this.api_url+"/admin/cathegories", );
  }

  AllSousCathe() {
    return this.http.get(this.api_url+"/admin/souscathegories", );
  }
  AllStock() {
    return this.http.get(this.api_url+"/admin/stocks", );
  }

  AllQr() {
    return this.http.get(this.api_url+"/admin/qrcode", );
  }
}
