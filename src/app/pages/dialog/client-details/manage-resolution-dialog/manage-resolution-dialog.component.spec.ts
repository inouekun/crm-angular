import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResolutionDialogComponent } from './manage-resolution-dialog.component';

describe('ManageResolutionDialogComponent', () => {
  let component: ManageResolutionDialogComponent;
  let fixture: ComponentFixture<ManageResolutionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageResolutionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageResolutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
