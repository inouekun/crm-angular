import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholdersDirectorsComponent } from './shareholders-directors.component';

describe('ShareholdersDirectorsComponent', () => {
  let component: ShareholdersDirectorsComponent;
  let fixture: ComponentFixture<ShareholdersDirectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareholdersDirectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareholdersDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
