import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalDetailsDialogComponent } from './edit-personal-details-dialog.component';

describe('EditPersonalDetailsDialogComponent', () => {
  let component: EditPersonalDetailsDialogComponent;
  let fixture: ComponentFixture<EditPersonalDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonalDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
