import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShareholderDialogComponent } from './manage-shareholder-dialog.component';

describe('ManageShareholderDialogComponent', () => {
  let component: ManageShareholderDialogComponent;
  let fixture: ComponentFixture<ManageShareholderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageShareholderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShareholderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
