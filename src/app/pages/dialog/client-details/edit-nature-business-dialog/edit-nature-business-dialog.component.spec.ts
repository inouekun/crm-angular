import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNatureBusinessDialogComponent } from './edit-nature-business-dialog.component';

describe('EditNatureBusinessDialogComponent', () => {
  let component: EditNatureBusinessDialogComponent;
  let fixture: ComponentFixture<EditNatureBusinessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNatureBusinessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNatureBusinessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
