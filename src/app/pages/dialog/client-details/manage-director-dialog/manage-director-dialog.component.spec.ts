import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDirectorDialogComponent } from './manage-director-dialog.component';

describe('ManageDirectorDialogComponent', () => {
  let component: ManageDirectorDialogComponent;
  let fixture: ComponentFixture<ManageDirectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDirectorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDirectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
