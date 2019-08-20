import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailComponent } from './retail.component';

describe('SlistComponent', () => {
  let component: RetailComponent;
  let fixture: ComponentFixture<RetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
