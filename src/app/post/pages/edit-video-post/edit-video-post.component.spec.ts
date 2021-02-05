import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideoPostComponent } from './edit-video-post.component';

describe('EditVideoPostComponent', () => {
  let component: EditVideoPostComponent;
  let fixture: ComponentFixture<EditVideoPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVideoPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVideoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
