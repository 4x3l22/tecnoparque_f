import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TemperaturasComponent } from "./views/temperaturas/temperaturas.component";
import { SensorComponent } from "./views/sensor/sensor.component";
import { MindashboardComponent } from "./views/mindashboard/mindashboard.component";

@Component({
  selector: 'app-root',
  imports: [NgApexchartsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tecnoparque_f';
}
