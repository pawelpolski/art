import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMemoriesComponent } from './single-memories.component';

describe('SingleMemoriesComponent', () => {
  let component: SingleMemoriesComponent;
  let fixture: ComponentFixture<SingleMemoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMemoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMemoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
