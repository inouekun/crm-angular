import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyDetailsDialogComponent } from './edit-company-details-dialog.component';

describe('EditCompanyDetailsDialogComponent', () => {
  let component: EditCompanyDetailsDialogComponent;
  let fixture: ComponentFixture<EditCompanyDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompanyDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
