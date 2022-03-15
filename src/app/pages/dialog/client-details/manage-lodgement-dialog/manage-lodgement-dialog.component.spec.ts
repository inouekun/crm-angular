import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLodgementDialogComponent } from './manage-lodgement-dialog.component';

describe('ManageLodgementDialogComponent', () => {
  let component: ManageLodgementDialogComponent;
  let fixture: ComponentFixture<ManageLodgementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLodgementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLodgementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
