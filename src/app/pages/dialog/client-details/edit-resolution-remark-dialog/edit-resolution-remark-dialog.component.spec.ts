import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResolutionRemarkDialogComponent } from './edit-resolution-remark-dialog.component';

describe('EditResolutionRemarkDialogComponent', () => {
  let component: EditResolutionRemarkDialogComponent;
  let fixture: ComponentFixture<EditResolutionRemarkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResolutionRemarkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResolutionRemarkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
