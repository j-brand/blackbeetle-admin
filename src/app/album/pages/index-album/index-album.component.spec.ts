import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAlbumComponent } from './index-album.component';

describe('IndexAlbumComponent', () => {
  let component: IndexAlbumComponent;
  let fixture: ComponentFixture<IndexAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
