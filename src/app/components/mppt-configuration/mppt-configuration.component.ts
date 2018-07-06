import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mppt-configuration',
  templateUrl: './mppt-configuration.component.html',
  styleUrls: ['./mppt-configuration.component.scss']
})
export class MpptConfigurationComponent implements OnInit {
  @Input() number: number;
  constructor() { }

  ngOnInit() {
  }

}
