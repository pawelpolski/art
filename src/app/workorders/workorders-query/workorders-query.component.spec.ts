import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordersQueryComponent } from './workorders-query.component';

describe('WorkordersQueryComponent', () => {
  let component: WorkordersQueryComponent;
  let fixture: ComponentFixture<WorkordersQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkordersQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkordersQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
