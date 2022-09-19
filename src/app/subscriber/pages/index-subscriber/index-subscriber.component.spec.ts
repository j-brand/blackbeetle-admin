import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexSubscriberComponent } from './index-subscriber.component';

describe('IndexSubscriberComponent', () => {
  let component: IndexSubscriberComponent;
  let fixture: ComponentFixture<IndexSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexSubscriberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
