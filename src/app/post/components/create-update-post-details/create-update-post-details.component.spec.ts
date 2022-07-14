import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePostDetailsComponent } from './create-update-post-details.component';

describe('CreateUpdatePostDetailsComponent', () => {
  let component: CreateUpdatePostDetailsComponent;
  let fixture: ComponentFixture<CreateUpdatePostDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePostDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
