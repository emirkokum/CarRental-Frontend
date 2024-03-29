import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentaldetailComponent } from './rentaldetail.component';

describe('RentaldetailComponent', () => {
  let component: RentaldetailComponent;
  let fixture: ComponentFixture<RentaldetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentaldetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentaldetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
