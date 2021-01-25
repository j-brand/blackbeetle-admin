import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePostHtmlComponent } from './create-update-post-html.component';

describe('CreateUpdatePostHtmlComponent', () => {
  let component: CreateUpdatePostHtmlComponent;
  let fixture: ComponentFixture<CreateUpdatePostHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdatePostHtmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdatePostHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
