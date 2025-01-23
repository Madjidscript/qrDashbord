
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import Chart, { ChartData } from 'chart.js/auto';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit, AfterViewInit {
  
  @ViewChild('commandesParStatutCanvas') commandesParStatutCanvas!: ElementRef;
  @ViewChild('stockParCategorieCanvas') stockParCategorieCanvas!: ElementRef;
  @ViewChild('topProduitsCanvas') topProduitsCanvas!: ElementRef;
  @ViewChild('evolutionCommandesCanvas') evolutionCommandesCanvas!: ElementRef;
  
    labels: any;
    data: any;
    falseCount:any
    trueCount:any
    topPlats:any
    stockinf:any
    
 
   constructor(private api:AdminService){}
   commandesParStatutChart: any;
   stockParCategorieChart: any;
   topProduitsChart: any;
   evolutionCommandesChart: any;

  ngOnInit() {
    this.getallcoubre()
  }

  ngAfterViewInit(): void {
    this.creerGraphiques();
  }

  getallcoubre(){
    this.api.coubre().subscribe({
      next:(res:any)=> {
        console.log("mon data coubre",res);
        this.trueCount = res.trueCount
        this.falseCount = res.falseCount
        this.topPlats = res.topPlats
        this.stockinf = res.stockinf
        this.creerGraphiques()


        
      },
      error:(err:any)=> {
        console.log("mon err",err);
        
      },

      complete:()=> {
        console.log("mon api youpi");
        
      },
    })
  }

  creerGraphiques() {
    const commandesParStatutData = {
      labels: ['En cours', 'Validées'],
      data: [this.trueCount, this.falseCount]
    };

    const plat = this.stockinf.map((item:any) => item.plat);
    const datas = this.stockinf.map((item:any) => item.stock);

    const stockParCategorieData = {
      
      labels: plat,
      data: datas
    };

    const plat1 = this.topPlats.map((item:any) => item.nom);
    const datas1 = this.topPlats.map((item:any) => item.nbre);

    const topProduitsData = {
      labels: plat1,
      data: datas1
    };

    const evolutionCommandesData = {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      data: [25, 30, 28, 35, 42, 50, 45]
    };

    this.creerChart(this.commandesParStatutCanvas, 'pie', commandesParStatutData, this.commandesParStatutChart);
    this.creerChart(this.stockParCategorieCanvas, 'bar', stockParCategorieData, this.stockParCategorieChart);
    this.creerChart(this.topProduitsCanvas, 'bar', topProduitsData, this.topProduitsChart);
    this.creerChart(this.evolutionCommandesCanvas, 'line', evolutionCommandesData, this.evolutionCommandesChart);
  }

  creerChart(canvas: ElementRef, type: any, data: any, chartInstance: any) { // Type 'any' ici
    const ctx = canvas.nativeElement.getContext('2d');
    chartInstance = new Chart(ctx, {
      type: type,
      data: {
        labels: data.labels,
        datasets: [{
          label: '',
          data: data.data,
          backgroundColor: this.generateColors(data.data.length),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generateColors(count: number) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`);
    }
    return colors;
  }





}
