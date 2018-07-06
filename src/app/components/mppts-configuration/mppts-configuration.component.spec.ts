import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpptsConfigurationComponent } from './mppts-configuration.component';

describe('MpptsConfigurationComponent', () => {
  let component: MpptsConfigurationComponent;
  let fixture: ComponentFixture<MpptsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpptsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpptsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
