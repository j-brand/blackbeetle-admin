import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHtmlPostComponent } from './edit-html-post.component';

describe('EditHtmlPostComponent', () => {
  let component: EditHtmlPostComponent;
  let fixture: ComponentFixture<EditHtmlPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHtmlPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHtmlPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
