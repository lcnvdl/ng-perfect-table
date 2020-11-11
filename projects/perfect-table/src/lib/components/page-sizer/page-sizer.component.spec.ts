import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSizerComponent } from './page-sizer.component';

describe('PageSizerComponent', () => {
  let component: PageSizerComponent;
  let fixture: ComponentFixture<PageSizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
