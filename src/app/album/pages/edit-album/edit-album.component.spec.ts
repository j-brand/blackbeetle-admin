import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditALbumComponent } from './edit-album.component';

describe('EditALbumComponent', () => {
  let component: EditALbumComponent;
  let fixture: ComponentFixture<EditALbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditALbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditALbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
