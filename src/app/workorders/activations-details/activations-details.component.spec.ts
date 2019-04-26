import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationsDetailsComponent } from './activations-details.component';

describe('ActivationsDetailsComponent', () => {
  let component: ActivationsDetailsComponent;
  let fixture: ComponentFixture<ActivationsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
