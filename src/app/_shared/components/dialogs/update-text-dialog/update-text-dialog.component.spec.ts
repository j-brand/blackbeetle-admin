import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTextDialogComponent } from './update-text-dialog.component';

describe('UpdateTextDialogComponent', () => {
  let component: UpdateTextDialogComponent;
  let fixture: ComponentFixture<UpdateTextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTextDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
