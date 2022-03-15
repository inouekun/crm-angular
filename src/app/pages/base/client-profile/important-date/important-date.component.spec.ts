import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantDateComponent } from './important-date.component';

describe('ImportantDateComponent', () => {
  let component: ImportantDateComponent;
  let fixture: ComponentFixture<ImportantDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
