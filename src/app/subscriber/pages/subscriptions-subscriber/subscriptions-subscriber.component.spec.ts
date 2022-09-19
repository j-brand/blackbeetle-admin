import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsSubscriberComponent } from './subscriptions-subscriber.component';

describe('SubscriptionsSubscriberComponent', () => {
  let component: SubscriptionsSubscriberComponent;
  let fixture: ComponentFixture<SubscriptionsSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionsSubscriberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionsSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
