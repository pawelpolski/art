import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcComponent } from './upc.component';

describe('UpcComponent', () => {
  let component: UpcComponent;
  let fixture: ComponentFixture<UpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
