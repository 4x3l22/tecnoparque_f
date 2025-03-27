import { Component, ViewChild, AfterViewInit } from "@angular/core";
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
export class SensorComponent implements AfterViewInit {
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

  ngAfterViewInit() {
    console.log("Cargando gráfico...");
    this.load();
  }

  load() {
    this.service.list().subscribe({
      next: (data: ITemperaturas[]) => {
        this.temperaturas = data;
        console.log("Datos recibidos:", this.temperaturas);
        this.updateChart();
      },
      error: (err) => {
        console.error("Error al cargar datos:", err);
      }
    });
  }

  updateChart() {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const filteredData = this.temperaturas.filter(item => new Date(item.fecha_hora) >= oneYearAgo);

    const fechas = filteredData.map(item => new Date(item.fecha_hora).getTime());
    const temperaturas = filteredData.map(item => item.temperatura);
    const humedades = filteredData.map(item => item.humedad);

    console.log("Fechas (timestamps):", fechas);
    console.log("Temperaturas:", temperaturas);
    console.log("Humedades:", humedades);

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: "Temperatura",
          data: temperaturas
        },
        {
          name: "Humedad",
          data: humedades
        }
      ],
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: fechas
      }
    };

    // Fuerza un redibujado para asegurar que los cambios se reflejen
    setTimeout(() => {
      if (this.chart) {
        this.chart.updateOptions(this.chartOptions);
      }
    }, 100);
  }
}
