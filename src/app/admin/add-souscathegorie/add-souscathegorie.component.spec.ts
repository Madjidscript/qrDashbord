import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSouscathegorieComponent } from './add-souscathegorie.component';

describe('AddSouscathegorieComponent', () => {
  let component: AddSouscathegorieComponent;
  let fixture: ComponentFixture<AddSouscathegorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSouscathegorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSouscathegorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
