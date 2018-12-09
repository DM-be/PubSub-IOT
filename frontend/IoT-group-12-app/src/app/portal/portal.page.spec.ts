import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalPage } from './portal.page';

describe('PortalPage', () => {
  let component: PortalPage;
  let fixture: ComponentFixture<PortalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
