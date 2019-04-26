import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationsListComponent } from './activations-list.component';

describe('ActivationsListComponent', () => {
  let component: ActivationsListComponent;
  let fixture: ComponentFixture<ActivationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
