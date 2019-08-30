import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestsComponent } from './assests.component';

describe('AssestsComponent', () => {
  let component: AssestsComponent;
  let fixture: ComponentFixture<AssestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
