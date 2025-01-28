import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Importer isPlatformBrowser
import { RouterLink } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-seidbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './seidbar.component.html',
  styleUrls: ['./seidbar.component.css']
})
export class SeidbarComponent implements OnInit {
  
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    this.Activate();
  }

  Activate() {
    if (isPlatformBrowser(this.platformId)) { // Vérifier si c'est dans le navigateur
      "use strict";
      
      var url = window.location.href; // Utiliser window en toute sécurité
      var path = url.replace(window.location.protocol + "//" + window.location.host + "/", "");

      var self = this;
      var element: any = $("ul#sidebarnav a").filter(function() {
        return $(self).attr('href') === url || $(self).attr('href') === path;
      });

      if (window.location.pathname === '/') {
        var homeLink = $("ul#sidebarnav a[href='/home']");
        homeLink.addClass("active");
      }

      element.parentsUntil(".sidebar-nav").each((index: any, el: any) => {
        if ($(el).is("li") && $(el).children("a").length !== 0) {
          $(el).children("a").addClass("active");
          $(el).addClass("selected");
        } else if (!$(el).is("ul") && $(el).children("a").length === 0) {
          $(el).addClass("selected");
        } else if ($(el).is("ul")) {
          $(el).addClass("in");
        }
      });

      element.addClass("active");

      $("#sidebarnav a").on("click", (e: any) => {
        var $this = $(e.currentTarget);
        if (!$this.hasClass("active")) {
          $("ul", $this.parents("ul:first")).removeClass("in");
          $("a", $this.parents("ul:first")).removeClass("active");

          $this.next("ul").addClass("in");
          $this.addClass("active");
        } else {
          $this.removeClass("active");
          $this.parents("ul:first").removeClass("active");
          $this.next("ul").removeClass("in");
        }
      });

      $("#sidebarnav >li >a.has-arrow").on("click", (e: any) => {
        e.preventDefault();
      });
    }
  }
}
