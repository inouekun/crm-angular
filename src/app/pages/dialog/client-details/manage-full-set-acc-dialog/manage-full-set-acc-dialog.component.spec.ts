import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFullSetAccDialogComponent } from './manage-full-set-acc-dialog.component';

describe('ManageFullSetAccDialogComponent', () => {
  let component: ManageFullSetAccDialogComponent;
  let fixture: ComponentFixture<ManageFullSetAccDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFullSetAccDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFullSetAccDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
