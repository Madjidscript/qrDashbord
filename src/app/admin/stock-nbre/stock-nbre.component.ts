import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

declare const feather: any;
declare var $: any;

@Component({
  selector: 'app-stock-nbre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stock-nbre.component.html',
  styleUrls: ['./stock-nbre.component.css']
})
export class StockNbreComponent implements OnInit {
  data: any = [];
  loading = false;
  isBrowser: boolean;

  constructor(
    private api: AdminService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    // Vérifie si le code s'exécute dans le navigateur
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Vérifie si jQuery est chargé
    if (this.isBrowser && typeof $ !== 'undefined') {
      console.log('jQuery est chargé');
    } else {
      console.log('jQuery n\'est pas chargé');
    }

    this.getAllStock();
  }

  getAllStock(): void {
    this.loading = true;

    this.api.AllStock().subscribe({
      next: (res: any) => {
        this.data = res;
        console.log('Données du stock :', this.data);

        // Initialise DataTables une fois les données chargées
        if (this.isBrowser && typeof $ !== 'undefined') {
          setTimeout(() => {
            this.initDataTable();
          }, 200);
        }
      },
      error: (err: any) => {
        console.error('Erreur lors de la récupération des stocks', err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  initDataTable(): void {
    // Vérifie si le DOM et jQuery sont disponibles
    if (typeof $ !== 'undefined' && $('table').length > 0) {
      $('table').DataTable({
        dom: '<"d-flex justify-content-between"<"btn-group"B><"search-box"f>>t<"d-flex justify-content-between"ip>',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
      });
      console.log('DataTable initialisé avec succès');
    } else {
      console.log('Impossible d\'initialiser DataTable : table non trouvée');
    }
  }

  nav(): void {
    this.router.navigate(['/admin/updatestock']);
  }
}
