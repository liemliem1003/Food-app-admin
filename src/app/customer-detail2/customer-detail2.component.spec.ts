import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetail2Component } from './customer-detail2.component';

describe('CustomerDetail2Component', () => {
  let component: CustomerDetail2Component;
  let fixture: ComponentFixture<CustomerDetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetail2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
