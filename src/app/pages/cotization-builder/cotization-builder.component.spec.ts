import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizationBuilderComponent } from '@app/pages/cotization-builder/cotization-builder.component';

describe('CotizationBuilderComponent', () => {
  let component: CotizationBuilderComponent;
  let fixture: ComponentFixture<CotizationBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizationBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
