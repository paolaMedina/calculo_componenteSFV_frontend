import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Mttp, FvField, Inversor } from '../../core/models';
import { isOdd } from '../../core/lib';
import { FvFieldService } from '../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MpptConfigurationComponent } from '../mppt-configuration/mppt-configuration.component';
import { MatSnackBar } from '@angular/material';
class Combination {
  id: string;
  is_combined: boolean;
  constructor(id: string, is_combined: boolean) {
    this.id = id;
    this.is_combined = is_combined;
  }
}
@Component({
  selector: 'app-mppts-configuration',
  templateUrl: './mppts-configuration.component.html',
  styleUrls: ['./mppts-configuration.component.scss']
})
export class MpptsConfigurationComponent implements OnInit {
  //@Input() max_number_of_mttps = 5;
  max_number_of_mttps:number;
  @ViewChildren('mppts') mpptComponents: QueryList<MpptConfigurationComponent>;
  fvField: FvField;
  mttpsNumberControl: FormControl;
  combinations: Array<Combination>;
  mttps: Mttp[];
  private _inversor:Inversor;
  constructor(
    private _fvFieldService: FvFieldService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.mttps = new Array<Mttp>();
    this.combinations = new  Array<Combination>();
    this.mttpsNumberControl = new FormControl();
    this._inversor = this._fvFieldService.getSelectedInversor();
   }
  setNumberOfMttps(newNumber: number) {
    console.log(newNumber);
    const currentNumberOfMttps = this.mttps.length;
    if ( newNumber < currentNumberOfMttps) {
      this.mttps = this.mttps.slice(0,newNumber);
    } 
    if ( newNumber === currentNumberOfMttps ) {
      return;
    }
    if (newNumber > currentNumberOfMttps) {
      for(let i = currentNumberOfMttps+1; i <= newNumber; i++  ) {
       this.mttps.push(new Mttp(String(i)));
      }
    }
  }
  getArray(size: number): Array<Number> {
    
    return size? new Array<Number>(Number(size)): null;
  }

  initMttps(numberOfMttps: number) {
    for (let i = 0; i < numberOfMttps; i++) {
      this.mttps.push(new Mttp(String(i+1)));
    }
  }
  /**
   *  
   * @param combination String in format `n-n+1`, `mttps[n]` and `mttps[n+1]` should be combined in one mttp
   */
  combineMttps(combination: Combination){
    let id_mptt1: number;
    let id_mptt2: number;
    let index_mptt1: number;
    let index_mptt2: number;
    let newCombinedMptt: Mttp;
    /** Extract ids of mptts from combination, example [5,6] */
    let ids_mttps = combination.id.split('-');
    /** Init ids of mptts from ids array */
    id_mptt1 = Number(ids_mttps[0]);
    id_mptt2 = Number(ids_mttps[1]);
    /** Let indexes from find */
    index_mptt1 = this.mttps.findIndex( 
      (mttp: Mttp) => {
        return mttp.id === String(id_mptt1);
      }
    );
    this.mttps.splice(index_mptt1,1);
    index_mptt2 = this.mttps.findIndex( 
      (mttp: Mttp) => {
        return mttp.id === String(id_mptt2);
      }
    );
    this.mttps.splice(index_mptt2,1);
    console.log(id_mptt1, id_mptt2, 'valores del splice')
    /** Create a new mttp combined */
    newCombinedMptt = new Mttp(Mttp.getCombinedName(id_mptt1, id_mptt2));  
    /** Add the new mttp combined at `id_mptt1` position */
    this.mttps.splice(index_mptt1, 0, newCombinedMptt);
    combination.is_combined = true;
    console.log(this.combinations);
  }
  combineOrDecombineMttps(combination: Combination) {
    console.log(combination, 'from combine or decombine')
    if ( !combination.is_combined ) {
      this.combineMttps(combination);
    } else {
      this.separeCombinedMttps(combination);
    }
  }
    /**
   *  
   * @param combination String in format `n-n+1`, `mttps[n]` and `mttps[n+1]` should be combined in one mttp
   */
  separeCombinedMttps(combination: Combination){
    console.log(combination,"combination to separe")
    let id_mptt_to_delete: string = combination.id;
    let id_mptt1: number;
    let id_mptt2: number;
    let index_mptt_to_delete: number;
    let newCombinedMptt1, newCombinedMptt2: Mttp;
    /** Extract ids of mptts from combination, example [5,6] */
    let ids_mttps = combination.id.split('-');
    /** Init ids of mptts from ids array */
    id_mptt1 = Number(ids_mttps[0]);
    id_mptt2 = Number(ids_mttps[1]);
    /** Let indexes from find */
    index_mptt_to_delete = this.mttps.findIndex( 
      (mttp: Mttp) => {
        return mttp.id === String(id_mptt_to_delete);
      }
    );
    this.mttps.splice(index_mptt_to_delete,1);
    /** Create a new mttp combined */
    newCombinedMptt1 = new Mttp(String(id_mptt1));  
    newCombinedMptt2 = new Mttp(String(id_mptt2));  
    /** Add the new mttp combined at `id_mptt1` position */
    this.mttps.splice(index_mptt_to_delete, 0, newCombinedMptt1);
    this.mttps.splice(index_mptt_to_delete+1, 0, newCombinedMptt2);
    combination.is_combined = false;
  }
  /**
   * Return a combined array in duples by given size, only return duples, in inpair sizes 
   * the last element is not included
   * Examples: size = 2, return ['1-2'];  size = 5 return ['1-2, '3-4']
   * @param size 
   */
  updateArrayCombined(size: number) {
    let arrayCombined = new  Array<Combination>();
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
      arrayCombined.push(new Combination(`${lower_bound}${separator}${upper_bound}`, false));
    };
    if (isOdd(size)) {
      arrayCombined.pop();
    }
    this.combinations =  arrayCombined;
  } 
    /**
   * Marks all controls in a form group as touched
   * @param formGroup - The group to caress..hah
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }
  markAllMpptsFormsAsTouched() {
    this.mpptComponents.forEach(
      (mpptComponent: MpptConfigurationComponent) => {
        this.markFormGroupTouched(mpptComponent.mttpForm);
      }
    );
  }
  checkAllMpptsFormsValid(): boolean {
    let _validForms = true;
    if (this.mpptComponents
      .some(
        (mpptComponent: MpptConfigurationComponent ) => !mpptComponent.mttpForm.valid)) 
        {
          _validForms = false;
    }
    return _validForms;
  }
  getMttpsFromChildren(): Mttp[]{
    return this.mpptComponents.map(
      mpptComponent=>
      mpptComponent.getMttpFromForm()
    )
  }
  saveMttps() {
    this.markAllMpptsFormsAsTouched();

    if( !this.checkAllMpptsFormsValid() ) {
      this.snackBar.open( "Se han encontrado algunos errores", "Aceptar", {
        duration: 2000,
      });
    } else {
      console.log(this.getMttpsFromChildren(), 'mppts from children')
      this.fvField.mttps = this.getMttpsFromChildren();
      console.log(this.fvField, 'fv field from mppts configuration save ')
      this._fvFieldService.updateField(this.fvField);
      this.snackBar.open( "Datos almacenados correctamente", "Aceptar", {
        duration: 2000,
      });
      this.router.navigate(['/fv-field-config', this.fvField.id]);
    }

  }
  ngOnInit() {
    this.route.params.subscribe( params => {
      this.fvField = this._fvFieldService.get(params['fv_id']);
      console.log(this.fvField, 'fvfield from mppts config route params subscribe');
      if ( this.fvField.mttps ) {
        this.mttps = this.fvField.mttps;
      } else {
        this.initMttps(this.max_number_of_mttps);
      }
      this.updateArrayCombined(Number(this.max_number_of_mttps));
    });
    this.max_number_of_mttps=this._inversor.no_mppt;
    this.initMttps(this.max_number_of_mttps);
    this.updateArrayCombined(Number(this.max_number_of_mttps));
  }

}
