import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMapPostComponent } from './edit-map-post.component';

describe('EditMapPostComponent', () => {
  let component: EditMapPostComponent;
  let fixture: ComponentFixture<EditMapPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMapPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMapPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
