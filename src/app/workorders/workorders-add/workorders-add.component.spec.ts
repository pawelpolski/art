import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordersAddComponent } from './workorders-add.component';

describe('WorkordersAddComponent', () => {
  let component: WorkordersAddComponent;
  let fixture: ComponentFixture<WorkordersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkordersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkordersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
