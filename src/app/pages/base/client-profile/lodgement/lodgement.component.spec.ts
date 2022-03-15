import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgementComponent } from './lodgement.component';

describe('LodgementComponent', () => {
  let component: LodgementComponent;
  let fixture: ComponentFixture<LodgementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
