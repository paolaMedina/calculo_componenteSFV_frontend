import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfvComponentsComponent } from '@app/components/sfv-components/sfv-components.component';

describe('SfvComponentsComponent', () => {
  let component: SfvComponentsComponent;
  let fixture: ComponentFixture<SfvComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfvComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfvComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
