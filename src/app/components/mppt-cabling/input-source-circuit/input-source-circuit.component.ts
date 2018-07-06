import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-source-circuit',
  templateUrl: './input-source-circuit.component.html',
  styleUrls: ['./input-source-circuit.component.scss']
})
export class InputSourceCircuitComponent implements OnInit {
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
