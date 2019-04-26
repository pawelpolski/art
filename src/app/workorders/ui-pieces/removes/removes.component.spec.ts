import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovesComponent } from './removes.component';

describe('RemovesComponent', () => {
  let component: RemovesComponent;
  let fixture: ComponentFixture<RemovesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
