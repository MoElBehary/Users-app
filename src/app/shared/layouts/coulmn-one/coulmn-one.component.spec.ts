import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoulmnOneComponent } from './coulmn-one.component';

describe('CoulmnOneComponent', () => {
  let component: CoulmnOneComponent;
  let fixture: ComponentFixture<CoulmnOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoulmnOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoulmnOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
