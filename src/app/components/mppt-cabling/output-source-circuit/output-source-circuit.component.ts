import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-output-source-circuit',
  templateUrl: './output-source-circuit.component.html',
  styleUrls: ['./output-source-circuit.component.scss']
})
export class OutputSourceCircuitComponent implements OnInit {
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
