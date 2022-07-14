import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSettingsComponent } from './index-settings.component';

describe('IndexSettingsComponent', () => {
  let component: IndexSettingsComponent;
  let fixture: ComponentFixture<IndexSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
