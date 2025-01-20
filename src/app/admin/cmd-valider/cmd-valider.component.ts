import { Component, OnInit } from '@angular/core';


declare const feather: any;
declare var $: any;
@Component({
  selector: 'app-cmd-valider',
  standalone: true,
  imports: [],
  templateUrl: './cmd-valider.component.html',
  styleUrl: './cmd-valider.component.scss'
})
export class CmdValiderComponent implements OnInit {

  ngOnInit(){
    this.datatable()
    console.log("ma page hooo");
    
  }
  datatable(){
    setTimeout(() => {
      $('table').DataTable(
        {
          dom: '<"d-flex justify-content-between"<"btn-group"B><"search-box"f>>t<"d-flex justify-content-between"ip>',
          buttons: [
              'copy', 'csv', 'excel', 'pdf', 'print'
          ]
        }
      )
    }, 200);
  }
}
