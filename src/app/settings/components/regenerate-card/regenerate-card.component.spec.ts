import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegenerateCardComponent } from './regenerate-card.component';

describe('RegenerateCardComponent', () => {
  let component: RegenerateCardComponent;
  let fixture: ComponentFixture<RegenerateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegenerateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegenerateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
