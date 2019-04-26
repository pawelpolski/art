import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetiaComponent } from './netia.component';

describe('NetiaComponent', () => {
  let component: NetiaComponent;
  let fixture: ComponentFixture<NetiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
