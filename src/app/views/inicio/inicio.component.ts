import { Component } from '@angular/core';
import { SensorComponent } from "../sensor/sensor.component";
import { MindashboardComponent } from "../mindashboard/mindashboard.component";
import { TemperaturasComponent } from "../temperaturas/temperaturas.component";

@Component({
  selector: 'app-inicio',
  imports: [SensorComponent, MindashboardComponent, TemperaturasComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
