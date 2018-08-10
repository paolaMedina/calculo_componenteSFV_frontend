import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Mttp, FvField, Inversor, PanelSolar } from '../../core/models';
import { isOdd } from '../../core/lib';
import { FvFieldService, SfvService } from '../../core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MpptConfigurationComponent } from '../mppt-configuration/mppt-configuration.component';
import { MatSnackBar } from '@angular/material';
import { routercTransition } from '../../router.animations';
import { MttpFormBuilder } from '../../core/forms/mttp.form';
import { potencia_fv_total, cargabilidad_inversor } from '@app/core/lib/mttp-functions';
import { validar_potencia_fv, ValidacionConMensajeInterface } from '@app/core/lib/mttp-validations';
import { ResultadoValidacion } from '@app/core/enums';
class Combination {
  _id: string;
  es_combinado: boolean;
  puede_combinar: boolean;
  constructor(_id: string, es_combinado: boolean, puede_combinar: boolean) {
    this._id = _id;
    this.es_combinado = es_combinado;
    this.puede_combinar = puede_combinar;
  }
}
@Component({
  selector: 'app-mppts-configuration',
  templateUrl: './mppts-configuration.component.html',
  styleUrls: ['./mppts-configuration.component.scss'],
  animations: [routercTransition()]
})
export class MpptsConfigurationComponent implements OnInit {
  //@Input() max_number_of_mttps = 5;
  max_number_of_mttps: number;

  potencia_fv_total: number = 0;
  cargabilidad_inversor: number = 0;
  resultadoValidacionesEnum = ResultadoValidacion;

  @ViewChildren('mppts') mpptComponents: QueryList<MpptConfigurationComponent>;
  fvField: FvField;
  mttpsNumberControl: FormControl;
  combinations: Array<Combination>;
  mttps: Mttp[];
  selectedPanel: PanelSolar;
  selectedInversor: Inversor;
  private _inversor: Inversor;
  constructor(
    private _fvFieldService: FvFieldService,
    private _mttpFormBuilder: MttpFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.mttps = new Array<Mttp>();
    this.selectedPanel = this._fvFieldService.getSelectedSolarPanel();
    this.selectedInversor = this._fvFieldService.getSelectedInversor();
    this.combinations = new Array<Combination>();
    this.mttpsNumberControl = new FormControl();
    this._inversor = this._fvFieldService.getSelectedInversor();
  }

  getArray(size: number): Array<Number> {

    return size ? new Array<Number>(Number(size)) : null;
  }
  functPotenciaFvTotal() {
    this.potencia_fv_total = potencia_fv_total(this.mttps, this.selectedPanel.pmax);
    return this.potencia_fv_total;
  }
  functCargabilidadInversor() {
    this.cargabilidad_inversor = cargabilidad_inversor(this.potencia_fv_total, this.selectedInversor.pot_nom)
    return this.cargabilidad_inversor;
  }
  functValidarPotenciaFvTotal(): boolean {
    if (validar_potencia_fv(this._inversor, this.potencia_fv_total).resultadoValidacion === this.resultadoValidacionesEnum.ERROR) {
      return true;
    }
    return false;
  }

  initMttps(numberOfMttps: number) {
    this.mttps = new Array<Mttp>();
    for (let i = 0; i < numberOfMttps; i++) {
      this.mttps.push(new Mttp(String(i + 1)));
    }
  }
  /**
   *  
   * @param combination String in format `n-n+1`, `mttps[n]` and `mttps[n+1]` should be combined in one mttp
   */
  combineMttps(combination: Combination) {
    let name_mppt_1: number;
    let name_mppt_2: number;
    let index_mptt1: number;
    let index_mptt2: number;
    let newCombinedMptt: Mttp;
    /** Extract ids of mptts from combination, example [5,6] */
    let ids_mttps = combination._id.split('-');
    /** Init ids of mptts from ids array */
    name_mppt_1 = Number(ids_mttps[0]);
    name_mppt_2 = Number(ids_mttps[1]);
    /** Let indexes from find */
    index_mptt1 = this.mttps.findIndex(
      (mttp: Mttp) => {
        return mttp.nombre === String(name_mppt_1);
      }
    );
    this.mttps.splice(index_mptt1, 1);
    index_mptt2 = this.mttps.findIndex(
      (mttp: Mttp) => {
        return mttp.nombre === String(name_mppt_2);
      }
    );
    this.mttps.splice(index_mptt2, 1);
    /** Create a new mttp combined */
    newCombinedMptt = new Mttp(Mttp.getCombinedName(name_mppt_1, name_mppt_2));
    newCombinedMptt.es_combinado = true;
    /** Add the new mttp combined at `name_mppt_1` position */
    this.mttps.splice(index_mptt1, 0, newCombinedMptt);
    combination.es_combinado = true;
  }
  combineOrDecombineMttps(combination: Combination) {
    if (!combination.es_combinado) {
      this.combineMttps(combination);
    } else {
      this.separeCombinedMttps(combination);
    }
  }
  /**
 *  
 * @param combination String in format `n-n+1`, `mttps[n]` and `mttps[n+1]` should be combined in one mttp
 */
  separeCombinedMttps(combination: Combination) {
    let name_mppt_to_delete: string = combination._id;
    let name_mppt_1: number;
    let name_mppt_2: number;
    let index_mptt_to_delete: number;
    let newCombinedMptt1, newCombinedMptt2: Mttp;
    /** Extract ids of mptts from combination, example [5,6] */
    let ids_mttps = combination._id.split('-');
    /** Init ids of mptts from ids array */
    name_mppt_1 = Number(ids_mttps[0]);
    name_mppt_2 = Number(ids_mttps[1]);
    /** Let indexes from find */
    index_mptt_to_delete = this.mttps.findIndex(
      (mttp: Mttp) => {
        return mttp.nombre === String(name_mppt_to_delete);
      }
    );
    this.mttps.splice(index_mptt_to_delete, 1);
    /** Create a new mttp combined */
    newCombinedMptt1 = new Mttp(String(name_mppt_1));
    newCombinedMptt2 = new Mttp(String(name_mppt_2));
    newCombinedMptt1.es_combinado = false;
    newCombinedMptt2.es_combinado = false;
    /** Add the new mttp combined at `name_mppt_1` position */
    this.mttps.splice(index_mptt_to_delete, 0, newCombinedMptt1);
    this.mttps.splice(index_mptt_to_delete + 1, 0, newCombinedMptt2);
    combination.es_combinado = false;
  }
  /**
   * Return a combined array in duples by given size, only return duples, in inpair sizes 
   * the last element is not included
   * Examples: size = 2, return ['1-2'];  size = 5 return ['1-2, '3-4']
   * @param size 
   */
  updateArrayCombined(size: number) {
    let arrayCombined = new Array<Combination>();
    for (let i = 0; i + 1 <= size; i = i + 2) {
      const lower_bound = i + 1;
      let separator: string;
      let upper_bound: number | string;
      let puede_combinar: boolean = true;
      let combination_name: string;
      if (i + 1 >= size) {
        separator = ''
        upper_bound = '';
      } else {
        separator = '-';
        upper_bound = i + 2;
      }
      if ( lower_bound === 1) {
        if ( this._inversor.imax_in_mppt1_2 === 0 ) {
          puede_combinar = false;
        }
      }
      if ( lower_bound === 3) {
        if ( this._inversor.imax_in_mppt3_4 === 0 ) {
          puede_combinar = false;
        }
      }
      if ( lower_bound === 5) {
        if ( this._inversor.imax_in_mppt5_6 === 0 ) {
          puede_combinar = false;
        }
      }
      combination_name = Mttp.getCombinedName(lower_bound, upper_bound);
      arrayCombined.push(new Combination(combination_name, this.mttps.find(mttp => mttp.nombre === combination_name) ? true : false, puede_combinar) );

    };
    if (isOdd(size)) {
      arrayCombined.pop();
    }
    this.combinations = arrayCombined;
  }

  markAllMpptsFormsAsTouched() {
    this.mpptComponents.forEach(
      (mpptComponent: MpptConfigurationComponent) => {
        this._mttpFormBuilder.markFormGroupTouched(mpptComponent.mttpForm);
      }
    );
  }
  checkAllMpptsFormsValid(): boolean {
    let _validForms = true;
    if (this.mpptComponents
      .some(
        (mpptComponent: MpptConfigurationComponent) => !mpptComponent.valid)) {
      _validForms = false;
    }
    return _validForms;
  }
  getMttpsFromChildren(): Mttp[] {
    return this.mpptComponents.map(
      mpptComponent =>
        mpptComponent.getMttpFromForm()
    )
  }
  whenGoesToCablingConfig() {
    this.saveMttps(false);
  }
  private setNumberOfMttps(newNumber: number) {

    let currentNumberOfMttps = this.mttps.length;

    let existenArraysCombinados: boolean = false;

    /* Un array combinado vale por dos */
    for (let mttp of this.mttps) {
      if (mttp.es_combinado) {
        currentNumberOfMttps = currentNumberOfMttps + 1;
        existenArraysCombinados = true;
      }
    }
    if (newNumber === currentNumberOfMttps) {
      return;
    }
    /** Si hay mttps combinados, lo mejor es reiniciar los mttps a un estado inicial */
    if ( existenArraysCombinados ) {
      this.initMttps(newNumber);
      return;
    }
    if (newNumber < currentNumberOfMttps) {
      this.mttps = this.mttps.slice(0, newNumber);
    }

    if (newNumber > currentNumberOfMttps) {
      for (let i = currentNumberOfMttps + 1; i <= newNumber; i++) {
        this.mttps.push(new Mttp(String(i)));
      }
    }
  }
  saveMttps(validate: boolean): boolean {
    if (validate) {
      this.markAllMpptsFormsAsTouched();
      if (!this.checkAllMpptsFormsValid()) {
        this.snackBar.open("Se han encontrado algunos errores", "Aceptar", {
          duration: 2000,
        });
        return false;
      }
    }
    this.fvField.mttps = this.getMttpsFromChildren();
    this._fvFieldService.updateField(this.fvField);
    this.snackBar.open("Datos almacenados correctamente", "Aceptar", {
      duration: 2000,
    });
    return true;

  }
  return() {
    if (this.saveMttps(true)) {
      this.router.navigate(['/fv-field-config', this.fvField.id]);
    } else {
      return;
    }
  }
  ngOnInit() {
    console.log(this._inversor, 'inversor en mttps config');
    this.max_number_of_mttps = this._inversor.no_mppt;
   
    this.route.params.subscribe(params => {
      this.fvField = this._fvFieldService.get(params['fv_id']);
      if (this.fvField.mttps && this.fvField.mttps.length > 0) {
        this.mttps = this.fvField.mttps;
        this.setNumberOfMttps(this.max_number_of_mttps);
      } else {
        this.initMttps(this.max_number_of_mttps);

      }
      this.updateArrayCombined(Number(this.max_number_of_mttps));
    });
    this.updateArrayCombined(Number(this.max_number_of_mttps));
  }

}
