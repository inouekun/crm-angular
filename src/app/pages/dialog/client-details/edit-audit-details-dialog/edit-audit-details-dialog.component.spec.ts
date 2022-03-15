import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAuditDetailsDialogComponent } from './edit-audit-details-dialog.component';

describe('EditAuditDetailsDialogComponent', () => {
  let component: EditAuditDetailsDialogComponent;
  let fixture: ComponentFixture<EditAuditDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAuditDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAuditDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
