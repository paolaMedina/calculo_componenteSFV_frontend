import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinacionInversorComponent } from './combinacion-inversor.component';

describe('CombinacionInversorComponent', () => {
  let component: CombinacionInversorComponent;
  let fixture: ComponentFixture<CombinacionInversorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinacionInversorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinacionInversorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
