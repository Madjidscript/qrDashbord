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

  DetailCommande(id:any) {
    return this.http.get(this.api_url+`/admin/detailcmd/${id}`, );
  }
  Editstatut(id:any) {
    return this.http.get(this.api_url+`/admin/commandes/${id}`, );
  }

  AllCathe() {
    return this.http.get(this.api_url+"/admin/cathegories", );
  }

  AddCathe(body:any) {
    return this.http.post(this.api_url+"/admin/cathegories",body);
  }

  AllSousCathe() {
    return this.http.get(this.api_url+"/admin/souscathegories", );
  }

  AddSousCathe(body:any) {
    return this.http.post(this.api_url+"/admin/souscathegories",body);
  }
  AllStock() {
    return this.http.get(this.api_url+"/admin/stocks", );
  }
  
  AddStock(body:any) {
    return this.http.post(this.api_url+"/admin/stocks",body);
  }

  UpdateStock(body:any) {
    return this.http.post(this.api_url+"/admin/stockUpdates",body);
  }

  AllQr() {
    return this.http.get(this.api_url+"/admin/qrcode", );
  }

  coubre() {
    return this.http.get(this.api_url+"/admin/coubre", );
  }

  AddQr(body:any) {
    return this.http.post(this.api_url+"/admin/qrcode",body);
  }

}
