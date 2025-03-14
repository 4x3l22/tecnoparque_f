import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  NgApexchartsModule
} from "ng-apexcharts";
import { ITemperaturas } from "../../service/interfaces/ITemperaturas";
import { TemperaturaService } from "../../service/temperatura/temperatura.service";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: "app-temperaturas",
  imports: [
    NgApexchartsModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatDatepickerModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatTableModule, MatPaginatorModule
  ],
  templateUrl: "./temperaturas.component.html",
  styleUrls: ["./temperaturas.component.css"]
})
export class TemperaturasComponent implements OnInit {

  // temperaturas: ITemperaturas[] = [];
  temfive: ITemperaturas[] = [];
  series: ApexAxisChartSeries = [];
  chart: ApexChart = {
    type: 'line',
    height: 350
  };
  dataLabels: ApexDataLabels = {};
  markers: ApexMarkers = {};
  title: ApexTitleSubtitle = {};
  fill: ApexFill = {};
  yaxis: ApexYAxis = {};
  xaxis: ApexXAxis = {};
  tooltip: ApexTooltip = {};
  dateRange = { start: null, end: null };
  dateRangeForm: FormGroup;

  displayedColumns: string[] = ['numero', 'temperatura', 'humedad', 'fecha_hora'];
  dataSource = new MatTableDataSource<ITemperaturas>(this.temfive);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private service: TemperaturaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.dateRangeForm = new FormGroup({
      formattedStart: new FormControl(null),
      formattedEnd: new FormControl(null)
    });
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    // this.startLoadingTables();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.temfive);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    FileSaver.saveAs(data, 'datos_temperatura.csv');
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Asegura dos dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Asegura dos dígitos
    return `${year}-${month}-${day}`;
  }  

  filterDataByDate(startDate: string, endDate: string) {
    this.service.list_for_date_range(startDate, endDate).subscribe({
      next: (data: ITemperaturas[]) => {
        this.temfive = data;
        this.dataSource.data = data;
        console.log('Datos filtrados:', this.temfive);
        this.dataSource = new MatTableDataSource(data);
        
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      },
      error: (err) => {
        console.error("Error al cargar los datos:", err);
      }
    });
  
  }  

  // Método para obtener los valores seleccionados en el date picker
  getSelectedDateRange() {
    const formattedStart = this.formatDate(this.dateRangeForm.value.formattedStart);
    const formattedEnd = this.formatDate(this.dateRangeForm.value.formattedEnd);

    if (formattedStart && formattedEnd) {
      console.log("Fecha de inicio:", formattedStart);
      console.log("Fecha de fin:", formattedEnd);
      this.filterDataByDate(formattedStart, formattedEnd);
    } else {
      console.log("Por favor, selecciona un rango de fechas válido.");
    }
  }
  
}
