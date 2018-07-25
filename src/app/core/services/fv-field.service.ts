import { Injectable } from '@angular/core';
import { FvField, Inversor } from '../../core/models';
import { PanelSolar } from '../models';
import { inversor_mock, fvField_mock, solar_panel_mock } from '@app/mocks';

@Injectable({
  providedIn: 'root'
})
export class FvFieldService {
  private selectedFvField = new FvField();
  private fvFields = new Array<FvField>();
  private selectedSolarPanel: PanelSolar;
  private selectedInversor: Inversor;
  constructor() {
    this.fvFields = new Array<FvField>();
    this.selectedSolarPanel = new PanelSolar();

    /** load mocks */
    /*
    this.selectedInversor = inversor_mock;
    this.selectedSolarPanel = solar_panel_mock;
    this.fvFields.push(fvField_mock);
    */
  }
  public setSelectedSolarPanel(solarPanel: PanelSolar) {
    this.selectedSolarPanel = solarPanel;
  }
  public getSelectedSolarPanel(): PanelSolar{
    return this.selectedSolarPanel;
  }
  public setSelectedInversor(inversor: Inversor) {
    this.selectedInversor = inversor;
  }
  public getSelectedInversor(): Inversor{
    return this.selectedInversor;
  }
  public getFvFields() {
    return this.fvFields;
  }

  public deleteFvField(idFvField: string) {
    this.fvFields = this.fvFields.filter(fvField => fvField.id !== idFvField);
  }

  public getDefaultFvField(sufix = 1 ) {
    let fvField = new FvField();
    fvField.nombre = this.getDefaultName(sufix);
    return fvField;
  }
  /**
   * Return the default nombre for fv field in a list by its index at list
   *
   * @param {number} fieldNumber
   * @returns {string}
   * @memberof FvFieldsConfigurationComponent
   */
  private getDefaultName(fieldNumber: number): string {
    return `Campo FV ${fieldNumber}`;
  }
  getSelectedFvField() {
    return this.selectedFvField;
  }
  updateField(fvField: FvField) {
    let indexFvField = this.fvFields.findIndex(_fvField => _fvField.id === fvField.id);
    this.fvFields[indexFvField] = fvField;
  }
  setFvFields(fvFields: FvField[]) {
    this.fvFields = fvFields;
  }
  setSelectedField(fvField: FvField) {
    this.selectedFvField = this.fvFields.find(_fvField => _fvField.id === fvField.id);
  }
  get(_id: string) {
    /** mock  */
    //return this.fvFields[0];
    return this.fvFields.find(_fvField => _fvField.id === _id);
  }
}
