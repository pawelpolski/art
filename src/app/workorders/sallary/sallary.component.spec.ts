import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SallaryComponent } from './sallary.component';

describe('SallaryComponent', () => {
  let component: SallaryComponent;
  let fixture: ComponentFixture<SallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
