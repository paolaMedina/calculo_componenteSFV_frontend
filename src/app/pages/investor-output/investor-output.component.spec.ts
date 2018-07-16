import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorOutputComponent } from './investor-output.component';

describe('InvestorOutputComponent', () => {
  let component: InvestorOutputComponent;
  let fixture: ComponentFixture<InvestorOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
