import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environnement/environnement.prod';




@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  api_url= environment.apiUrl 

  Connexion(body:any) {
    return this.http.post(this.api_url+"/admin/connexions",body );
  }

  AllCommande() {
    return this.http.get(this.api_url+"/admin/commandes", );
  }

  DetailCommande(id:any) {
    return this.http.get(this.api_url+`/admin/detailcmd/${id}`, );
  }
  Editstatut(id:any,statut:any) {
    return this.http.get(this.api_url+`/admin/commandes/${id}/${statut}`, );
  }

  annulecmd(id:any,num:any) {
    return this.http.delete(this.api_url+`/admin/annulecommandes/${id}/${num}`, );
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

  updatestatut(body:any) {
    return this.http.post(this.api_url+"/admin/updatestatut",body);
  }

  gettatut() {
    return this.http.get(this.api_url+"/admin/getstatut");
  }

}
