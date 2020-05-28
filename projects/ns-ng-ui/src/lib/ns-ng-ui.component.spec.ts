import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsNgUiComponent } from './ns-ng-ui.component';

describe('NsNgUiComponent', () => {
  let component: NsNgUiComponent;
  let fixture: ComponentFixture<NsNgUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsNgUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsNgUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
