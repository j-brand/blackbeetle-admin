import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCommentComponent } from './index-comment.component';

describe('IndexCommentComponent', () => {
  let component: IndexCommentComponent;
  let fixture: ComponentFixture<IndexCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
