import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";
import { TemperaturaService } from '../../service/temperatura/temperatura.service';
import { ITemperaturas } from '../../service/interfaces/ITemperaturas';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-mindashboard',
  standalone: true,
  imports: [NgApexchartsModule, CommonModule],
  templateUrl: './mindashboard.component.html',
  styleUrl: './mindashboard.component.css'
})
export class MindashboardComponent implements OnInit {
  temfive: ITemperaturas[] = [];

  @ViewChild("chartTemperature") chartTemperature!: ChartComponent;
  @ViewChild("chartHumidity") chartHumidity!: ChartComponent;

  constructor(private service: TemperaturaService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.chartOptionsTemperature.series = [100];
    this.chartOptionsTemperature.labels = ["Temperatura"];
    this.chartOptionsHumidity.series = [50];
    this.chartOptionsHumidity.labels = ["Humedad"];
  }

  ngOnInit(): void {
    this.startLoadingTables();
  }

  startLoadingTables() {
    if (isPlatformBrowser(this.platformId)) {
      const executeLoad = async () => {
        if (document.readyState === 'complete') {
          try {
            await this.load(); // Espera a que la petición actual termine
          } catch (error) {
            console.error("Error en loadTables:", error);
          } finally {
            setTimeout(executeLoad, 5000); // Llama a la siguiente ejecución solo después de terminar
          }
        } else {
          // console.log("Esperando a que la página se cargue completamente...");
          setTimeout(executeLoad, 1000); // Vuelve a comprobar en 1 segundo
        }
      };

      // Iniciar la ejecución
      executeLoad();
    }
  }

  load(): Promise<Boolean> {
    return new Promise((resolve, rejects) => {
      this.service.list_table().subscribe({
        next: (data: ITemperaturas[]) => {
          this.temfive = data;
          if (data.length > 0) {
            const lastRecord = data[data.length - 1];
            this.chartOptionsTemperature.series = [lastRecord.temperatura];
            this.chartOptionsHumidity.series = [lastRecord.humedad];
          }
          resolve(true);
        },
        error: (err) => {
          console.error("Error al cargar los datos:", err);
          rejects(false);
        }
      });
    });
  }

  public chartOptionsTemperature: ChartOptions = {
    series: [],
    chart: {
      type: "radialBar",
      height: 350
    },
    labels: [],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%"
        },
        dataLabels: {
          value: {
            formatter: function (val) {
              return val + "°C";
            }
          }
        }
      }
    }
  };

  public chartOptionsHumidity: ChartOptions = {
    series: [],
    chart: {
      type: "radialBar",
      height: 350
    },
    labels: [],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%"
        },
        dataLabels: {
          value: {
            formatter: function (val) {
              return val + "%";
            }
          }
        }
      }
    }
  };
}
