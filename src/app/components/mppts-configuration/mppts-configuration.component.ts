import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mppts-configuration',
  templateUrl: './mppts-configuration.component.html',
  styleUrls: ['./mppts-configuration.component.scss']
})
export class MpptsConfigurationComponent implements OnInit {

  constructor() { }
  getArray(size: number): Array<Number> {
    
    return size? new Array<Number>(Number(size)): null;
  }
  ngOnInit() {
  }

}
