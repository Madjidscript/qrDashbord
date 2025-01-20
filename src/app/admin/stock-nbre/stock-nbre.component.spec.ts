import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockNbreComponent } from './stock-nbre.component';

describe('StockNbreComponent', () => {
  let component: StockNbreComponent;
  let fixture: ComponentFixture<StockNbreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockNbreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockNbreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
