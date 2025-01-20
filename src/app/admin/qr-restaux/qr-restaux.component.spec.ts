import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrRestauxComponent } from './qr-restaux.component';

describe('QrRestauxComponent', () => {
  let component: QrRestauxComponent;
  let fixture: ComponentFixture<QrRestauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrRestauxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrRestauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
