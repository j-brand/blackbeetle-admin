import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifySubscibersDialogComponent } from './notify-subscibers-dialog.component';

describe('NotifySubscibersDialogComponent', () => {
  let component: NotifySubscibersDialogComponent;
  let fixture: ComponentFixture<NotifySubscibersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifySubscibersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifySubscibersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
