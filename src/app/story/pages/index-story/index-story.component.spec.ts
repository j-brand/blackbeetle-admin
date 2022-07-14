import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexStoryComponent } from './index-story.component';

describe('IndexStoryComponent', () => {
  let component: IndexStoryComponent;
  let fixture: ComponentFixture<IndexStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
