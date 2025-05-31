import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit, AfterViewInit {
  data: any = [];
  data2: any = [];
  loading = false;
  isBrowser: boolean;

  constructor(
    private api: AdminService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // Vérifie si l'environnement est un navigateur
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.getallcmd();
    console.log('Composant Commande initialisé.');
  }

  // Initialisation après le rendu de la vue
  ngAfterViewInit() {
    if (this.isBrowser) {
      // Vérifie si jQuery est chargé
      if (typeof $ !== 'undefined') {
        console.log('jQuery est chargé et prêt à être utilisé.');
        setTimeout(() => {
          this.initDataTables();
        }, 200); // Petit délai pour garantir le rendu complet
      } else {
        console.error('jQuery n\'est pas chargé.');
      }
    }
  }

  // Fonction pour initialiser DataTables
  initDataTables() {
    const table = $('table');
    if (table.hasClass('dataTable')) {
      table.DataTable().destroy(); // Détruire une instance existante
    }
    table.DataTable({
      dom: '<"d-flex justify-content-between"<"btn-group"B><"search-box"f>>t<"d-flex justify-content-between"ip>',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    });
    console.log('DataTables initialisé avec succès.');
  }

  getallcmd() {
    this.loading = true;

    this.api.AllCommande().subscribe({
      next: (res: any) => {
        this.data = res;
        // this.data2 = this.data;
        this.data2 = this.data.filter((item: any) => item.statut !="Servie" );
        console.log('Commandes récupérées :', res);

        // Réinitialiser DataTables après réception des données
        if (this.isBrowser && typeof $ !== 'undefined') {
          setTimeout(() => {
            this.initDataTables();
          }, 200);
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des commandes :', err);
        this.loading = false;
      },
      complete: () => {
        console.log('Requête API terminée.');
        this.loading = false;
      }
    });
  }

  nav(id: any,num:any) {
    this.router.navigate([`/admin/cmd-detail/${id}/${num}`]);
  }
}
