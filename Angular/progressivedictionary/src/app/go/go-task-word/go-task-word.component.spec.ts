import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoTaskWordComponent } from './go-task-word.component';

describe('GoTaskWordComponent', () => {
  let component: GoTaskWordComponent;
  let fixture: ComponentFixture<GoTaskWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoTaskWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoTaskWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
