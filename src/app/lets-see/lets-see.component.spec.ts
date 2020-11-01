import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsSeeComponent } from './lets-see.component';

describe('LetsSeeComponent', () => {
  let component: LetsSeeComponent;
  let fixture: ComponentFixture<LetsSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetsSeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LetsSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('a should return b', () => {
    const actual = component.weHaveSwitch('a');
    expect(actual).toEqual('b')
  });

  test('b should return c', () => {
    const actual = component.weHaveSwitch('b');
    expect(actual).toEqual('c')
  });

  test('v should return å', () => {
    const actual = component.weHaveSwitch('v');
    expect(actual).toEqual('å')
  });
});
