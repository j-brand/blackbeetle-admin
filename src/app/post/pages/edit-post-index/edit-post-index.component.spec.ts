import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostIndexComponent } from './edit-post-index.component';

describe('EditPostComponent', () => {
  let component: EditPostIndexComponent;
  let fixture: ComponentFixture<EditPostIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
