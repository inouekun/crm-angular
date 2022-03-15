import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBranchDialogComponent } from './manage-branch-dialog.component';

describe('ManageBranchDialogComponent', () => {
  let component: ManageBranchDialogComponent;
  let fixture: ComponentFixture<ManageBranchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBranchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBranchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
