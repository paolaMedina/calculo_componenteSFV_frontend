import { Injectable } from '@angular/core';
import { FvField } from '@app/core/models';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FvFieldService {
  private selectedFvField = new FvField();
  private totalFvFields: number;
  private fvFields$$ = new  Subject<FvField[]>();
  private fvFields = new Array<FvField>();
  constructor() {
    this.totalFvFields = 0;
   }
   public getFvFields() {
     return this.fvFields;
   }
   getFvFieldsObservable(): Observable<FvField[]> {
     return this.fvFields$$.asObservable();
   }
   public deleteFvField(idFvField: string) {
     this.fvFields = this.fvFields.filter(fvField => fvField.id !== idFvField);
     this.publishFvFields();
   }
   public initFvFields(){
    if ( this.totalFvFields && this.totalFvFields > 0 ) {
      this.fvFields = new Array<FvField>();
      for (let i = 0; i < this.totalFvFields; i++) {
        let fvField = new FvField();
        fvField.name = this.getDefaultName(i+1);
        this.fvFields.push(fvField);
      }
    }
    this.publishFvFields();
   }
   public publishFvFields() {
     this.fvFields$$.next(this.fvFields);
   }
   public addDefaultFvField() {
    let fvField = new FvField();
    fvField.name = this.getDefaultName(this.fvFields.length);
    this.fvFields.push(fvField);
   }
  /**
   * Return the default name for fv field in a list by its index at list
   *
   * @param {number} fieldNumber
   * @returns {string}
   * @memberof FvFieldsConfigurationComponent
   */
  private getDefaultName(fieldNumber: number): string {
    return `Campo FV ${fieldNumber}`;
   }
   getTotalFvFields(): number {
    return this.totalFvFields;
   }
   setTotalFvFields(newValue: number) {
    this.totalFvFields = newValue;
   }
   getSelectedFvField() {
     return this.selectedFvField;
   }
   updateField( fvField: FvField ) {
    let indexFvField = this.fvFields.findIndex( _fvField => _fvField.id === fvField.id);
    this.fvFields[indexFvField] = fvField;
   }
   setSelectedField( fvField: FvField ) {
    this.selectedFvField = this.fvFields.find( _fvField => _fvField.id === fvField.id);
   }
   get(id: string) {
     return this.fvFields.find( _fvField => _fvField.id === id);
   }
}
