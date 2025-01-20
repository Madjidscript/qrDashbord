import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-hearder',
  standalone: true,
  imports: [],
  templateUrl: './hearder.component.html',
  styleUrl: './hearder.component.css'
})
export class HearderComponent implements OnInit {


  toggleSidebar(): void {
    if (typeof window !== 'undefined') {

    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    if (width < 1199) {
      $("#main-wrapper").attr("data-sidebartype", "mini-sidebar").addClass("mini-sidebar");
    } else {
      $("#main-wrapper").attr("data-sidebartype", "full").removeClass("mini-sidebar");
    }

    $(window).on("resize", () => {
      const newWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (newWidth < 1199) {
        $("#main-wrapper").attr("data-sidebartype", "mini-sidebar").addClass("mini-sidebar");
      } else {
        $("#main-wrapper").attr("data-sidebartype", "full").removeClass("mini-sidebar");
      }
    });

    $(".sidebartoggler").on("click", function () {
      $("#main-wrapper").toggleClass("mini-sidebar");
      const isMiniSidebar = $("#main-wrapper").hasClass("mini-sidebar");
      $(".sidebartoggler").prop("checked", isMiniSidebar);
      $("#main-wrapper").attr("data-sidebartype", isMiniSidebar ? "mini-sidebar" : "full");
    });

    $(".sidebartoggler").on("click", function () {
      $("#main-wrapper").toggleClass("show-sidebar");
    });
     }
  }

  
  ngOnInit(){
    this.toggleSidebar()
   
  }

}
