import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImagePostComponent } from './edit-image-post.component';

describe('EditImagePostComponent', () => {
  let component: EditImagePostComponent;
  let fixture: ComponentFixture<EditImagePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditImagePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditImagePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
