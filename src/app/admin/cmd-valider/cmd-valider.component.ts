import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
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
export class CmdValiderComponent implements OnInit {
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
    console.log("ma page hooo");
  }

  getallcmd() {
    this.loading = true;

    this.api.AllCommande().subscribe({
      next: (res: any) => {
        this.data = res;
        this.data2 = this.data.filter((item: any) => item.statut == false);
        console.log("mais commande", res);

        // Initialisation de DataTables uniquement si côté navigateur
        if (this.isBrowser && typeof $ !== 'undefined') {
          setTimeout(() => {
            const table = $('table');
            if (table.hasClass('dataTable')) {
              table.DataTable().destroy(); // Détruit une ancienne instance si elle existe
            }
            table.DataTable({
              dom: '<"d-flex justify-content-between"<"btn-group"B><"search-box"f>>t<"d-flex justify-content-between"ip>',
              buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
            });
            console.log('DataTables initialisé');
          }, 200);
        } else {
          console.log('jQuery ou DataTables non disponible');
        }
      },
      error: (err: any) => {
        console.log("mon erreur", err);
        this.loading = false;
      },
      complete: () => {
        console.log("mon api youpi");
        this.loading = false;
      },
    });
  }

  nav(id: any) {
    this.router.navigate([`/admin/cmd-detail/${id}`]);
  }
}
