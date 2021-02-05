import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVideoDialogComponent } from './update-video-dialog.component';

describe('UpdateVideoDialogComponent', () => {
  let component: UpdateVideoDialogComponent;
  let fixture: ComponentFixture<UpdateVideoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVideoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
