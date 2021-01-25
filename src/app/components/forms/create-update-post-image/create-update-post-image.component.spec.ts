import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePostImageComponent } from './create-update-post-image.component';

describe('CreateUpdatePostImageComponent', () => {
  let component: CreateUpdatePostImageComponent;
  let fixture: ComponentFixture<CreateUpdatePostImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePostImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePostImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
