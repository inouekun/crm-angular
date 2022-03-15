import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactDetailDialogComponent } from './edit-contact-detail-dialog.component';

describe('EditContactDetailDialogComponent', () => {
  let component: EditContactDetailDialogComponent;
  let fixture: ComponentFixture<EditContactDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContactDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
