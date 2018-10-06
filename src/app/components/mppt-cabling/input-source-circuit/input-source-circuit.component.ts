import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TypeOfWiring } from '../../../core/enums';
import { Source } from '../../../core/models';
import { SourceFormBuilder } from '../../../core/forms/source.form';

@Component({
  selector: 'app-input-source-circuit',
  templateUrl: './input-source-circuit.component.html',
  styleUrls: ['./input-source-circuit.component.scss']
})
export class InputSourceCircuitComponent implements OnInit {
  @Input() source: Source;
  sourceForm: FormGroup;


  types_of_wiring = TypeOfWiring;
  tipoCanalizacion = ["LFMC (Coraza)", "PVC Tipo A", "PVC Schedule 40", "EMT","IMC"];
  secuencia = [1, 2, 3];
  disenoBandeja = ["Escalera", "Ducto perforado", "Ducto solido", "Bandejas de aluminio", "malla"];
  materialBandeja = ["Aluminio", "Acero", "Acero inoxidable", "PVC"];
  acabado = ["Galvanizado en caliente", "Pintura especial/ Epóxico", "Acero inoxidable", "Electrozincado",
    "Galvanizado en continuo", "Galvanizado en caliente", "Galvanizado en caliente (Zn + Al)",
    "Acero indoxidable 304L", "Acero indoxidable 316L"]
  longitud = ["2,4", "3"];
  ancho = ["50", "75", "100", "150", "200", "225", "300", "400", "450", "500", "600", "700", "750", "800", "900"];
  alto = ["50", "60", "75", "80", "100", "150"]
  carga = ["Carga ligera", "Carga media", "Carga pesada"];
  materialConductor = ["Cobre", "Aluminio"];
  tipoConductor = ["Fotovoltaico","THHN/THWN-2 CT","RHHW-2" ]
  tamCanalizacion = ["½","¾","1","1 ¼","1 ½","2","2 ½","3","3 ½","4","5","6" ]


  constructor( private _sourceFormBuilder: SourceFormBuilder) {
    
  }

  ngOnInit() {
    this.sourceForm = this._sourceFormBuilder.makeForm(this.source);
  }

}
