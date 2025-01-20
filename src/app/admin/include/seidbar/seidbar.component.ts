import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-seidbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './seidbar.component.html',
  styleUrl: './seidbar.component.css'
})
export class SeidbarComponent implements OnInit {

  

  Activate() {
    if (typeof window !== 'undefined') {
    "use strict";
    var url = window.location.href;
    var path = url.replace(
      window.location.protocol + "//" + window.location.host + "/",
      ""
    );
    var self = this;
    var element: any = $("ul#sidebarnav a").filter(function() {
      // @ts-ignore
      return $(this).attr('href') === url || $(this).attr('href') === path;
    });

    // Activer le lien de la page d'accueil par défaut
    if (window.location.pathname === '/') {
      var homeLink = $("ul#sidebarnav a[href='/home']");
      homeLink.addClass("active");
    }

    element.parentsUntil(".sidebar-nav").each(function() {
      // @ts-ignore
      if ($(this).is("li") && $(this).children("a").length !== 0) {
        // @ts-ignore
        $(this).children("a").addClass("active");
        // @ts-ignore
        $(this).parent("ul#sidebarnav").length === 0
        // @ts-ignore
          ? $(this).addClass("active")
        // @ts-ignore
          : $(this).addClass("selected");
        // @ts-ignore
      } else if (!$(this).is("ul") && $(this).children("a").length === 0) {
        // @ts-ignore
        $(this).addClass("selected");
        // @ts-ignore
      } else if ($(this).is("ul")) {
        // @ts-ignore
        $(this).addClass("in");
      }
    });

    element.addClass("active");
    $("#sidebarnav a").on("click", function(e: any) {
      // @ts-ignore
      var $this = $(this);
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
    $("#sidebarnav >li >a.has-arrow").on("click", function(e: any) {
      e.preventDefault();
    });
     }
  }
  ngOnInit() {
   this.Activate()
  }

}
