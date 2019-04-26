import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkordersTypeBadgesComponent } from './workorders-type-badges.component';

describe('WorkordersTypeBadgesComponent', () => {
  let component: WorkordersTypeBadgesComponent;
  let fixture: ComponentFixture<WorkordersTypeBadgesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkordersTypeBadgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkordersTypeBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
