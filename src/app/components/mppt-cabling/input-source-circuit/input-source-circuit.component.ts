import { Component, OnInit } from '@angular/core';
import { TypeOfWiring } from '../../../core/enums';

@Component({
  selector: 'app-input-source-circuit',
  templateUrl: './input-source-circuit.component.html',
  styleUrls: ['./input-source-circuit.component.scss']
})
export class InputSourceCircuitComponent implements OnInit {
  types_of_wiring = TypeOfWiring;
  

  tipoCanalizacion=["Riel chanel", "tuberia elétrica rigida", "tuberia elétrica flexible"];
  canalizacion=["EMT(Interior)","IMC(Exterior)","PVC","Shelude 40"];
  secuencia=[1,2,3];
  disenoBandeja=["Escalera","Ducto perforado","Ducto solido", "Bandejas de aluminio", "malla"];
  materialBandeja=["Aluminio","Acero","Acero inoxidable", "PVC"];
  acabado=["Galvanizado en caliente","Pintura especial/ Epóxico","Acero inoxidable","Electrozincado",
  "Galvanizado en continuo","Galvanizado en caliente","Galvanizado en caliente (Zn + Al)",
  "Acero indoxidable 304L","Acero indoxidable 316L"]
  longitud=["2,4","3"];
  ancho=["50","75","10","15","20","22","30","40","45","50","60","70","75","80","90"];
  alto=["50","60","75","80","100","150"]
  carga=["Carga ligera","Carga media","Carga pesada"];
  materialConductor=["Cobre","Aluminio"];




  constructor() {
   }

  ngOnInit() {
  }

}
