import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FvFieldConfigurationComponent } from '@app/components/fv-field-configuration/fv-field-configuration.component';

describe('FvFieldConfigurationComponent', () => {
  let component: FvFieldConfigurationComponent;
  let fixture: ComponentFixture<FvFieldConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FvFieldConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FvFieldConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
