import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderManagementComponent } from './placeorder.component';

describe('OrderComponent', () => {
  let component: PlaceOrderManagementComponent;
  let fixture: ComponentFixture<PlaceOrderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceOrderManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
