import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfectTableComponent } from './perfect-table.component';

describe('PerfectTableComponent', () => {
  let component: PerfectTableComponent;
  let fixture: ComponentFixture<PerfectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
