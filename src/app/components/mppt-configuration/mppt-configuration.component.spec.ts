import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpptConfigurationComponent } from './mppt-configuration.component';

describe('MpptConfigurationComponent', () => {
  let component: MpptConfigurationComponent;
  let fixture: ComponentFixture<MpptConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpptConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpptConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
