import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VindicationsComponent } from './vindications.component';

describe('VindicationsComponent', () => {
  let component: VindicationsComponent;
  let fixture: ComponentFixture<VindicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VindicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VindicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
