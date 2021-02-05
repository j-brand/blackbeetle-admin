import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarkerDialogComponent } from './update-marker-dialog.component';

describe('UpdateMarkerDialogComponent', () => {
  let component: UpdateMarkerDialogComponent;
  let fixture: ComponentFixture<UpdateMarkerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMarkerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMarkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
