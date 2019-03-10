import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBuildsComponent } from './latest-builds.component';

describe('LatestBuildsComponent', () => {
  let component: LatestBuildsComponent;
  let fixture: ComponentFixture<LatestBuildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestBuildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
