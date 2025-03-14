import { Component, ViewChild, OnInit } from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  NgApexchartsModule
} from "ng-apexcharts";
import { TemperaturaService } from "../../service/temperatura/temperatura.service";
import { ITemperaturas } from "../../service/interfaces/ITemperaturas";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-sensor',
  imports: [NgApexchartsModule],
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: ChartOptions; 

  temperaturas: ITemperaturas[] = [];

  constructor(private service: TemperaturaService) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 570,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: []
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.list().subscribe({
      next: (data: ITemperaturas[]) => {
        this.temperaturas = data;
        this.updateChart();
      }
    });
  }

  updateChart() {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    // Filtrar los datos para incluir solo los del último año
    const filteredData = this.temperaturas.filter(item => new Date(item.fecha_hora) >= oneYearAgo);

    // Extraer las fechas y los valores de temperatura y humedad
    const fechas = filteredData.map(item => new Date(item.fecha_hora).getTime());
    const temperaturas = filteredData.map(item => item.temperatura);
    const humedades = filteredData.map(item => item.humedad);

    // Actualizar las opciones de la gráfica
    this.chartOptions.series = [
      {
        name: "Temperatura",
        data: temperaturas
      },
      {
        name: "Humedad",
        data: humedades
      }
    ];
    this.chartOptions.xaxis.categories = fechas;
  }

  public generateData(baseval: number, count: number, yrange: { min: number; max: number }): [number, number, number][] {
    let i = 0;
    const series: [number, number, number][] = [];
    while (i < count) {
      const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
}