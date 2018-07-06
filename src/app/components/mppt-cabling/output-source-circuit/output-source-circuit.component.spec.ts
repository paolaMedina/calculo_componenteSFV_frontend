import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputSourceCircuitComponent } from './output-source-circuit.component';

describe('OutputSourceCircuitComponent', () => {
  let component: OutputSourceCircuitComponent;
  let fixture: ComponentFixture<OutputSourceCircuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputSourceCircuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputSourceCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
