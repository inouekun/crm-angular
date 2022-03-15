import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientDialogComponent } from './register-client-dialog.component';

describe('RegisterClientDialogComponent', () => {
  let component: RegisterClientDialogComponent;
  let fixture: ComponentFixture<RegisterClientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
