import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VindicationsDetailsComponent } from './vindications-details.component';

describe('VindicationsDetailsComponent', () => {
  let component: VindicationsDetailsComponent;
  let fixture: ComponentFixture<VindicationsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VindicationsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VindicationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
