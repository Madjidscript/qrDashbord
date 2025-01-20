import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCathegorieComponent } from './add-cathegorie.component';

describe('AddCathegorieComponent', () => {
  let component: AddCathegorieComponent;
  let fixture: ComponentFixture<AddCathegorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCathegorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCathegorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
