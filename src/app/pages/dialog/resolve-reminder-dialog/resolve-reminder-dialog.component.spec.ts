import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveReminderDialogComponent } from './resolve-reminder-dialog.component';

describe('ResolveReminderDialogComponent', () => {
  let component: ResolveReminderDialogComponent;
  let fixture: ComponentFixture<ResolveReminderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveReminderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
