import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeidbarComponent } from './seidbar.component';

describe('SeidbarComponent', () => {
  let component: SeidbarComponent;
  let fixture: ComponentFixture<SeidbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeidbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeidbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
