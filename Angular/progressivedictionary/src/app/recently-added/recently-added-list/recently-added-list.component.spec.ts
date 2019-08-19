import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAddedListComponent } from './recently-added-list.component';

describe('RecentlyAddedListComponent', () => {
  let component: RecentlyAddedListComponent;
  let fixture: ComponentFixture<RecentlyAddedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyAddedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyAddedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
