import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordersSearchComponent } from './workorders-search.component';

describe('WorkordersSearchComponent', () => {
  let component: WorkordersSearchComponent;
  let fixture: ComponentFixture<WorkordersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkordersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkordersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
