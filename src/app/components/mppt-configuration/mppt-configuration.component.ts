import { Component, OnInit, Input } from '@angular/core';
import { Mttp } from '@app/core/models';

@Component({
  selector: 'app-mppt-configuration',
  templateUrl: './mppt-configuration.component.html',
  styleUrls: ['./mppt-configuration.component.scss']
})
export class MpptConfigurationComponent implements OnInit {
  @Input() mttp: Mttp;
  constructor() { }

  ngOnInit() {
  }

}
