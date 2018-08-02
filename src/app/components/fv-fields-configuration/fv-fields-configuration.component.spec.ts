import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FvFieldsConfigurationComponent } from '@app/components/fv-fields-configuration/fv-fields-configuration.component';

describe('FvFieldsConfigurationComponent', () => {
  let component: FvFieldsConfigurationComponent;
  let fixture: ComponentFixture<FvFieldsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FvFieldsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FvFieldsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
