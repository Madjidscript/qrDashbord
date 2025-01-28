import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-cmd-valider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cmd-valider.component.html',
  styleUrls: ['./cmd-valider.component.scss']
})
export class CmdValiderComponent implements OnInit, AfterViewInit {
  data: any;
  data2: any;
  loading = false;
  isBrowser: boolean;

  constructor(
    private api: AdminService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // Détection si le code s'exécute dans le navigateur
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.getallcmd();
    console.log("Composant Commande Valider initialisé.");
  }

  // Initialisation de DataTables après le rendu de la vue
  ngAfterViewInit() {
    if (this.isBrowser) {
      // Vérifie si jQuery est bien chargé
      if (typeof $ !== 'undefined') {
        console.log('jQuery est chargé et prêt à être utilisé.');
        setTimeout(() => {
          this.initDataTables();
        }, 200); // Petit délai pour garantir que les données sont chargées
      } else {
        console.error('jQuery n\'est pas chargé.');
      }
    }
  }

  // Fonction pour configurer DataTables
  initDataTables() {
    const table = $('table');
    if (table.hasClass('dataTable')) {
      table.DataTable().destroy(); // Détruire une instance existante
    }
    table.DataTable({
      dom: '<"d-flex justify-content-between"<"btn-group"B><"search-box"f>>t<"d-flex justify-content-between"ip>',
      buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
    });
    console.log('DataTables initialisé');
  }

  getallcmd() {
    this.loading = true;

    this.api.AllCommande().subscribe({
      next: (res: any) => {
        this.data = res;
        this.data2 = this.data.filter((item: any) => item.statut == false);
        console.log('Commandes récupérées:', res);

        if (this.isBrowser && typeof $ !== 'undefined') {
          // Vérifie à nouveau si jQuery est chargé avant de réinitialiser DataTables
          if (typeof $ !== 'undefined') {
            setTimeout(() => {
              this.initDataTables();
            }, 200); // Petit délai pour garantir que DataTables est réinitialisé après mise à jour des données
          } else {
            console.error('jQuery n\'est pas disponible pour réinitialiser DataTables.');
          }
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

  nav(id: any) {
    this.router.navigate([`/admin/cmd-detail/${id}`]);
  }
}
