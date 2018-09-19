import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeSearchComponent } from './judge-search.component';

describe('JudgeSearchComponent', () => {
  let component: JudgeSearchComponent;
  let fixture: ComponentFixture<JudgeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
