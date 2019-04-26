import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VindicationsListComponent } from './vindications-list.component';

describe('VindicationsListComponent', () => {
  let component: VindicationsListComponent;
  let fixture: ComponentFixture<VindicationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VindicationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VindicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
