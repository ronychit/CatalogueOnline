import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationOptionsComponent } from './navigation-options.component';

describe('NavigationOptionsComponent', () => {
  let component: NavigationOptionsComponent;
  let fixture: ComponentFixture<NavigationOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
