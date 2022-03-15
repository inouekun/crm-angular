import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentsDialogComponent } from './manage-documents-dialog.component';

describe('ManageDocumentsDialogComponent', () => {
  let component: ManageDocumentsDialogComponent;
  let fixture: ComponentFixture<ManageDocumentsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDocumentsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
