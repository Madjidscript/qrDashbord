import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmdValiderComponent } from './cmd-valider.component';

describe('CmdValiderComponent', () => {
  let component: CmdValiderComponent;
  let fixture: ComponentFixture<CmdValiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmdValiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmdValiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
