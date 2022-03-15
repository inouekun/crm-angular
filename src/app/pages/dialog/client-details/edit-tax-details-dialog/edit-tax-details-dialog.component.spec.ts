import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxDetailsDialogComponent } from './edit-tax-details-dialog.component';

describe('EditTaxDetailsDialogComponent', () => {
  let component: EditTaxDetailsDialogComponent;
  let fixture: ComponentFixture<EditTaxDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaxDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaxDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
