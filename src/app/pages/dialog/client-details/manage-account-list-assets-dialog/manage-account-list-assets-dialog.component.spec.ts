import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountListAssetsDialogComponent } from './manage-account-list-assets-dialog.component';

describe('ManageAccountListAssetsDialogComponent', () => {
  let component: ManageAccountListAssetsDialogComponent;
  let fixture: ComponentFixture<ManageAccountListAssetsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountListAssetsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountListAssetsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
