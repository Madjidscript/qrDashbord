import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmdDetailComponent } from './cmd-detail.component';

describe('CmdDetailComponent', () => {
  let component: CmdDetailComponent;
  let fixture: ComponentFixture<CmdDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmdDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
