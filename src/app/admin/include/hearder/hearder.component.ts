import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SessionService } from '../../../sessiervices/session.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-hearder',
  standalone: true,
  imports: [],
  templateUrl: './hearder.component.html',
  styleUrls: ['./hearder.component.css']
})
export class HearderComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: any,private storage:SessionService,private router:Router) {}

  toggleSidebar(): void {
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (width < 1199) {
        $("#main-wrapper").attr("data-sidebartype", "mini-sidebar").addClass("mini-sidebar");
      } else {
        $("#main-wrapper").attr("data-sidebartype", "full").removeClass("mini-sidebar");
      }

      // Écoute les changements de taille de fenêtre
      $(window).on("resize", () => {
        const newWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
        if (newWidth < 1199) {
          $("#main-wrapper").attr("data-sidebartype", "mini-sidebar").addClass("mini-sidebar");
        } else {
          $("#main-wrapper").attr("data-sidebartype", "full").removeClass("mini-sidebar");
        }
      });

      // Toggler de la sidebar
      $(".sidebartoggler").on("click", function () {
        $("#main-wrapper").toggleClass("mini-sidebar");
        const isMiniSidebar = $("#main-wrapper").hasClass("mini-sidebar");
        $(".sidebartoggler").prop("checked", isMiniSidebar);
        $("#main-wrapper").attr("data-sidebartype", isMiniSidebar ? "mini-sidebar" : "full");
      });

      // Affichage de la sidebar
      $(".sidebartoggler").on("click", function () {
        $("#main-wrapper").toggleClass("show-sidebar");
      });
    }
  }

  ngOnInit(): void {
    this.toggleSidebar();
  }


  deconnexion(){
    this.storage.removeItem("qrdashbord")
    this.router.navigate(['/auth/connexion'])
  }
}
