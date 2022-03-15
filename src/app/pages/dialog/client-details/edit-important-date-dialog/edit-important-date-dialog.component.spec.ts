import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImportantDateDialogComponent } from './edit-important-date-dialog.component';

describe('EditImportantDateDialogComponent', () => {
  let component: EditImportantDateDialogComponent;
  let fixture: ComponentFixture<EditImportantDateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditImportantDateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImportantDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
