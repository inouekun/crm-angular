import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMemorandumDialogComponent } from './manage-memorandum-dialog.component';

describe('ManageMemorandumDialogComponent', () => {
  let component: ManageMemorandumDialogComponent;
  let fixture: ComponentFixture<ManageMemorandumDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMemorandumDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMemorandumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
