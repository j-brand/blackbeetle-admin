import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlbumService } from '@core/services/album.service';
import { StoryService } from '@core/services/story.service';

interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-regenerate-card',
  templateUrl: './regenerate-card.component.html',
  styleUrls: ['./regenerate-card.component.scss'],
})
export class RegenerateCardComponent implements OnInit {
  constructor(
    private storyService: StoryService,
    private albumService: AlbumService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  options: Option[] = [
    { value: 'album_images', viewValue: 'Alben Bilder' },
    { value: 'album_title_images', viewValue: 'Alben Titelbilder' },
    { value: 'story_title_images', viewValue: 'Geschichten Titelbilder' },
  ];

  selectedOption: string;

  public generate() {
    switch (this.selectedOption) {
      case this.options[0].value:
        this.albumService.generateImages().subscribe((data) => {
          this._snackBar.open(data['message'], '', {
            duration: 3000,
          });
        });

        break;
      case this.options[1].value:
        this.albumService.generateTitleImages().subscribe((data) => {
          this._snackBar.open(data['message'], '', {
            duration: 3000,
          });
        });

        break;
      case this.options[2].value:
        this.storyService.generateTitleImages().subscribe((data) => {
          this._snackBar.open(data['message'], '', {
            duration: 3000,
          });
        });

        break;
      default:
        this._snackBar.open('Bitte wähle eine Entität.', '', {
          duration: 3000,
        });
        break;
    }
  }
}
