import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriesModalComponent } from './memories-modal.component';

describe('MemoriesModalComponent', () => {
  let component: MemoriesModalComponent;
  let fixture: ComponentFixture<MemoriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoriesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
