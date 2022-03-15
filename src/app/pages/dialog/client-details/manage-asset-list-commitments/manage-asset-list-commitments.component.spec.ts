import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssetListCommitmentsComponent } from './manage-asset-list-commitments.component';

describe('ManageAssetListCommitmentsComponent', () => {
  let component: ManageAssetListCommitmentsComponent;
  let fixture: ComponentFixture<ManageAssetListCommitmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAssetListCommitmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssetListCommitmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
