import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSourceCircuitComponent } from './input-source-circuit.component';

describe('InputSourceCircuitComponent', () => {
  let component: InputSourceCircuitComponent;
  let fixture: ComponentFixture<InputSourceCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSourceCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSourceCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
