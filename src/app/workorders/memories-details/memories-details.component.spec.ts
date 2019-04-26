import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriesDetailsComponent } from './memories-details.component';

describe('MemoriesDetailsComponent', () => {
  let component: MemoriesDetailsComponent;
  let fixture: ComponentFixture<MemoriesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoriesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
