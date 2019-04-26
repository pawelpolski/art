import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordersDetailsComponent } from './workorders-details.component';

describe('WorkordersDetailsComponent', () => {
  let component: WorkordersDetailsComponent;
  let fixture: ComponentFixture<WorkordersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkordersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkordersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
