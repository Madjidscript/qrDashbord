import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecouponComponent } from './createcoupon.component';

describe('CreatecouponComponent', () => {
  let component: CreatecouponComponent;
  let fixture: ComponentFixture<CreatecouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatecouponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
