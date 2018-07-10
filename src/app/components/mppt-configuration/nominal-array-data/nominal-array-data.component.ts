import { Component, OnInit, Input } from '@angular/core';
import { MttpSpecifications } from '../../../core/models';

@Component({
  selector: 'app-nominal-array-data',
  templateUrl: './nominal-array-data.component.html',
  styleUrls: ['./nominal-array-data.component.scss']
})
export class NominalArrayDataComponent implements OnInit {
  @Input() mttpSpecifications: MttpSpecifications;
  constructor() { }

  ngOnInit() {
  }

}
