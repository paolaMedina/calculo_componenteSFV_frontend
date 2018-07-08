import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Mttp } from '@app/core/models';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mppts-configuration',
  templateUrl: './mppts-configuration.component.html',
  styleUrls: ['./mppts-configuration.component.scss']
})
export class MpptsConfigurationComponent implements OnInit {
  @Input() number_of_mttps = 5;
  mttpsCombinationControl: FormControl;
  mttps: Mttp[];
  constructor() {
    this.mttps = new Array<Mttp>();
    this.mttpsCombinationControl = new FormControl();
    this.mttpsCombinationControl.valueChanges.subscribe(value=> {
      this.combineMttps(value);
    });
   }
  getArray(size: number): Array<Number> {
    
    return size? new Array<Number>(Number(size)): null;
  }

  initMttps() {
    for (let i = 0; i < this.number_of_mttps; i++) {
      this.mttps.push(new Mttp(String(i+1)));
    }
  }
  /**
   *  
   * @param combination String in format `n-n+1`, `mttps[n]` and `mttps[n+1]` should be combined in one mttp
   */
  combineMttps(combination: string){
    console.log(combination, 'hola :v');
    let id_mptt1: number;
    let id_mptt2: number;
    let newCombinedMptt: Mttp;
    /** Extract ids of mptts from combination, example [5,6] */
    let ids_mttps = combination.split('-');
    /** Init ids of mptts from ids array */
    id_mptt1 = Number(ids_mttps[0]);
    id_mptt2 = Number(ids_mttps[2]);
    /** Create a new mttp combined */
    newCombinedMptt = new Mttp(Mttp.getCombinedName(id_mptt1, id_mptt2));
    /** Delete the mttps to combine from `this.mttps` */
    this.mttps = this.mttps.splice(id_mptt1,1);
    console.log(this.mttps, 'mttps luego de borrar id_mptt1')
    /** The first mttp for combination is deleted, the next mttp to be deleted now is at `id_mptt1` position, because the combinations only can be made if the mttp are contiguos */
    this.mttps = this.mttps.splice(id_mptt1,2);
    /** Add the new mttp combined at `id_mptt1` position */
    this.mttps = this.mttps.splice(id_mptt1, 0, newCombinedMptt);
  }
  /**
   * Return a combined array in duples by given size, only return duples, in inpair sizes 
   * the last element is not included
   * Examples: size = 2, return ['1-2'];  size = 5 return ['1-2, '3-4']
   * @param size 
   */
  getArrayCombined(size: number): Array<string> {
    let arrayCombined = new  Array<string>();
    for(let i = 1; i <= size; i=i+2) {
      const lower_bound = i ;
      let separator: string;
      let upper_bound: number | string;
      if ( i >= size ) {
        separator = ''
        upper_bound = '';
      } else {
        separator = '-';
        upper_bound = i + 1;
      }
      arrayCombined.push(`${lower_bound}${separator}${upper_bound}`);
    };
    return arrayCombined;
  }
  ngOnInit() {
    this.initMttps();
  }

}
