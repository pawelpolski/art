import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordersStatusIconsComponent } from './workorders-status-icons.component';

describe('WorkordersStatusIconsComponent', () => {
  let component: WorkordersStatusIconsComponent;
  let fixture: ComponentFixture<WorkordersStatusIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkordersStatusIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkordersStatusIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
