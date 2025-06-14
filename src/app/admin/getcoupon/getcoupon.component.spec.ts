import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcouponComponent } from './getcoupon.component';

describe('GetcouponComponent', () => {
  let component: GetcouponComponent;
  let fixture: ComponentFixture<GetcouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetcouponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetcouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
