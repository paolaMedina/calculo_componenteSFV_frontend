import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpptCablingComponent } from './mppt-cabling.component';

describe('MpptCablingComponent', () => {
  let component: MpptCablingComponent;
  let fixture: ComponentFixture<MpptCablingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpptCablingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpptCablingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
