import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpesDetailsComponent } from './cpes-details.component';

describe('CpesDetailsComponent', () => {
  let component: CpesDetailsComponent;
  let fixture: ComponentFixture<CpesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
